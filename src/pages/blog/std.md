---
layout: $/layouts/post.astro
title: From DevOS to Standard
description: Why we made Standard, and what it has done for us.
tags:
  - std
  - nix
  - devops
author: Tim D
authorGithub: nrdxp
date: 2022-10-31
---

## A Video is Worth 1000 Blogs

For those who would rather watch than read, my awesome colleague [Josh](https://github.com/jmgilman)
has whipped up a great video series exploring Standard in depth, so I thought I'd leave them here:

* [Introduction](https://www.loom.com/share/cf9d5d1a10514d65bf6b8287f7ddc7d6)
* [Cell Blocks Deep Dive](https://www.loom.com/share/04fa1d578fd044059b02c9c052d87b77)
* [Operables & OCI](https://www.loom.com/share/27d91aa1eac24bcaaaed18ea6d6d03ca)
* [Nixago](https://www.loom.com/share/5c1badd77ab641d3b8e256ddbba69042)

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

It is fair to say that nixpkgs module system as become the sort of "goto" means of managing
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

It is also entirely unopionated on what you output, there is nothing stopping you simply exporting
NixOS modules themselves, for example, giving you a nice language level compartmentalization
strategy to help manager your NixOS, Home Manager or Nix Darwin configurations.

In simple terms, why should we bother writing the same script logic over and over when we can be
guaranteed to recieve an output of a specific type, which guarantees any actions we define for the
type at large will work for us: be it deploying container images, publishing sites, running
deployments, or invoking tests & builds.

We can ensure that each image, site, or deployment is tested, built, deployed and published in
a sane and well-defined way, universally. In this way, Standard is meant to not only be convenient,
but comprehensive, which is an important property to maintain when codebases grow to non-trivial
size.

There is also no fixed-point so, anecdotably, I have yet to hit an eval error in Standard based
projects that I couldn't quickly track down, try saying that about the module system.

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

## A New Challenger Approaches

For a small project with a single package and maybe one Nix shell to develop it, "Standard" may
not be entirely necessary, though hopefully not overly encumbering either. But for projects like
even nixpkgs itself, that have branched off into hundreds or even thousands of project specifc
derivations, Standard can be invaluable in keeping the complexitly of those interelated pieces
maintainable over the long term.

We have gotten plenty of feedback from the early adopters of Standard, and one main comment was its
percieved monolithic takeover of the Nix code. This is largely more percention than reality, as
Standard actually encourages you to generate additional outputs.

In fact, you can write as many output sets as you like; the [growOn][grow] function which is
typically your entrypoint into a Standardized codebase is a varaidic function taking any number of
attribute sets as arguments, where only the first set is specific to Standard. The rest are merged
together, taking the same schema as a regular flake; giving you another mechanism for organizing
your flake outputs cleanly. Use one set to ["harvest"][harvest] Standard outputs to their
corresponding expected flake paths for compatibility, use another to use other flake frameworks
independantly (flake-parts, dream2nix, etc).

Despite this, there are pieces that work well on their own, and defining them into their own
independantly useful libraries is helpful for everyone, not just Standard users. One good example is
[nosys][nosys] which was recently derived from Standard. It can be used independantly to make flake
system handling dead simple, or it can be paired up for use on these additional attribututes passed
to growOn to get the same simplified system management that Standard supplies for all your flakes
outputs!

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
all the way up to a large organization's monorepo.

All in parallel and with automatic coverage for any Standard blocks specified to run in CI in the
flake.nix. Stay tuned...

[digga]: https://github.com/divnix/digga
[nosys]: https://github.com/divnix/nosys
[action]: https://github.com/divnix/std-action 
[grow]: https://std.divnix.com/guides/growing-cells.html
[harvest]: https://github.com/divnix/std/blob/main/src/harvest.nix
[n2c]: https://github.com/nlewo/nix2container
[oci]: https://github.com/opencontainers/image-spec/issues/922
