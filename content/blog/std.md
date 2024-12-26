---
title: From DevOS to Standard
description: Why we made Standard, and what it has done for us.
taxonomies:
  tags:
    - std
    - nix
    - devops
author: Tim D
authorGithub: nrdxp
authorImage: https://avatars.githubusercontent.com/u/34083928?v=4
authorTwitter: nrdxp52262
date: "2022-10-31"
category: dev
---

## Update: A Video is Worth 1000 Blogs

For those who would rather watch than read, a colleague of mine has whipped up a great video series
exploring Standard in depth, so drop by the [media secition](../media) for links.

## Two years later...

DevOS started as a fun project to try and get better with Nix and understand this weird new thing
called flakes. Since then and despite their warts, Nix flakes have experienced widespread use, and
rightfully so, as a mechanism for hermetically evaluating your system & packages that fully locks
your inputs and guarantees you some meaningful level of sanity over your artifacts.

Yet when I first released it, I never even imagined so many people would find DevOS useful, and I
have been truly humbled by all the support and contributions that came entirely spontaneously to the
project and ultmately culminated in the current version of [digga][digga], and the divnix org that
maintains it.

## Back to Basics

For whatever reason, it really feels like time to give a brief update of what has come of this
little community experiment, and I'm excited to hopefully clear up some apparent confusion, and
hopefully properly introduce to the world [Standard](https://github.com/divnix/std).

DevOS was never meant to be an end all be all, but rather a heavily experimental sketch while
I stumbled along to try and organize my Nix code more effectively. With Standard, we are able to
distill the wider experience of some of its contributors, as well as some new friends, and design
something a little more focused and hopefully less magical, while still eliminating a ton of
boilerplate. Offering both a lightly opinionated way to organize your code into logically typed
units, and a mechanism for defining "standard" actions over units of the same type.

Other languages make this simple by defining a module mechanism into the language where users are
freed from the shackles of decision overload by force, but Nix has no such advantage. Many people
hoped and even expected flakes to alleviate this burden, but other than the schema Nix expects
over its outputs, it does nothing to enforce how you can generate those outputs, or how to organize
the logical units of code & configuration that generate them.

## A Departure from Tradition

It is fair to say that the nixpkgs module system has become the sort of "goto" means of managing
configuration in the Nix community, and while this may be good at the top-level where a global
namespace is sometimes desirable, it doesn't really give us a generic means of sectioning off our
code to generate both configuration _and_ derivation outputs quickly.

In addition to that, the module system is fairly complex and is a bit difficult to anticate the
cost of ahead of time due to the fixed-point. The infamous "infinite traces" that can occur during
a Nix module evaluation almost never point to the actual place in your code where the error
originates, and often does even contain a single bit of code from the local repository in the trace.

Yet as the only real game in town, the module system has largely "de facto" dictated the nature
of how we organize our Nix code up til now. It lends itself to more of a "depth first" approach
where modules can recurse into other modules ad infinitum.

## A Simpler Structure

Standard, in contrast, tries to take an alternative "breadth first" approach, ecouraging code
organization closer to the project root. If true depth is called for, flakes using Standard can
compose gracefully with other flakes, whether they use Standard or not.

It is also entirely unopionated on what you output, there is nothing stopping you from simply
exporting NixOS modules themselves, for example, giving you a nice language level
compartmentalization strategy to help manager your NixOS, Home Manager or Nix Darwin configurations.

Advanced users may even write their own types, or even extend the officially supported ones. We
will expand more on this in a later post.

But in simple terms, why should we bother writing the same script logic over and over when we can be
guaranteed to recieve an output of a specific type, which guarantees any actions we define for the
type at large will work for us: be it deploying container images, publishing sites, running
deployments, or invoking tests & builds.

We can ensure that each image, site, or deployment is tested, built, deployed and published in
a sane and well-defined way, universally. In this way, Standard is meant to not only be convenient,
but comprehensive, which is an important property to maintain when codebases grow to non-trivial
size.

There is also no fixed-point so, anecdotably, I have yet to hit an eval error in Standard based
projects that I couldn't quickly track down; try saying that about the module system.

## A CLI for productivity

The Nix cli can sometimes feel a little opaque and low-level. It isn't always the best interface
to explain and explore what we can actually _do_ with a given project. To address this issue in
a minimal and clean way, we package a small go based cli/tui combo to quickly answer exactly this
question, "What can I do with this project?".

This interface is entirely optional, but also highly useful and really rather trivial thanks to a
predicatable structure and well typed outputs given to us in the Nix code. The schema for anything
you can do follows the same pattern: "std //$cell/$block/$target:$action". Here the "cell" is the
highest level "unit", or collection of "blocks", which are well-typed attribute sets of "targets"
sharing a colleciton of common "actions" which can be performed over them.

### At a Glance

The TUI is invaluable for quickly getting up to speed with what's available:

```console
┌────────────────────────────────────────────────────────────────────────────────┐┌───────────────────────────────────┐
│|  Target                                                                       ││   Actions                         │
│                                                                                ││                                   │
│  176 items                                                                     │││ build                            │
│                                                                                │││ build this target                │
│  //automation/packages/retesteth                                               ││                                   │
│  testeth via RPC. Test run, generation by t8ntool protocol                     ││  run                              │
│                                                                                ││  exec this target                 │
││ //automation/jobs/cardano-db-sync                                             ││                                   │
││ Run a local cardano-db-sync against our testnet                               ││                                   │
│                                                                                ││                                   │
│  //automation/jobs/cardano-node                                                ││                                   │
│  Run a local cardano-node against our testnet                                  ││                                   │
│                                                                                ││                                   │

```

## A Concise Show & Tell

The central component of Standard is the cell block API. The heirarchy is "cell"→"block", where
we defined the individual block types and names directly in the flake.nix.

The function calls in the "cellBlocks" list below are the way in which we determine which "actions"
can be run over the contents of the given block.

```nix
# flake.nix
{
  inputs.std.url = "github:divnix/std";
  outputs = inputs: inputs.std.growOn {
    inherit inputs;
    systems = ["x86_64-linux"];
    # Every file in here should be a directory, that's your "cell"
    cellsFrom = ./nix;
    # block API declaration
    cellBlocks = [
      (std.functions "lib")
      (std.installables "packages")
      (std.devshells "devshells")
    ];
  };
}

# ./nix/dev/packages.nix
# nix build .#$system.dev.packages.project
# std //dev/packages/project:build
{
  inputs, # flake inputs with the `system` abstracted, but still exposed when required
  cell # reference to access other blocks in this cell
}: let
  inherit (inputs.nixpkgs) pkgs;
in
{
  project = pkgs.stdenv.mkDerivation {
    # ...
  };
}

# ./nix/automation/devshells/default.nix
# nix develop .#$system.dev.devshells.dev
# std //automation/devshells/dev:enter
{
  inputs,
  cell
}: let
  inherit (inputs) nixpkgs std;
  inherit (nixpkgs) pkgs;
  # a reference to other cells in the project
  inherit (inputs.cells) packages;
in
{
  dev = std.mkShell { packages = [packages.project]; };
}
```

## Encouraging Cooperation

Standard has also given us a useful mechanism for contributing back to upstream where it makes
sense. We are all about maintaining well-defined boundaries, and we don't want to reimplement the
world if the problem would be better solved elsewhere. Work on Standard has already led to several
useful contributions to both nixpkgs and even a few in nix proper, as well as some in tangentially
related codebases, such as github actions and go libraries.

One very exciting example of this cooperation is the effort we've expended integrating
[nix2container][n2c] with Standard. The work has given us insights and position to begin defining an
officially supported specification for [OCI images][oci] built and run from Nix store paths, which
is something that would be a huge win for developers everywhere!

We believe interoperability with existing standards is how Nix can ultimately cement itself into
the mainstream, and in a way that is unoffensive and purely additive.

## CI simplified

Instead of making this a mega post, I'll just leave this as a bit of a teaser for a follow-up post
which will explore our recent efforts to bring the benefits Standard to GitHub Actions _a la_
[std-action][action]. The target is a Nix CI system that avoids ever doing the same work more than
once, whether its evaluating or building, and versatile enough to work from a single user project
all the way up to a large organization's monorepo. Stay tuned...

[digga]: https://github.com/divnix/digga
[nosys]: https://github.com/divnix/nosys
[action]: https://github.com/divnix/std-action 
[grow]: https://std.divnix.com/guides/growing-cells.html
[harvest]: https://github.com/divnix/std/blob/main/src/harvest.nix
[n2c]: https://github.com/nlewo/nix2container
[oci]: https://github.com/opencontainers/image-spec/issues/922
