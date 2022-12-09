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

## Two years later...
DevOS started as a fun project to try and get better with Nix and understand this weird new thing
called flakes. Since then and despite their warts, Nix flakes have experienced widespread use, and
rightfully so, as a mechanism for hermetically evaluating your system & packages that fully locks
your inputs.

Yet when I first release it, I never even imagined so many people would find DevOS useful, and I
have been truly humbled by all the support and contributions that came entirely spontaneously to the
project and ultmately culminated in the current version of digga, and the divnix org that maintains
it.


## Back to Basics
For whatever reason, it really feels like time to give a brief update of what has come of this
little community experiment, and I'm excited to hopefully clear up some apparent confusion, and
hopefully properly introduce to the world [Standard](https://github.com/divnix/std).

DevOS was never meant to be an end all be all, but rather a heavily experimental sketch while
I stumbled along to try an organize my Nix code more effectively. With Standard, we are able to
distill the wider experience of some of the largest contributors and design something a little more
focused and hopefully less magical, while still eliminating a ton of boilerplate. Offering both a
lightly opinionated way to organize your code into logically typed units, and a mechanism for
defining "standard" actions over units of the same type.

Other languages make this simple by defining a module mechanism into the language where users are
freed from the shackles of decision overload by force, but Nix has no such advantage. Many people
hoped and even expected flakes to alleviate this burden, but other than the schema Nix expects
over its outputs, it does nothing to enforce how you can generate those outputs, or how to organize
the logical units of code & configuration that generate them.

Many people point to the nixpkgs module system as the sort of "goto" means of managing
configuration, and while this may be true at the top-level where a global namespace is sometimes
desirable, it doesn't really give us a generic means of sectioning off our code to generate both
configuration _and_ derivation outputs quickly.

In addition to that, the module system is fairly complex and is a bit difficult to anticate the
cost of ahead of time due to the fixed-point. The infamous "infinite traces" that can occur during
a Nix module evaluation almost never point to the actual place in your code where the error
originates, and often does even contain a single bit of code from the local repository in the trace.

## A Departure from Tradition
As the only real game in town, the module system has largely "de facto" dictated the nature
of how we organize our Nix code up til now. It lends itself to more of a "depth first" approach
where modules can recurse into other modules ad infinitum. Standard, in contrast, tries to take an
alternative "breadth first" approach, ecouraging code organization closer to the project root. If
true depth is called for, flakes using Standard can compose gracefully with other flakes using it
_and_ those that don't.

For a small project with a single package and maybe one Nix shell to develop it, "Standard" may
not be entirely necessary, though hopefully not overly encumbering either. But for projects like
even nixpkgs itself, that have branched off into hundreds or even thousands of project specifc
derivations, Standard can be invaluable in keeping the complexitly of those interelated pieces
maintainable over the long term.

## A New Challenger Approaches

TODO