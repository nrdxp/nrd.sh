---
title: From Nix to Eos
description: From Darkness to Dawn in Store-Based Systems
tags:
  - nix
  - ekala
  - eos
  - eka
  - atom
author: Tim D
authorGithub: nrdxp
authorImage: https://avatars.githubusercontent.com/u/34083928?v=4
authorTwitter: nrdexp
date: "2024-12-04"
category: dev
---

This piece explores the evolution of store-based systems and our vision for their future. While I've aimed to make it accessible to those not intimately familiar with Nix, I assume some technical foundation—particularly an interest in software distribution at scale. If terms like "reproducible builds" or "supply chain security" don't pique your curiosity, what follows might feel rather academic. However, if you're intrigued by how we might tackle the growing complexity of software distribution while maintaining security and sanity, read on.

## Reflections 

I recently decided to take an extended vacation—a choice that might seem odd right after a major public announcement and development push. But this time was vital for introspection. During this pause, I stumbled upon a concept that, while humbling, is proving invaluable: "Thought Driven Development." The rule is simple yet profound: if you don’t have the answer, don’t rush to write the code. This approach has illuminated my path, emphasizing that realizing Ekala’s potential requires a deep understanding of our origins and intentions, without drowning in unnecessary details.

For those of us who’ve long been enamored by Nix, myself included, its appeal lies in its groundbreaking formal rigor in software distribution. However, despite years spent working to make Nix and NixOS more accessible, I've been forced to confront some challenging truths about its current implementation. While Nix was a beacon of innovation, breaking long-standing paradigms for noble reasons, it hasn’t fully lived up to its promise.

