---
title: Standard Action
description: Do it once, do it right.
tags:
  - std
  - nix
  - devops
  - github actions
author: Tim D
authorGithub: nrdxp
authorImage: https://avatars.githubusercontent.com/u/34083928?v=4
authorTwitter: nrdxp52262
date: "2022-12-09"
category: dev
---

## CI Should be Simple

As promised in the [last post](./std), I'd like to expand a bit more on what we've
been working on recently concerning Nix & Standard in CI.

At work, our current GH action setup is rather _ad hoc_, and the challenge of optimizing that path
around Nix’s strengths lay largely untapped for nearly a year now. Standard has helped somewhat
to get things organized, but there has been a ton of room for improvement in the way tasks are
scheduled and executed in CI.

[Standard Action][action] is our answer. We have taken the last several months of brainstorming
off and on as time allows, experimenting to find a path that is versatile enough to be useful
in the general case, yet powerful enough for organizations who need extra capacity. So without
any further stalling, let's get into it!

## The Gist

The goal is simple, we want a CI system that only does work once and shares the result from there.
If it has been built or evaled before, then we want to share the results from the previous run
rather than start from scratch.

It is also useful to have some kind of metadata about our actions, which we can use to build
matrices of task runners to accomplish our goals. This also allows us to schedule builds on
multiple OS trivially, for example.

Task runners shouldn't have to care about Nix evaluation at all, they should just be able to get
to work doing whatever they need to do. If they have access to already reified derivations, they
can do that.

So how can we accomplish this? Isolate the evaluation to its own dedicated "discovery" phase, and
share the resulting /nix/store and a json list describing each task and its target derivations.

From there it's just a matter of opimizing the details based on your usecase, and to that end we
have a few optional inputs for things like caching and remote building, if you are so inclined.

But you can do everything straight on the runner too, if you just need the basics.

## How it Works

Talking is fine, but code is better. To that end, feel free to take a look at my own personal CI
for my NixOS system and related packages: [nrdxp/nrdos/ci.yml][nrdos].

What is actually evaluated during the discovery phase is determined directly in the
[flake.nix][ci-api].

