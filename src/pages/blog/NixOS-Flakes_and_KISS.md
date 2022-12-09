---
layout: $/layouts/post.astro
title: NixOS, Flakes and KISS
description: A simpler way to manage the OS Layer
tags:
  - nix
author: Tim D
authorGithub: nrdxp
date: 2020-12-19
---

## Introduction

This marks the first post of my very own developer blog, and it comes much later
than I had originally anticipated thanks to the ongoing pandemic, coupled with
some unforeseen life challenges. My original intent was to start by introducing
the concept of Nix Flakes, however, an excellent blog series over at
[tweag.io](https://www.tweag.io/blog/2020-05-25-flakes) has emerged, expanding
on just that premise. If you are new to flakes, it is highly recommended that
you check it out before continuing with this post.

Now, I'd like to introduce a project I've been slowly building up since
flakes were introduced called [DevOS][DevOS].

# So what is it anyway?

After years of working with NixOS, I strongly felt that the community as a whole
could benefit from a standardized structure and format for NixOS configurations
in general. It appears that every developer is  essentially reinventing the
wheel when it comes to the "shape" of their deployments, leading to a lot of
confusion as to what the idioms and best practices should be, especially for
newcomers.

Having a mind share to collect the best ideas concerning structure and
method would be valuable, not only for its pragmatic implications, but also to
help ease adoption and onboarding for new NixOS users; something that has
traditionally been difficult up to now.

Of course this really hinges on wider community support, as my ideas alone
definitely shouldn't be the final word on what constitutes a correct and well
organized NixOS codebase. Rather, I am hoping to cajole the community forward
by providing useful idioms for others to expand on.

Even if my ideas lose out in the end, I sincerely hope they will, at the very
least, push the community toward some level of consensus in regards to the way
NixOS code repositories are structured and managed.

That said, DevOS appears to be gaining a bit of popularity among new flake
adopters and I am really quite excited and humbled to see others engage the
repository. If you have contributed to the project, thank you so much for your
time and support!

# An Arch KISS

I moved over to NixOS after a decades long love affair with Arch Linux. I found
their brand of KISS to be pragmatic and refreshing compared to alternatives
such as Ubuntu or Red Hat. This isn't to dog on those distributions, which I
also have used and enjoyed for years, but rather to accentuate my affection
for the simplified, and developer focused workflow that Arch Linux enabled for
my work stations.

However, over the years, I came to resent the several hours of tedious work
spent doing what amounted to the same small tasks over and over, any time
issues arose.

My first attempt to alleviate some of this work was by using Ansible to deploy
my common configuration quickly whenever it became necessary. However, I ran
into a ton of issues as the Arch repositories updated, and my configurations
inevitably became stale. Constant, unexpected breakage became a regular
nuisance.

I then became aware of Nix and NixOS, and hoped that it would live up the
promise of reproducible system deployment, and after a brief stint of
procrastination, I dove head first.

# Great but Not Perfect.

At first everything seemed almost perfect. NixOS felt like Ansible on steroids,
and there was more than enough code available in nixpkgs to meet my immediate
needs. Getting up to speed on writing derivations and modules was fairly
straightforward and the DevOps dream was in sight.

It wasn't all sunshine and rainbows, as channel updates sometimes caused
the same sort of breakage I moved to NixOS to avoid. But simple generation
rollbacks were a much more welcome interface to this problem than an unbootable
system. It was a measurable improvement from the busy work experienced with Arch. All in all, I felt it was
well worth the effort to make the transition.

It wasn't long before the [rfc][rfcs] that eventually became flakes emerged.
It seemed like the solution to many of my few remaining gripes with my
workflow. An officially supported and simple way to lock in a specific revision
of the entire system. No more unexpected and unmanaged breakage!

Of course it took a while for an experimental implementation to arrive, but I
found myself digging into the Nix and Nixpkgs PR's to see how flakes worked
under the hood.

Around the same time, the ad hoc nature of my NixOS codebase was starting to
bug at me, and I wanted to try my hand at something more generalized and
composable across machines. I had a first iteration using the traditional
"configuration.nix", but ended up feeling like the whole thing was more
complex than it really needed to be.

My eagerness to get started using flakes was the perfect excuse to start from
scratch, and so began DevOS. An attempt to address my concerns, using flakes.

## How does it work?

First and foremost, I want to point out that the bulk of the credit goes to the
amazing engineer's who have designed and implemented Nix and the ecosystem
as a whole over the last decade.

I see a lot of new users struggling to dive in and get up to speed with the Nix
language, and particularly, getting up and running with a usable and productive
system can take some serious time. I know it did for me.

The hope for DevOS is to alleviate some of that pain so folks can get to
work faster and more efficiently, with less frustration and more enthusiasm for
the power that Nix enables. I especially don't want anyone turning away from
our amazing ecosystem because their onboarding experience was too complex
or overwhelming.

# Everything is a profile!

At the heart of DevOS is the [profile][profiles]. Of course, these profiles
are really nothing more than good ol' NixOS [modules][modules]. The only reason
I've decided to rebrand them at all is to draw a distinction in how they are
used. They are kept as simple as possible on purpose; if you understand modules
you don't _really_ have anything new to learn.

The only limitation is that a profile should never declare any new NixOS module
options, we can just use regular modules for that elsewhere. Instead, they
should be used to encapsulate any configuration which would be useful for more
than one specific machine.

To put it another way, instead of defining my entire NixOS system in a
monolithic module, I break it up into smaller, reusable profiles which can
be themselves be made up of profiles. Composability is key here, as I don't
necessarily want to use every profile on every system I deploy.

As a concrete example, my [develop][develop], profile pulls in my preferred
developer tools such as my shell, and text editor configurations. It can be
thought of as a meta-profile, made up of smaller individual profiles. I can
either pull in the whole thing, which brings all the dependent profiles along
with it, or I can just import a single profile from within, say my zsh
configuration, leaving all the rest unused. Every profile is a directory with
a "default.nix" defining it. You can have whatever else you need inside the
folder, so long as it is directly related to the profile.

Let's draw the obvious parallel to the Unix philosophy here. Profiles work
best when they do one thing, and do it well. Don't provision multiple programs
in one profile, instead split them up into individual profiles, and then if you
often use them together, import them both in a parent profile. You can simply
import dependent profiles via the "imports" attribute as usual, ensuring
everything required is always present.

The key is this, by simply taking what we already know, i.e. NixOS modules, and
sticking to the few simple idioms outlined above, we gain composability and
reusability without actually having to learn anything new. I want to drill this
point home, because that's really all there is to DevOS!

Besides a few simple convenience features outlined below, profiles are the star
of the show. It's really nothing revolutionary, and that's on purpose! By
keeping things simple and organized we gain a level of control and granularity
we wouldn't have otherwise without adding real complexity to speak of.

# Really? Everything?

Yes! Thanks to built in [home-manager][home-manager] integration, users are
profiles, a preferred graphical environment is a profile. Anything that you
could imagine being useful on more than one machine is a profile. There are
plenty of examples available in the "profiles" and "users" directories, and
you can check out my personal "nrd" branch, if you want to see how I do things
on my own machines.

# Anything else I should know?

As mentioned briefly above, DevOS also has some convenience features to make
life easier.

For starters, you might be wondering how we actually define a configuration for
a specific machine. Simple, define the machine specific bits in a nix file
under the [hosts][hosts] directory and import any relevant profiles you wish to
use from there. The flake will automatically import any nix files in this folder as NixOS
configurations available to build. As a further convenience, the hostname of
your system will be set to the filename minus the ".nix" extension. This makes
future "nixos-rebuilds" much easier, as it defaults to looking up your current
hostname in the flake if you don't specify a configuration to build explicitly.

Now what if we actually just want to define a NixOS module that does declare
new NixOS options, you know, the old fashioned way? We'll also want to define
our own pkgs at some point as well. These are both structured closely to how
you might find them in the nixpkgs repository itself. This is so that you can
easily bring your package or module over to nixpkgs without much modification
should you decide it's worth merging upstream.

So, you'd define a package or module the exact same way you would in nixpkgs
itself, but instead of adding it to all-packages.nix or module-list.nix, you add
it to pkgs/default.nix and modules/list.nix. Anything pulled in these two files
will become available in any machine defined in the hosts directory, as well as
to other flakes to import from DevOS!

This setup serves a dual purpose. For people who already know the nixpkgs
workflow, it's business as usual, and for individuals who aren't familiar with
nixpkgs but wish to become so, they can quickly get up to speed on how to add
packages and modules themselves, in the exact same way they would do so upstream
proper.

Now what about overlays? Well, any overlay defined in a nix file under the
overlays directory will be automatically imported, just as with packages and
modules, and are available to all hosts, as well as to other flakes.

What if I want to pull a specific package from master instead of from the
stable release? There is a special file, pkgs/override.nix. Any package listed
here will be pulled from nixpkgs unstable rather than the current stable release.
Simple, easy.

What about cachix? It's super easy to add your own cachix link just as you
would a regular NixOS configuration. As a bonus, it will be wired up as a flake
output so other people can pull in your link directly from your flake! My
personal cachix repo is setup by default. It provides the packages the flake
exports so you don't have to build them.

That should just about do it for DevOS's current quality of life features, but
there are more ideas brewing.

# What's next?
I'm working on a system for seamlessly importing modules, packages and
overlays from other flakes, which isn't too hard as it is, but it's messy
because the current "flake.nix" has a lot of business logic that gets in the way.

Also, I would like to start programmatically generating documentation for
everything. So users can quickly find what goes where and not have to read
drawn out blog posts like this to get started. 😛 Nixpkgs is currently
transitioning to CommonMark for all documentation, and we will probably follow
suite.

Additionally, I want to implement an easy way to actually install NixOS on the
bare metal from directly within the project. I know the [deploy-rs][deploy-rs]
project is working on this, and I'm interested in supporting their project
in DevOS so as to add extra flexibility and power to installation and
deployment!

Also, certain parts of the flake should be tested to ensure things don't break.
We really have no tests to speak of as is. The auto import functions for the
"hosts" and "overlays" directory are good examples.

## A call to arms!
If you'd like to help, please jump in. I am very much open to any ideas that
could reduce the complexity or simplify the UI. If you have a profile you
believe would be useful to others, please open a [Pull Request][pr].

If you think I am crazy and wasting my time, please don't hesitate to say so! I
typically find critical feedback to be some of the most helpful. Most of all,
if you made it this far, thanks for taking some time to read about my efforts
and please consider giving DevOS a shot!


[nix]: https://nixos.org
[DevOS]: https://github.com/divnix/DevOS
[rfcs]: https://github.com/NixOS/rfcs
[modules]: https://nixos.org/manual/nixos/stable/index.html#sec-writing-modules
[profiles]: https://github.com/divnix/devos/tree/template/profiles
[develop]: https://github.com/divnix/devos/tree/template/profiles/develop
[hosts]: https://github.com/divnix/devos/tree/template/hosts
[deploy-rs]:  https://serokell.io/blog/deploy-rs
[home-manager]: https://github.com/nix-community/home-manager
[pr]: https://github.com/divnix/devos/pulls