In addition to these technical hurdles, the Nix project hasn’t been free from political drama. Without saying too much, it's like a tangled web of intrigue, where many key figures in Ekala's foundation—and even some on its fringes—were banned from Nix for life. The "reasons" remain elusive, adding a layer of complexity to our journey. Although I must tread lightly here, it would be a disservice to you, dear reader, not to acknowledge this significant aspect, which has undeniably shaped our path forward. Suffice it to say, I felt the "weaponizations" of the CoC to be sufficiently bothersome as to inspire an alternative, much simpler [Hacker Code of Ethics](https://ethics.codes), which we have adopted in Ekala.

## The Misunderstood Promise of Nix

Nix, at first glance, presents itself as a tool to be progressively embraced—start by using it as a package manager on Ubuntu, and if it resonates, move on to the full NixOS experience. However, this approach is misleading. As a simple package manager replacement, Nix can be underwhelming. It's slower, largely due to evaluation issues we’ll explore later, and it’s also complex and not immediately intuitive. The crux of this misunderstanding lies in how Nix’s unique benefits are only fully realized when used declaratively and rigorously—essentially, pervasively.

Transitioning to NixOS after years with traditional Linux distributions can be a revelation, unlike merely using Nix as an `apt` alternative. Let’s be clear: my intention isn’t to criticize Nix unnecessarily. It opened up an entirely new landscape, and it’s understandable that there would be some stumbles in finding its footing. Yet, the current user experience feels unnecessarily apologetic, almost as if saying, "Don’t worry, I won’t try too hard to be different, I’m just a straightforward package manager."

But here’s the kicker—Nix isn’t merely a package manager. It represents a paradigm shift in how we organize, build, distribute, and even integrate, test, and deploy code. Its innovations are on par with those of version control systems, particularly Git. In fact, Nix shares a profound similarity with Git. Just as Git manages changes across time by creating hashes dependent on the entire history, binding itself uniquely and unchangeably to that history, Nix does the same with software build environments. It assigns each dependency a unique hashed identity, with each hash building upon the previous ones, providing the same level of assurance we expect from our revision control systems, both in the build process and beyond.

To truly grasp the magnitude of the paradigm shift Nix offers, one must experience it in all its unapologetically different glory. Yet, paradoxically, Nix does little to position itself this way, both in its code and its narrative.

## The Brick Wall

Let’s delve into Nix's current _de facto_ user experience in its most common use cases to understand why a bold initiative like Ekala, with its suite of proposed innovations and tools, is crucial. Ekala aims to elevate the world Nix introduced, aligning it with the broader software industry's standards. As someone who's both benefited from and been challenged by using Nix in production, I can tell you candidly that developers aren't rejecting Nix merely because it's "too different." When developers encounter Nix’s genuine UX warts, it's easy to dismiss it as "too complex," but I've come to realize that this isn’t the full story.

Consider this: does one need an intricate understanding of a commit object, how it relates to previous commits in history, or its connection to lower-level objects like trees or blobs, to perform basic `git add` or `git commit` operations? The answer is unequivocally no. Yet, when it comes to Nix "education," the focus is often on the complex inner workings of derivations and how to wield them. While it’s useful to know the term, expecting users to understand every detail shouldn't be necessary. However, in Nix's current UX, it often is, and that's the crux of the problem. Users are required to grapple with complexity that should be abstracted away in the majority of cases. We've been fooling ourselves for too long, and the real issue is surprisingly straightforward: simplifying the user experience with a familiar little abstraction — one that is embarrassingly pervasive in other contexts but oddly elusive in Nix's current approach.

We already possess an abstraction that encapsulates a point in a software's lifecycle: the version. For instance, if I want to build version 6.5 of a software project, I should be able to install it from nixpkgs. Okay, assuming I figure that out intuitively (which we probably shouldn't assume, but I'll concede for now), I might end up with version 6.7. But why? You might cleverly presume the solution is to use an older checkout of nixpkgs—good instincts—but how do you determine that? The answer isn't trivial, and now we've hit a significant hurdle right at the start, simply because we've overlooked an abstraction that, in any other software context, would be laughably amateur to omit.

Nix should, instead, know how to communicate in terms developers are already keenly familiar with. Specifically, it should know how to find all available versions of software, ideally without brute-forcing through the entire git history of a repository—especially when that repository's history is massive, bordering on world-record breaking (i.e. nixpkgs). This is where the atom format comes into play...

## The Atomic Universe

Having hit the version abstraction wall, we need a solution that fundamentally changes how we think about code distribution. I've written about the Atom elsewhere, but it deserves a full exploration here. Without diving into the contentious flakes saga that plagued Nix for years, I’ll say this: we've been missing a tool that leverages Nix's backend innovations while abstracting complexity in a way that caters to contemporary developers.

The only point I will make about flakes is that they've delayed meaningful progress. They amounted to a conflated interface to a simple function—a change that could have been introduced without altering the UX—yet they absorbed nearly half a decade of iteration. In my humble opinion, this time was spent attempting to present Nix as a high-level, user-friendly tool, which it inherently is not.

Nix excels at low-level operations, ensuring all the bits and pieces to produce deterministic build environments, _et al_. It doesn't need to apologize for any of this or try to paint over it with inappropriate abstractions that misconstrue its nature. What Ekala aims to provide are tools that relieve Nix of user-facing concerns, allowing it to excel at what it does best.

Atoms represent a fundamental shift. They’re not just bolt-on abstractions replicable in pure Nix code. While there is a Nix component, the core of an atom—if you'll indulge me—is a low-level code distribution format. It's aptly named to signify its nature: a small, self-contained piece of code from a larger repository, just as an atom is part of a larger molecular structure. In addition, atoms are purposefully meant to draw strict boundaries on certain critical meta-data, ensuring it remains static, and thus, trivially derivable, i.e. efficient.

Just as Git revolutionized version control by making complex history tracking feel natural, atoms aim to do the same for build environments. You don't need to understand internal tree structures to collaborate on code, and you shouldn't need to understand Nix's derivation mechanics to benefit from reproducible builds.

Technically, an atom in Git is an orphaned snapshot containing only its contents and a TOML manifest. Using a proper library: [gitoxide](https://github.com/GitoxideLabs/gitoxide), we add metadata that makes the atom's commit object reproducible and securely tied to its original commit. This is achieved by keeping timestamps constant at the Unix epoch and including the original commit hash in the header.

Verification is straightforward: compute the atom's tree-object and compare it with the claimed source commit's tree for that directory. If they match, the atom is authentic, and because its commit is reproducible, it remains inherently trustworthy indefinitely. In scenarios where full history access is unavailable, signed tags can be attributed. Trust the key, and you trust the atom. And keep in mind, re-verification from source is always available, when in doubt.

A Git ref in a custom prefix at refs/atoms/unicode-atom-id/1.0.0 then points to this "atomic commit", allowing us to query all available versions using Git's efficient ref querying facilities. Importantly, the query process does not require moving object data from client to server, ensuring efficiency and scalability.

This format gives us a decentralized code registry akin to those used by modern package managers, but one that fits perfectly into Nix's source-centric paradigm while providing a useful abstraction to minimize network code transfers and needless evaluations at runtime.

Every atom, additionally, has an "atomic number" or ID, if you prefer, derived from their unicode name and the root of its history allowing them to be distinguished efficiently from each other on the backend, even when working with hundreds or thousands of repositories and millions of atoms (we'll get there soon).

Each atom also has an "atomic number" or ID, derived from its Unicode name and the root of its history. This [innovative approach](https://github.com/GitoxideLabs/gitoxide/pull/1610) involves using the oldest parentless commit in a Git repository as a derived key for the hasher function applied to the Unicode name. This process generates a unique blake3 hash with a vast collision space, allowing atoms to be efficiently distinguished from one another on the backend, even when dealing with thousands of repositories and millions of atoms—a scale we aim to enabled explicitly from the outset.

The core format is implemented in [eka cli](https://github.com/ekala-project/eka). Enterprising Nixers could even publish and pull atoms today, albeit with some manual effort. But the atom is merely the cornerstone of the rest of the tools I am designing for Ekala. Leaving it there would be a disservice to our effort to evolve Nix beyond low-level derivation hacking.

While the atom format provides a robust foundation for code distribution and verification, it's only part of the solution. To fully realize Nix's potential, we need to address another fundamental challenge: how we organize and structure our configurations. This brings us to one of the most pervasive patterns in the Nix ecosystem—the module system—and why its current implementation poses significant challenges at scale.

## Unbounded Hell: Reducing Complexity in Order to Ascend

Even with the atom format establishing a robust foundation for distribution and verification, we must confront a significant challenge in Nix's ecosystem: its approach to configuration and modularity. The pervasive use of the NixOS module system—adopted everywhere from NixOS itself to home-manager, nix-darwin, and flake-parts—represents a pattern that's become problematic at scale.

The core issue isn't immediately obvious. On the surface, the module system appears to provide a structured approach to configuration with priority merge semantics and type checking. However, this abstraction comes at a considerable cost that becomes apparent in production environments.

First, there's the misleading nomenclature. The "module system" suggests modularity, but what it actually provides is a global namespace with configuration generation capabilities. While this might seem like a reasonable trade-off, implementing these features as a pure Nix library creates substantial overhead. The type checking mechanism, for instance, fundamentally conflicts with Nix's lazy evaluation model—it must eagerly traverse the entire module tree to validate option declarations.

The complexity cost is equally concerning. The system's computational bounds are effectively impossible to determine with precision. While one might approximate the complexity through careful analysis, the results would likely fail any reasonable efficiency criterion. This unrestricted nature becomes particularly problematic as configurations grow, leading to unexpected evaluation bottlenecks and maintenance challenges, such as the infamous impenetrable trace, which has become, unfortunately, somewhat synonymous with the Nix language, even though it is typically derived from the module system's complexity, not necessarily the language.

What makes this particularly insidious is how the module system has become the _de facto_ standard for configuration in the Nix ecosystem, creating an unbounded cataclysm with no meaningful alternatives. Even seasoned Nix developers with extraordinary debugging skills and monk-like patience find themselves trapped in an endless cycle—documenting meta-wrappers around functionality that should have been properly documented upstream. This is especially evident in nixpkgs, one of the largest collaborative software efforts in existence. Despite its impressive scale, a significant portion of development effort is consumed by maintaining complex module semantics that fundamentally shouldn't exist.

What we need instead is a true module system—one that provides:
- Clear semantic boundaries between components
- Predictable evaluation characteristics
- First-class support for proper information hiding
- Some level of familiarity from other language paradigms that work well

This is exactly what the Atom module system endeavors to provide. Out of the gate, performance with the Atom system is impressive. There is no "breaking of laziness" to evaluate complex type declarations, so evaluating through an atom, even without thousands of individuals modules, remains super performant, since you will only evaluate what you need. More importantly though, Atom's provide a saner, and cheaper definition of purity than the existing stable, not stable mess that is flakes. A flake, by design, copies everything you evaluate into the /nix/store, even if it exists on disk, and it does so eagerly, before evaluation even begins, breaking one of Nix's premier features: its lazy evaluation. This is done in an effort to preserve "purity", or so it would have you believe. But wait a second... Isn't Nix, itself, already a sandboxing tool? Why do we need these convoluted semantics and additional complexity leading to a whole-ass [Virtual-Filesystem (VFS) layer](https://github.com/NixOS/nix/pull/6530) that has been in development for years, trying to solve the costs this model introduces? If Nix wanted to enforce purity at evaluation time, couldn't it simply sandbox the process, as it does at build time? We will delve into this a bit more in a later section, but its worth asking.

Even if you disagree, this is far from the only meaningful boundary Atom introduces. A module in an atom, like a true module should, can only see into its existing scope, even on the file-system level. You see, Atom does copy Nix expressions into the Nix store, just like flakes, but it does so lazily, by virtue of Nix's inherent design. For example, if you need to reference a file inside an atom module, you can do so by referencing it from the modules self-reference: `"${mod}/path-to-file-in-module"`. Only when this file is actually read will the contents of the module directory, not including any submodules or nix files, be copied into the Nix store. If you try to reference the file by relative path, you'll get an error, since the Nix expression itself was copied directly into the Nix store lazily as well, the file doesn't exist relative to its location in it; it must be referenced using the modules systems explicitly outline semantics, or not at all.

This approach stands in stark contrast to flakes' eager world-copying strategy, which necessitated years of ongoing VFS development to mitigate its costs. By intelligently leveraging Nix's natural laziness, we achieve the same goals without complex VFS machinery. Furthermore, Atoms enforce stricter boundaries than existing Nix organizational systems: the `import` keyword is explicitly forbidden within modules. Instead of allowing arbitrary imports from unknown locations, all code references must flow through the module system itself. This constraint enables future tooling to perform static analysis efficiently, extracting useful information about the code without evaluation, in stark contrast to the current landscape.

So how do references work in the atom system? If you're up to speed with any modern programming language's module system, you might find it familiar. Similar to Rust's crate system, atoms have a top-level reference `atom` from which every other public member can be referenced, which are denoted by starting with a capital letter. External dependencies are also currently available through here, though this API remains experimental.

If you need to access private members, you can, through the `pre` scope, which is a reference to the parent module, or `pre.pre` for the grandparent, etc. Anything referenced from `pre` has access to all the private members exported by that module. There is also a recursive reference to the current module: `mod`, and finally, an actual proper scope for a true standard library for the Nix language: the `std` scope. Now if you have used the nix module system before, you might think you have to declare these explicitly as inputs to some kind of functional prototype for every single module.

Fortunately, no such boilerplate exists. All of these scopes are simply available within the module. This is more important than just providing convenience and a more familiar semantic from other languages, it also allows us to declare our modules and members as the final data structures that we intend them to represent, rather than a prototype of the data, to be constructed after passing arguments to a function. This makes code inside an Atom module more introspective by default. Where one might open a Nix REPL and explore their code full of legacy Nix modules, only to hit an opaque wall when hitting one of these prototypes, which will require a full evaluation to resolve, you can simply continue happily grepping through your code, allowing consumers to more intuitively discern what a library exports, or an atom contains, etc, etc.

While these features are available today with some effort (see the [README](https://github.com/ekala-project/atom?tab=readme-ov-file)), our ultimate goal is to provide a cohesive system that's intuitively familiar to developers, regardless of their Nix experience. To bridge the gap between our higher-level Atomic module system and the lower-level atom format, we turn to our gateway into the Ekala ecosystem: the `eka` CLI.

The overall structure is good, but I can suggest some refinements to tighten up the flow and clarity while maintaining the technical depth:

## The Proper Level of Abstraction

Eka, our CLI frontend, predates even the Atom format it now implements. Rather than following flakes' path of bolting a higher-level interface onto Nix, we approached the problem from first principles: what should a proper interface into a Nix-centric universe look like? This exploration led us to both the Atom format's innovations and several other concepts still in development.

At its core, `eka` serves as an atomic frontend to a backend service that handles evaluations, builds, and higher-level concerns like deployments and test environments. By decoupling from low-level derivation details, it focuses entirely on providing a clean, intuitive interface to the powerful world of Nix expressions. This design philosophy manifests in several key principles:

1. Zero-evaluation querying: `eka` should never require Nix evaluation to read basic package information. Versions, dependencies, descriptions, and metadata should all be statically accessible. At most, it needs to know an atom's location, with efficient backend querying capabilities for discovering atoms in the wild.

2. Static pipeline construction: Building task pipelines, like CI architecture matrices, should be possible without evaluation. These specifications should be readable directly from static manifests, allowing the backend to efficiently schedule work on appropriate machines.

3. Improved addressing: While flakes introduced useful URI shorthand, we've expanded this concept with Atom URIs. Unlike flakes' hard-coded shortcuts, Atom URIs are configurable, allowing patterns like `work:repo::my-atom@^1`. Crucially, these always expand to full URLs in the final output, ensuring universal understanding while maintaining convenience.

To support this ambitious scope, we plan to implement a language-agnostic plugin system for `eka`. While the core remains focused on efficient atomic operations and basic backend communication, plugins will extend functionality through a well-defined API surface. This extensibility will become increasingly important as `eka` evolves, and to help avoid bloat and complexity in the core codebase.

The ultimate vision for `eka` users is efficient querying of packages, deployment manifests, and configurations across their organization and the open-source landscape—all without upfront Nix evaluation. It should optimize away unnecessary evaluations and builds when artifacts exist in cache, in concert with the backend, proceeding directly to fetching. If `eka` ever needs to perform evaluation for value generation, we've strayed from our design goals.

While significant work remains, our roadmap is tracked in the [README](https://github.com/ekala-project/eka?tab=readme-ov-file). We're approaching a crucial milestone with the Atom lock format's finalization. Once complete, users will be able to create, link, and depend on Atoms with familiar commands like `eka add my-repo::my-dep@^1.0`—no esoteric knowledge required.

`eka` represents more than just a CLI tool—it's the gateway into a new paradigm of store-based system interaction. Its role as a frontend is deliberate, allowing it to focus on providing an intuitive interface while delegating complex evaluations and builds to a more sophisticated backend. This separation of concerns brings us to perhaps our most ambitious vision within the Ekala ecosystem: the Eos API & scheduler.

## A New Dawn

While we've introduced atoms and their immediate benefits, we've only scratched the surface of how they might revolutionize task distribution across machines. Remember our principle: thought first.

The atom format isn't just a cornerstone of Ekala by coincidence. While its frontend efficiency gains through `eka` are valuable, its true potential emerges when we consider the backend it enables: the Eos HTTP API.

Think beyond mere Nix builds—which are already cumbersome to manage. Consider evaluations, integrations, deployments, and operational workflows common to Nix environments. Our vision detaches user machines from costly operations, efficiently distributing evaluations, builds, and tasks across a network. This approach treats Nix's operational use cases as first-class concerns, designed from first principles.

Eos isn't just about distribution—it's about trust. In an era of increasing supply chain attacks, every evaluation, every build, and every artifact must be cryptographically verifiable. By leveraging atoms' inherent verification properties and Nix's reproducible builds, Eos provides end-to-end supply chain integrity without compromising on performance or usability.

Why an API? As we progress through the 21st century, well-designed APIs have become fundamental to system architecture. But bringing Nix into the modern era is just the start—we aim to push its boundaries. Nix's unique, idempotent properties cannot be fully leveraged without purpose-built tooling and careful abstraction.

The Eos HTTP API isn't an afterthought or bolt-on solution like many current Nix-based CI systems. It's fundamental to Ekala's design, crafted to leverage the atom format's advantages while remaining unopinionated about higher-level concerns.

Although this vision is compelling, transparency requires acknowledging that Eos remains our most theoretical component. We're developing a comprehensive whitepaper to specify its details upfront, avoiding costly iterations in code. Our approach is intentionally iterative, beginning with the cornerstone components and building thoughtfully from there.

Crucially, Eos represents the spark that ignited the entire Ekala effort. It began with a simple question: "What would the perfect Nix derivation distribution mechanism look like?" The answer—a modern API serving a cleanly abstracted, user-centric client—led us to develop the Atom format and its supporting ecosystem.

## The Road Ahead

Before diving deeper into Eos, let's reinforce a crucial point about atoms' role in our architecture. We've established why atoms bridge the gap between low-level Nix derivations and higher-level concepts like repositories and versions. This bridge is fundamental to Eos, which relies on atoms' globally unique identities. Each atom's cryptographic identity, determined by just two elements—the repository's root commit hash and the manifest's Unicode name—provides a stable reference point unlike frequently changing derivations.

This identity system creates powerful possibilities. Need to mark a fundamental code change? Simply rename the atom. Moving to a new repository? The atom automatically gains a distinct identity. These IDs serve as efficient anchor points for Eos, enabling quick curation without centralization or expensive scanning. While `eka` can directly query atoms and versions within known repositories, Eos can track atoms it encounters across the entire ecosystem, providing location information on demand.

But atoms are just the beginning. Anyone who's worked with Nix's remote build capabilities—whether the legacy system or the newer experimental UI—knows its limitations in distributing work across machines. Eos aims to solve this through intelligent request handling. For public repositories, Eos can fetch directly using its optimized network. For private code, atoms' efficient transfer format (remember: just git trees of existing objects) enables smart, deduplication-aware transfers.

Think of Eos as a network of machines that you can organize however you want—hide them in your private network, expose them to the world, or mix and match. The beauty is in its flexibility: you're in control of how your builds and evaluations flow through your infrastructure. At its core, Eos is a Nix-centric scheduler handling evaluations, builds, and higher-level tasks like testing and deployment. For example, we're exploring Raft for high-consistency queue synchronization across machines, ensuring resilience against outages.

While the distributed design is complex, the goal is straightforward: leverage Nix's unique properties and now, the Atom format, to eliminate redundant work across your network. If one machine evaluates but doesn't build, schedule the derivations elsewhere. If something's built but not cached, ensure it reaches long-term storage en route to users. Everything should be garbage-collectable—imagine keeping major releases permanently while cycling out development builds, etc.

Eos isn't meant to be monolithic. We're planning to integrate components from Tvix, which reimagines Nix with modern architecture to simplify the effort significantly. At its simplest, Eos is a distributed HTTP gateway receiving requests from frontends like `eka`, scheduling them across known machines. While the complexity is significant, it's worthwhile only if it fully exploits Nix's idempotent properties for pipeline optimization from the foundation.

Our vision extends beyond just managing packages—we're building a framework where security, reproducibility, and sanity are fundamental properties, not afterthoughts. In an era of increasing supply chain attacks, Nix & Ekala's combination of cryptographic verification, reproducible builds, and distributed intelligence positions us to tackle these challenges head-on. We're prioritizing integration with existing standards like SBoM, ensuring that every input is tracked, and every output is independently verifiable.

While a complete Eos scheduler isn't imminent, our journey has already yielded valuable innovations like the Atom format, module system, and the `eka` CLI. Our commitment to "Thought Driven Development" guides us in building tools that respect both users' freedom and intelligence, providing power without sacrificing transparency or independence.

We invite you to be part of this evolution. Whether you're a seasoned Nix veteran or just curious about the future of software distribution, join us on [Discord](https://discord.gg/AeZkaQqw) or explore our [GitHub Organization](https://github.com/ekala-project). Together, we can build a future where store-based systems are not just theoretically elegant, but practically transformative for developers everywhere.
