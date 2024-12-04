---
title: From Nix to Eos
description: Stumbling in the Dark to a Brighter Horizon
tags:
  - nix
  - ekala
  - eos
author: Tim D
authorGithub: nrdxp
authorImage: https://avatars.githubusercontent.com/u/34083928?v=4
authorTwitter: nrdxp52262
date: "2024-12-04"
category: dev
draft: true
---

## Reflections 

Recently, I decided to take an extended vacation—a choice that might seem odd right after a major public announcement and development push. But this time was vital for introspection. During this pause, I stumbled upon a concept that, while humbling, is proving invaluable: "Thought Driven Development." The rule is simple yet profound: if you don’t have the answer, don’t rush to write the code. This approach has illuminated my path, emphasizing that realizing Ekala’s potential requires a deep understanding of our origins and intentions, without drowning in unnecessary details.

For those of us who’ve long been enamored by Nix, myself included, its appeal lies in its groundbreaking formal rigor in software distribution. However, despite years spent working to make Nix and NixOS more accessible, I've been forced to confront some challenging truths about its current implementation. While Nix was a beacon of innovation, breaking long-standing paradigms for noble reasons, it hasn’t fully lived up to its promise.

In addition to these technical hurdles, the Nix project hasn’t been free from political drama. It's like a tangled web of intrigue, where many key figures in Ekala’s foundation—and even some on its fringes—find themselves banned from Nix for life. The "reasons" remain elusive, adding a layer of complexity to our journey. Although I must tread lightly here, it would be a disservice to you, dear reader, not to acknowledge this significant aspect, which has undeniably shaped our path forward. 

## The Misunderstood Promise of Nix

Nix, at first glance, presents itself as a tool to be progressively embraced—start by using it as a package manager on Ubuntu, and if it resonates, move on to the full NixOS experience. However, this approach is misleading. As a simple package manager replacement, Nix can be underwhelming. It's slower, largely due to evaluation issues we’ll explore later, and it’s also complex and not immediately intuitive. The crux of this misunderstanding lies in how Nix’s unique benefits are only fully realized when used declaratively and rigorously—essentially, pervasively.

Transitioning to NixOS after years with traditional Linux distributions can be a revelation, unlike merely using Nix as an apt alternative. Let’s be clear: my intention isn’t to criticize Nix unnecessarily. It opened up an entirely new landscape, and it’s understandable that there would be some stumbles in finding its footing. Yet, the current user experience feels unnecessarily apologetic, almost as if saying, "Don’t worry, I won’t try too hard to be different, I’m just a straightforward package manager."

But here’s the kicker—Nix isn’t merely a package manager. It represents a paradigm shift in how we organize, build, distribute, and even integrate, test, and deploy code. Its innovations are on par with those of version control systems, particularly git. In fact, Nix shares a profound similarity with git. Just as git manages changes across time by creating hashes dependent on the entire history, binding itself uniquely and unchangeably to that history, Nix does the same with software build environments. It assigns each dependency a unique hashed identity, with each hash building upon the previous ones, providing the same level of assurance we expect from our revision control systems, both in the build process and beyond.

To truly grasp the magnitude of the paradigm shift Nix offers, one must experience it in all its unapologetically different glory. Yet, paradoxically, Nix does little to position itself this way, both in its code and its narrative.

## The Brick Wall

Let’s delve into Nix's current de facto user experience in its most common use cases to understand why a bold initiative like Ekala, with its suite of innovations and tools, is crucial. Ekala aims to elevate the world Nix introduced, aligning it with the broader software industry's standards. As someone who's both benefited from and been challenged by using Nix in production, I can tell you candidly that developers aren't rejecting Nix merely because it's "too different." When developers encounter Nix’s genuine UX warts, it's easy to dismiss it as "too complex," but I've come to realize that this isn’t the full story.

Consider this: does one need an intricate understanding of a commit object, how it relates to previous commits in history, or its connection to lower-level objects like trees or blobs, to perform basic git add and git commit operations? The answer is unequivocally no. Yet, when it comes to Nix "education," the focus is often on the complex inner workings of derivations and how to wield them. While it’s useful to know the term, expecting users to understand every detail shouldn't be necessary. However, in Nix's current UX, it often is, and that's the crux of the problem. Users are required to grapple with complexity that should be abstracted away. We've been fooling ourselves for too long, and the real issue is surprisingly straightforward: simplifying the user experience with a familiar little abstraction — one that is embarrassingly pervasive in other contexts but oddly elusive in Nix's current approach.

We already possess an abstraction that encapsulates a point in a software's lifecycle: the version. For instance, if I want to build version 6.5 of a software project, I should be able to install it from nixpkgs. Okay, assuming I figure that out intuitively (which we probably shouldn't assume, but I'll concede for now), I might end up with version 6.7. But why? You might cleverly presume the solution is to use an older checkout of nixpkgs—good instincts—but how do you determine that? We've hit a significant hurdle right at the start, simply because we've overlooked an abstraction that, in any other software context, would be laughably amateur to omit.

Nix should communicate in this language. Nix should know how to find all available versions of software, ideally without brute-forcing through the entire git history of a repository—especially when that repository's history is massive, bordering on world-record breaking. This is where the atom format comes into play...