I am not doing anything fancy here at the moment, just some basic package builds, but that is
enough to illustrate what's happening. You can get a quick visual by look at the summary of
a given run: [nrdxp/nrdos#3644114900](https://github.com/nrdxp/nrdos/actions/runs/3644114900).

You could have any number of matrices here, one for publishing OCI images, one for publishing
documentation, one for running deployments against a target environment, etc, etc.

Notice in this particular example that CI exited in 2 minutes. That's because everything
represented by these builds is already cached in the specified action input `cache`, so no work is
required, we simply report that the artifacts already exist and exit quickly.

There is a run phase that typically starts after this build step which runs the Standard action,
but since the "build" actions only duty is building, it is also skipped here.

This is partially enabled by use of the GH action cache. The cache key is set using the following
format: [divnix/std-action/discover/action.yml#key][key]. Coupled with the guarantees nix already
gives us, this is enough to ensure the evaluation will only be used on runners using a matching OS,
on a matching architecture and the exact revision of the current run.

This is critical for runners to ensure they get an exact cache hit on start, that way they pick
up where the discovery job left off and begin their build work immediately, acting directly
on their target derivation file instead of doing any more evaluation.

## Caching & Remote Builds

Caching is also a first class citizen, and even in the event that a given task fails (even
discovery itself), any of its nix dependencies built during the process leading up to that failure
will be cached, making sure no nix build _or_ evaluation is ever repeated. The user doesn't have
to set a cache, but if they do, they can be rest assured their results will be well cached, we
make a point to cache the entire build time closure, and not just the runtime closure, which is
important for active developement in projects using a shared cache.

The builds themselves can also be handed off to a more powerful dedicated remote builder. The
action handles remote builds using the newer and more efficient remote store build API, and when
coupled with a special purpose service such as [nixbuild.net](https://nixbuild.net), which your
author is already doing, it becomes incredibly powerful.

To get started, you can run all your builds directly on the action runner, and if that becomes
a burden, there is a solid path available if and when you need to split out your build phase to a
dedicated build farm.

## Import from What?

This next part is a bit of an aside, so feel free to skip, but the process outlined above just so
happened to solve an otherwise expensive problem for us at work, outlining how thinking through
these problems carefully has helped us improve our process.

IOG in general is a bit unique in the Nix community as one of the few heavy users of Nix’s IFD
feature via our [haskell.nix][haskell] project. For those unaware, IFD stands for
"import from derivation" and happens any time the contents of some file from one derivations output
path is read into another during evaluation, say to read a lock file and generate fetch actions.

This gives us great power, but comes at a cost, since the evaluator has to stop and build the
referenced path if it does not already exist in order to be able to read from it.

For this reason, this feature is banned from inclusion in nixpkgs, and so the tooling used there
(Hydra, _et al._) is not necessarily a good fit for projects that do make use of IFD to some extent.

So what can be done? Many folks would love to improve the performance of the evaluator itself, your
author included. The current Nix evaluator is single threaded, so there is plenty of room for
splitting this burden across threads, and especially in the case of IFD, it could theoretically
speed things up a great deal.

However, improving the evaluator performance itself is actually a bit of a red herring as far as
we are concerned here. What we really want to ensure is that we never pay the cost of any given Nix
workload more than once, no matter how long it takes. Then we can ensure we are only ever
building on what has already been done; an additive process if you will. Without careful
consideration of this principle beforehand, even a well optimized evaluator would be wasting cycles
doing the same evals over and over. There is the nix flake evalulation cache, but it comes with
a few [caveats][4279] on its own and so doesn't currently solve our problem either.

To give you some numbers, to run a fresh eval of my current project at work takes 35 minutes from a
clean /nix/store, but with a popullated /nix/store from a previous run it takes only 2.5 minutes.
Some of the savings is eaten up by data transfer and compression, but the net savings are still
massive.

I have already begun brainstorming ways we could elimnate that transfer cost entirely by introducing
an optional, dedicated [evaluation store](https://github.com/divnix/std-action/issues/10) for those
who would benefit from it. With that, there is no transfer cost at all during discovery, and the
individual task runners only have to pull the derivations for their particular task, instead of the
entire /nix/store produced by discovery, saving a ton of time in our case.

Either way, this is a special case optimization, and for those who are content to stick with the
default of using the action cache to share evaluation results, it should more than suffice in the
majority of cases.

## Wrap Up

So essentially, we make due with what we have in terms of eval performance, focus on ensuring we
never do the same work twice, and if breakthroughs are made in the Nix evaluator upstream at some
point in the future, great, but we don't have to wait around for it, we can minimize our burden
right now by thinking smart. After all, we are not doing Nix evaluations just for the sake of it,
but to get meaningful work done, and doing new and interesting work is always better than repeating
old tasks because we failed to strategize correctly.

If we do ever need to migrate to a more complex CI system, these principles themeselves are all
encapsulated in a few fairly minimal shell scripts and could probably be ported to other
systems without incredible effort. Feel free to take a look at the source to see what's really
goin on: [divnix/std-action](https://github.com/divnix/std-action).

There are some places where we could use some [help][7437] from [upstream][2946], but even then, the
process is efficient enough to be a massive improvement, both for my own personal setup, and for
work.

As I mentioned in the previous post though, Standard isn't just about convenience or performance,
but arguable the most important aspect is to assist us in being _thorough_. To ensure all
our tasks are run, all our artifacts are cached and all our images are published is no small feat
without something like Standard to help us automate away the tedium, and thank goodness for that.

For comments or questions, please feel free to drop by the official Standard [Matrix Room][matrix]
as well to track progress as it comes in. Until next time...

[action]: https://github.com/divnix/std-action
[haskell]: https://github.com/input-output-hk/haskell.nix
[nrdos]: https://github.com/nrdxp/nrdos/blob/master/.github/workflows/ci.yml
[key]: https://github.com/divnix/std-action/blob/6ed23356cab30bd5c1d957d45404c2accb70e4bd/discover/action.yml#L37
[7437]: https://github.com/NixOS/nix/issues/7437
[3946]: https://github.com/NixOS/nix/issues/3946#issuecomment-1344612074
[4279]: https://github.com/NixOS/nix/issues/4279#issuecomment-1343723345
[matrix]: https://matrix.to/#/#std-nix:matrix.org
[ci-api]: https://github.com/nrdxp/nrdos/blob/66149ed7fdb4d4d282cfe798c138cb1745bef008/flake.nix#L66-L68