## Atoms & Automata

I've written about the atom elsewhere, but it deserves a full exploration here. Without diving into the contentious flakes saga that plagued Nix for years, I’ll say this: we've been missing a tool that leverages Nix's backend innovations while abstracting complexity in a way that caters to contemporary developers.

The only point I will make about flakes is that they've delayed meaningful progress. They amounted to a conflated interface to a simple function—a change that could have been introduced without altering the UX—yet they absorbed nearly half a decade of iteration. In my humble opinion, this time was spent attempting to present Nix as a high-level, user-friendly tool, which it inherently is not.

Nix excels at low-level operations, ensuring all the bits and pieces to produce deterministic build environments et al. It doesn't need to apologize for any of this or try to paint over it with inappropriate abstractions that misconstrue its nature. What Ekala aims to provide are tools that relieve Nix of user-facing concerns, allowing it to excel at what it does best.

Atoms represent a fundamental shift. They’re not just bolt-on abstractions replicable in pure Nix code. While there is a Nix component, the core of an atom—if you'll indulge me—is a low-level code distribution format. It's aptly named to signify its nature: a small, self-contained piece of code from a larger repository, just as an atom is part of a larger molecular structure. In addition, atoms are purposefully meant to draw strict boundaries on certain critical meta-data, ensuring it remains static, and thus, trivially derivable, i.e. efficient.

Technically, an atom in Git is an orphaned snapshot containing only its contents and a TOML manifest. Using a proper Git library like [gitoxide][todo], we add metadata that makes the atom's commit object reproducible and securely tied to its original commit. This is achieved by keeping timestamps constant at the Unix epoch and including the original commit hash in the header.

Verification is straightforward: compute the atom's tree-object and compare it with the claimed source commit's tree for that directory. If they match, the atom is authentic, and because its commit is reproducible, it remains inherently trustworthy indefinitely. In scenarios where full history access is unavailable, signed tags can be attributed. Trust the key, and you trust the atom where re-verification is always available as well.

A Git ref in a custom prefix at refs/atoms/<unicode-name>/1.0.0 then points to this "atomic commit", allowing us to query all available versions using Git's efficient ref querying facilities. Importantly, this process does not require moving object data from client to server, ensuring efficiency and scalability.

This format gives us a decentralized code registry akin to those used by modern package managers. It fits perfectly into Nix's source-centric paradigm while providing a useful abstraction to minimize network code transfers during evaluations.

Every atoms, additionally, have an "atomic number" or id, if you prefer, derived from their unicode name and the root of its history allowing them to be distinguished efficiently from each other on the backend, even when working with hundreds or thousands of repositories and millions of atoms (we'll get there soon).

Each atom also has an "atomic number" or ID, derived from its Unicode name and the root of its history. This [innovative approach][link-to-gitoxide-pr] involves using the oldest parentless commit in a Git repository as a derived key for the hasher function applied to the Unicode name. This process generates a unique blake3 hash with a vast collision space, allowing atoms to be efficiently distinguished from one another on the backend, even when dealing with thousands of repositories and millions of atoms—a scale we aim to enabled explicitly from the outset.

The core format is implemented in [eka cli][todo]. Enterprising Nixers could even publish and pull atoms today, albeit with some manual effort. But the atom is merely the cornerstone of the rest of the tools I am designing for Ekala. Leaving it there would be a disservice to our effort to evolve Nix beyond low-level derivation hacking.

## A New Dawn

We are only just beginning to explore how atoms might open up a whole new world for managing and efficiently distributing tasks across numerous machines. Remember, no rush; thought first.

Think not only Nix builds—which are somewhat clumsy to manage today—but also Nix evaluations and corresponding effects for tasks such as integration, deployments, and other operational workflows common to Nix. The vision is to detach user machines from potentially costly operations and offload large numbers of evaluations, builds & tasks across a distributed network efficiently. This approach, rightly imho, explicitly considers Nix's operational use cases from first principles, treating them as a first-class concern.

Centered around the work-in-progress Eos HTTP API, this approach is not an afterthought or a bolt-on solution like many current Nix-based CI systems. It is a fundamental part of Ekala's design, carefully crafted to manipulate the atom format and its advantages while remaining otherwise unopinionated.

While this vision is highly motivating in the long term, it's important to pause and acknowledge that Eos remains the most theoretical and conceptual piece of this puzzle. We have drafts of a white-paper to specify it in exhausting detail up front, saving us the headache of writing circles for ourselves in code. But our plan is explicitly *not* to force it. But rather, to offer the components iteratively, starting with the cornerstone and common sense.

However, it is critical to note Eos as the very motivation that inspired the entire Ekala effort, or at least the first bits of code. It all began with a simple question: "If you had the perfect Nix derivation distribution mechanism right now, what would that look like?" The immediate answer was a modern API that receives requests from a cleanly abstracted, user-centric client. Contemplating the requirements of such a system led to the conception of the atom format and everything built on top so far...

But let's digress to the *status quo*, for a moment, and expand on some other critical design issues surrounding Nix today, and introduce the components in the works meant to address them.



