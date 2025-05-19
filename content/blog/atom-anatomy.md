---
title: Anatomy of an Atom
description: A Solid & Natural Foundation
taxonomies:
  tags:
    - opensource
    - ekala
    - nixos
date: "2025-05-16"
extra:
  read_time: true
  repo_view: true
---

At last, I’m diving into the technical nitty-gritty of my own contributions to the Ekala project, a vision I’ve long teased but, regrettably, delayed. I’ve already shared a [high-level overview](../nix-to-eos) of its ambitious vision, but to bring any grand idea to life, it must be broken down into manageable pieces. Ekala started as a thought experiment; an exploration of how an ideal architecture for a Nix-like build system might be structured. What emerged convinced me to pursue a path I feel compelled to follow, despite efforts to steer me otherwise.

In the spirit of honesty, I see the growing complexity in the Nix ecosystem, both technical and social, as a serious threat to its future. As a holistic thinker unafraid to cross boundaries others might avoid, I believe the community’s rising tensions (however well-masked) and the lack of clear technical leadership are deeply intertwined, not merely coincidental.

Let me be clear: this isn’t an indictment of any specific person or faction caught up in the drama. I admire the resolve to chase one’s convictions, even if I find their foundations flimsier than my own.

Still, by now I hope my readers see that I view the push for political alignment in open-source—however well-intentioned—as unhealthy and utterly at odds with its founding ideals. I’ve explored this [intimately](../closed-openness) and [technically](../code-of-rebellion) elsewhere, so I’ll keep it brief: I see the hijacking of community goodwill for extreme political agendas that undermine our technical goals—whether in Ekala, Nix, or open-source broadly—as a direct assault on our ethos.

In all this, I’ve reached a difficult but reasoned conclusion: we must not support, let alone empower, individuals or institutions that promote or passively tolerate such agendas if open-source is to remain a vibrant force, not a hollow shell of its former self. If my firm stance feels unacceptable, dear reader, feel free to step away—I’ll think no less of you.

And if this seems off-topic, forgive me, but I feel compelled to restate my position briefly given the current landscape. Curious why? My linked pieces and earlier writings justify my growing resolve. This clarity fuels my drive to continue building Atom—a technical rebellion against complexity. With that, I’m grateful for the patience of those who’ve stuck with me. Life has taught me that sometimes the only path forward is one you carve yourself. As I’ve noted, personal and social upheaval over the past year has pushed me down an unexpected road. Though my reserved nature makes me hesitant to share too many personal details, and despite the stress it’s caused, I’ve laid the groundwork for what lies ahead, and I’ll gladly walk this path—twists and all—as long as I’m able.

To the point: with my philosophical footing now secure and my conscience clear, I’m ready to unpack the technical details unencumbered. I may have been overly optimistic about timelines at first, blindsided by one of the toughest years I’ve faced. Now though, with a clearer perspective, I’m aiming for a 6-to-12-month horizon for Atom as I recharge and press on. Since Atom is the foundational component of my overall vision within Ekala, let's begin this new technical blog series with a thorough exposition of it, shall we? Fair warning, this is a long one...

# Atom: A Review

If you’ve followed my previous writings or poked around in my code, you might already have a rough sense of the foundational format I’m championing: the Atom. To keep this piece standalone, though, let’s recap its high-level design and the driving force behind it before we go deep. The silver lining to the long gap between iterations? My ability to explain my designs after months of stewing has, hopefully, gotten a lot sharper.

## The Runaway Train: A Motivation

Conventional wisdom in tech projects says that once you hit a certain scale, foundational overhauls are a bad idea: iterative tweaks are the safer play. But every now and then, the existing setup is so broken that it starts threatening the project’s very existence. When that happens, a radical rethink isn’t just an option; it’s a necessity.

I’ve spent nearly a decade with Nix, half of that in professional gigs, and I’ve watched the same problems rear their heads as organizations scale up their Nix usage. I won’t bore you with the gory details; anyone who’s made a non-trivial contribution to [nixpkgs](https://github.com/nixos/nixpkgs) knows the pain all too well, and if you are really curious, there is plenty of evidence all over the internet, by now. The real kicker? These issues don’t seem fixable without rethinking the core idioms we use to write and, especially, organize Nix code.

As projects like nixpkgs balloon to massive scale, the cracks only get worse. Long-standing social drama has some folks burying their heads in the sand, or dipping out entirely. Others might lack the experience to see the train wreck coming. Some are too tied to the status quo to budge, while others, like the teams behind [snix](https://snix.dev/blog/announcing-snix/), the promising early-stage [cab language](https://github.com/cull-os/carcass?tab=readme-ov-file), and our own [ekapkgs](https://github.com/ekala-project/ekapkgs-roadmap), are stepping up with bold efforts to tackle the mess.

I’m rooting for those projects to succeed; their technical vision lines up closely with my own take on the challenges. My original plan was to pitch in and support them, aiming to complement their work rather than reinvent the wheel. But along the way, I stumbled onto what I now see as a glaring gap in the ecosystem: one that _has_ to be filled if we’re going to solve these scaling issues at their root.

## The Missing Link: Language-Level Packages

There’s an irony in Nix. It’s a domain-specific language (DSL) meticulously crafted to deliver binary software packages with precision and discipline, yet it barely considers packaging its own expressions in a similar way. To avoid confusion—since “package” is a heavily overloaded term—we're referring here to _source code distribution packages_. Think `package.json` or `Cargo.toml`: formats that bundle source code into clean, discrete units for easy distribution and downstream use.

Since I’m a Rust enthusiast, let’s use it to illustrate. In Rust, a repository might house a workspace with dozens, maybe even hundreds, of _crates_: self-contained package units. When it’s time to publish, each crate gets neatly bundled and shipped to a central registry. If I need crate _a_ from a larger workspace _P_, I can grab just _a_ from this registry, no extra baggage from _P_ included. Later, if I need a newer version of _a_, it’s simply another pull from the registry; only the files for _a_, nothing more.

Now contrast that with nixpkgs. Want package _a_? You’re stuck pulling the _entire_ repository just to evaluate it. Sure, _a_’s dependencies get fetched in the process, but most of the code you’re downloading has nothing to do with _a_. Need a different version of _a_ down the line? You’re fetching another full nixpkgs checkout, with another chunk of totally irrelevant code. It’s not hard to see how this spirals out of control. It’s not sustainable.

Like any well-designed language ecosystem, we should have a straightforward way to grab _only_ the Nix expressions we need, with their dependencies pulled in piecemeal—no more, no less. It’s not just about efficiency; it’s just as much about maintaining sanity.

### The Unique Challenge of Packaging Nix Code

Of course, this feels like it should be obvious, especially after years in the trenches. When flakes came along, I was hopeful they’d crack this nut. Spoiler: they didn’t. In fact, they sometimes make it worse, though I won’t dive too deep into that here. The core issue is that flakes still require you to fetch the full repository context to evaluate them, which kills any chance of packaging smaller expressions. Even if you split your repo into multiple flakes—not a trivial task—you’re still dragging in the whole repo for each subflake. It’s the same mess, just rearranged.

The real problem, delivering small, _versioned_ units of Nix code efficiently, has barely been touched. Some folks dedicate tiny repos to a single package, but that’s rare. Flakes encourage tying Nix to project source, and nixpkgs itself is a sprawling monolith. The repository boundary is just too coarse. We need something finer-grained, like a single Rust crate in a workspace, to have any hope of taming the challenge of distributing only the Nix expressions needed for building binaries.

This isn’t a simple fix, though. Nix is source-first by design; it needs access to source code to evaluate expressions and build packages. That tight, cryptographically secure link between expressions and their source repo is one of Nix’s biggest strengths. Slapping on a centralized registry model, like other languages use, would shred that advantage.

So, we need a novel approach; one that doesn’t sacrifice what makes Nix powerful. I experimented with tools like [josh proxy](https://github.com/josh-project/josh), which seemed promising but couldn’t handle nixpkgs’ scale. It became clear there’s no off-the-shelf solution for this, not at the size we’re dealing with. What I needed was a system that:

- Preserves the cryptographic tie between Nix expressions and their source.
- Distributes directly from the source, staying true to Nix’s ethos.
- Adds no runtime overhead to enumerating available atoms and their versions, ensuring trivial scalability.
- Scales efficiently across repositories of any size, letting users organize their projects based on preference, not constraints.
- Delivers only relevant, versioned code in a way that’s simple to understand and use.

# Atomic Anatomy

In the last section, I introduced the motivation behind atom—a foundational format to rethink how we package and distribute Nix expressions. Driven by the escalating complexity of nixpkgs and the Nix ecosystem’s scaling woes, I argued that a first-principles overhaul is critical to avoid a maintenance nightmare. While I respect efforts like snix and cab, I’ve identified a unique gap in the ecosystem that the atom aims to fill, complementing those projects with a format they could adopt in the future. Now, let’s unpack the technical anatomy of an atom and see how it tackles the problem head-on.

After years with my hands deep in the code, stepping back to explain the big picture to newcomers can be tough. But to build support and drive adoption, I’ve realized I need to double down on describing my work as simply as possible. So, let’s start from the ground up and build from there.

## A Packaging API

The Atom API is deliberately generic, unbound from any specific language, ecosystem, or storage system. Think of it as a source code packaging API: a frontend defines how to package code for a given language, and a backend, termed an Ekala store, specifies where and how those atoms are stored. This flexibility isn’t just elegant design—it’s practical, letting atom adapt to the diverse needs of different organizations.

Why such an open approach? A clear, high-level API for the atomic universe is good design, but it’s also about real-world utility. The Git storage backend, which I’ll cover soon, aligns perfectly with the open-source ethos of transparency and redistribution. Yet some organizations prioritize privacy and security over source availability—an S3 backend, for example, could offer a centralized solution to meet those needs. This versatility ensures atom supports varied use cases while maintaining a unified user-facing API, without locking anyone into a single mold.

This openness also future-proofs the design. If atom gains traction, it could support new frontends like Guix or even Cab, or integrate with existing packaging formats. Picture “atomic” Cargo crates distributed from an Ekala Git Store—a concept I’ll clarify in the next segment. While supporting existing formats isn’t my focus now, it underscores the design’s potential.

To ground things, let’s dive into the Atom Nix frontend and Git storage backend, which are tightly linked to the motivating use case outlined earlier and the heart of current development efforts. We’ll begin with the latter, the lower-level storage foundation, and build up from there.

## Atomic Git

As I’ve outlined earlier, Nix’s current code distribution mechanism has a glaring flaw. To reference a package at a specific version, you must first identify the nixpkgs checkout containing that version—a process that’s neither obvious nor trivial. Need another version? Find another nixpkgs checkout. Need both simultaneously? You’re stuck fetching all of nixpkgs’ unrelated code twice. Anyone who’s wrestled with a bloated `flake.lock` file has felt this pain, as I’ve [previously noted](../nix-to-eos#the-brick-wall), so I won’t belabor it here.

If you’re familiar with Git’s internal object format, though, you might wonder why this is even necessary. Every file and directory in Git is a content-addressed object, which, in theory, should be independently referenceable and fetchable. The issue isn’t that Git can’t handle this—it’s that Git’s conventional linear history model obscures a more elegant solution.

As mentioned, this led me to explore tools like josh proxy, hoping to filter nixpkgs’ history and extract specific package definitions without fetching the entire monorepo. But nixpkgs’ massive history overwhelmed even josh’s impressive speed, and it required a non-standard Git proxy that’d need ongoing maintenance. Worse, Nix code lacks inherent boundaries, so fetched objects might reference unrelated code from elsewhere in the repo, breaking the isolation we need.

We’ll tackle Nix’s code boundary issue when we discuss the Atom Nix frontend. For now, let’s focus on leveraging Git’s object structure to solve our storage woes. Git doesn’t offer a straightforward API to fetch individual objects, and even if you resort to the lower level plumbing, you’d need their IDs upfront—requiring a costly search through the project’s history, which is essentially what tools like josh do.

For the uninitiated, Git’s high-level entry point is typically a reference (e.g., a branch under `refs/heads` or a tag under `refs/tags`). References usually point to a commit or tag object, and users can list them on a Git server with a quick, lightweight request—no need to fetch object data or sift through history. The reference points to a commit’s hash, letting the client fetch specific objects directly. Pause for a second: this is _exactly_ the behavior we need to fix our problem.

If we could cheaply list server-side references pointing to specific history subsections—say, a Git tree object (a directory)—without pulling the entire repo or filtering its history, we’d be golden. If those references had a clear, versioned format, we’d have it all: ping the server, see all available package versions, and fetch only the relevant code, no matter the repo’s size or history.

That’s precisely what the Ekala Git storage backend does, at a high level, but since this is a technical deep dive, let’s go a little further.

```console
# demonstration of querying a remote for atom refs with `git` cli
❯ git ls-remote origin 'refs/atoms/*'
62e1b358b25f22e970d6eecd0d6c8d06fad380a7        refs/atoms/core/0.3.0
c85014bb462e55cc185853c791b8946734fd09bf        refs/atoms/std/0.2.0
```

### An Atomic Reference

The Atom Git Store, as described, uses references to isolate specific repository subsections—both spatially (subdirectories) and temporally (points in history). To make this work seamlessly with Nix, though, we need to address some key details.

Git treats tree and blob objects as low-level implementation details, with no high-level “porcelain” commands to fetch or manipulate them. Most user-facing tools, including Nix, only understand commit or tag objects. For example, passing a tree object reference to Nix’s `builtins.fetchGit` function will fail, as it expects a commit, not a tree.

To bridge this gap, we wrap atomic Git trees in orphaned commit objects—detached from history, carrying no baggage on fetch. This lets Git-aware tools, like the Git CLI, treat atoms like branches or tags (e.g., for checkout). This detachment, however, risks breaking our requirement to preserve the cryptographic tie between Nix expressions and their source. Fortunately, we can leverage cryptographic primitives to link the atom to its original history rigorously.

How? The [implementation](https://github.com/ekala-project/eka/blob/b3b62913ae04318bb34ed50d31004e8b9463ff0b/crates/atom/src/publish/git/inner.rs#L171-L202) offers a peek, but here’s the gist: we ensure the orphaned commit’s hash is fully reproducible for sanity and hygiene, using a fixed author and timestamp (Unix epoch). To tie it to the source, we embed metadata in the commit object’s header, which influences its final hash. Specifically, we include:

- The commit SHA from the source history where the atom was copied.
- The relative path from the repository root to the atom’s root.

These, combined with the commit’s reproducibility, yield powerful properties:

- **Source Verification**: Users can verify the atom by checking the embedded SHA and ensuring the tree object ID at the specified path matches the source commit’s. Since tree objects are content-addressed, this guarantees the atom’s source hasn’t been altered.
- **Trust and Signing**: A verified, reproducible atom commit can be signed with a standard Git tag object. Organizations can use a trusted signing key for added security, ensuring downstream users who trust the key can rely on the atom’s integrity. Since the commit is reproducible, a verified SHA remains trustworthy indefinitely. If a key is compromised, the tag can be revoked and re-signed with a new key—no need to alter the commit.
- **Low Overhead**: The atom adds minimal load to the Git server. Using low-level operations via [gitoxide](https://github.com/GitoxideLabs/gitoxide), it references existing Git trees and blobs (the actual files). This is like a shallow copy in Rust or C—a new pointer to pre-existing data—making the operation fast and lightweight.

### Isotopic Versioning

We’ve built a solid foundation for publishing and referencing Nix code (and potentially other languages) with the Atom Git Store. But one critical piece, which I’ve stressed before, deserves its own spotlight: versioning. It’s the linchpin of the atom scheme and warrants a dedicated section.

Every atom must be versioned, currently using semantic versioning, though we could support other schemes later to accommodate diverse software naturally. As shown earlier, each atom’s Git reference lives at `refs/atoms/<atom-id>/<atom-version>`. This structure is key for efficient discovery. Querying references from a Git server is lightweight, with filtering done on the server side—no heavy object fetching required. A single request made with a simple glob pattern can list all atoms and their versions in a repository. Try that with nixpkgs today—it’s a slog, requiring costly history traversal and git log parsing, with no guarantee of accuracy if the log format hiccups; not to mention you'll have to have the whole history available locally to be exhaustive.

By contrast, the atom format is standardized (though evolving), efficient, and well-typed. When published using the official atom crate library, atoms are guaranteed to conform to spec. We even embed the format version in the atom’s Git commit header, ensuring tools can easily handle future backward-incompatible changes by identifying the format version upfront.

Versioning also enables disciplined dependency management. Dependencies can be locked to simple semantic version constraints (e.g., `^1`). Down the line, a version resolver could traverse the dependency tree to minimize the closure while leveraging Nix’s ability to handle multiple software versions seamlessly. This will ensure the smallest possible dependency set, even when different versions are needed in the chain.

Equally critical is the user experience (UX). Versioning as the primary abstraction lowers the barrier to entry for Nix newcomers. Users can fetch, use, or build software without grappling with concepts like “derivations.” Only package maintainers and developers need to dive into Nix’s internals—evaluation, dependency closures, and the like. Regular users get a smoother, less daunting onboarding while still reaping Nix’s powerful benefits.

### Atomic Numbers: A Rigorous Identity

This leads us to a critical aspect of atoms: their machine identity. As we’ve hinted in the reference and versioning scheme, each atom has a human-readable, Unicode ID specified in its manifest alongside its version. This ID, shown in the Git reference before the version (i.e., `refs/atoms/<atom-id>/<atom-version>`), uniquely identifies the atom within a repository. To keep things hygienic, we enforce sanity rules: no two atoms in the same repository can share the same Unicode ID in the same commit. For example, you can’t have atom “foo” under both `bar/baz` and `baz/buz` simultaneously, but you can move “foo” between paths across commits.

With thousands or millions of atoms across multiple repositories, Unicode IDs alone become ambiguous—name collisions are inevitable. We need a robust, cryptographic identity to uniquely and efficiently identify atoms. A GitHub discussion (which I’ve tried, and unfortunately failed, to track down for reference here) once highlighted a gap in Nix: it lacks a high-level package abstraction to distinguish “packages” from other derivations. A Nix derivation can represent inputs (sources, patches, build scripts) or outputs (packages, systems, JSON files), yet Nix, despite billing itself as a package manager, offers no unified way to identify a package derivation as distinct among these.

Why does this matter? Try tracking a package’s evolution in nixpkgs. You might lean on its name or path, but those can shift. Same source, same project, but a tiny tweak changes the derivation hash, and poof—continuity’s gone. Without rigor, you’re stuck guessing if it’s the same package across time. Atoms fix this with a machine ID that’s logical, rigorous, and ties a package to its versions or even dev builds (like their derivation hashes) with mathematical precision.

So, how do we pull this off? We need to disambiguate atoms with the same Unicode ID across repositories. I wrestled with ideas—maybe the repo’s URL? But URLs shift without touching the project’s core (name, maintainers, versions). After banging my head on it, the answer hit me: the [initial commit](https://github.com/GitoxideLabs/gitoxide/pull/1610) hash of the repository. Think about it: a repo’s history flows from one unique starting point: that first "seed" commit. It’s set in stone—rewrite it, and you’ve got a whole new beast. It’s the perfect, unchanging marker for a repository, no matter where it’s hosted or how it evolves.

From there, we derive the atom’s machine ID using a [keyed BLAKE3 hash](https://github.com/ekala-project/eka/blob/b3b62913ae04318bb34ed50d31004e8b9463ff0b/crates/atom/src/id/mod.rs#L93) over the repository’s initial commit hash, a constant for key derivation, and the atom’s Unicode ID. BLAKE3’s speed and vast collision space let us index trillions of atoms with negligible risk of collisions. This hash then becomes our bridge, linking the gritty world of derivations to the human world of versions, pulling software distribution idioms cleanly into Nix’s rigorous realm of closures.

And what’s it good for? A ton. It can power optimizations like bulletproof evaluation and build caches. Picture a [backend](../nix-to-eos#a-new-dawn) that spots a user’s requested atom and version, verifies its pinned commit, and checks the organization’s work history. Been built before? Boom—it skips the work and hands over the artifact. That’s not just faster; it splits concerns cleanly. A user’s client doesn’t need to touch a Nix evaluator—just parse the atom API and ping the backend. If evaluation or building’s needed, the backend handles it quietly; if not, you get results instantly.

This opens up a lot of possibilities. Beyond speed, the machine ID boosts provenance tracking, record-keeping—everything a big outfit might need to manage its atoms or meet compliance standards. And it's important to note: the source identity (that initial commit hash) is an abstraction, so future storage backends can pick their own hash keys, keeping Atom flexible for the future.

Now with atom identities locked in, we’re ready to tackle how non-package content fits into the mix, especially in those sprawling monorepos.

### Subatomics

We’re nearly ready to climb the abstraction ladder and explore the Atom Nix frontend. But first, we need to cover one more critical piece planned for the Git store before it hits 1.0. Many organizations rely on large monorepos, blending source code with configuration—think package descriptions, CI workflows, and more. A single monorepo might house hundreds or thousands of software projects. As I’ve noted, a key goal for the atom format is to work seamlessly across diverse project structures, from sprawling monorepos to small, focused repositories.

If we stopped here, monorepos could still be a pain. Referencing source code from different places and points in history would mean fetching the entire monorepo each time—echoing the nixpkgs dilemma we outlined earlier. To ensure a consistent, pleasant user experience, we need a way to reference repository subsections that aren’t full atom packages, with the same efficiency as atoms.

Enter subatomics, the working title for these lightweight “lenses” into a monorepo’s vast history, much like atoms but for non-package content. Their format is slightly tweaked to handle less structured data. Instead of named, versioned references, subatomics use a flat, content-addressed form: `refs/subs/<git-tree-id>`. The Git tree object ID, already a content-addressed identifier, acts as a simple, self-verifying reference for the subsection. For compatibility with Git tooling, each reference points to a reproducible, orphaned commit object, carrying all the same benefits as atoms: reproducibility, verifiability, and optional signing.

We’ll explore how users define subatomics when we move up the abstraction chain, but it’s worth noting that they’re created only when atoms reference other repository segments (e.g. a source tree for a build) as dependencies, ensuring their existence during the atom publishing phase.

## User Entry URIs

We’ve thoroughly covered the Ekala Git store, the atom format’s first storage backend, crafted to tackle Nix’s scaling woes while staying intuitive for newcomers and veterans alike. It leans on, perhaps, the most uncontroversial abstraction in software: the version. With subatomics now in the mix to handle non-package content, we’re ready to shift gears toward the Atom Nix language API—but first, let’s talk about user interface, specifically how we reference atoms.

Even the slickest tooling can flop with clunky UX. The [`eka` CLI](https://github.com/ekala-project/eka?tab=readme-ov-file) is still a work in progress, and not all its features tie directly to atoms, but one piece, the [atom URI](https://github.com/ekala-project/eka?tab=readme-ov-file#the-atom-uri), is already [implemented](https://github.com/ekala-project/eka/blob/b3b62913ae04318bb34ed50d31004e8b9463ff0b/crates/atom/src/uri/mod.rs) and worth a look. It’s how we address atoms, and it’s a game-changer for usability.

Now, I’ve had a love-hate relationship with flakes. I went from preaching their gospel in the early days, to groaning every time I deal with them. Yet one thing I always liked was the flake URI. It’s handy, but not without its flaws. The “shortcuts” aren’t short enough—I’m still typing most of `github.com`. Worse, those shortcodes are hardwired into the Nix binary, so if your favorite Git host isn’t listed, you’re out of luck. And don’t get me started on how flake URIs, embedded in `flake.nix`, can confuse newcomers and break clickability in editors or IDEs. I wanted to keep what works, fix what doesn’t, and add support for explicit atom versions. After a couple of intense hacking weekends, the atom URI was born, and it’s pretty much feature-complete.

The syntax is dead simple. Here’s the schematic:

```
[scheme://][[user[:pass]@][url-alias:][url-fragment::]atom-id[@version]
```

The scheme (e.g., `https://`, `ssh://`) is usually omitted, with smart heuristics picking a sane default. The `user:pass` bit is there for completeness’s sake but rarely needed. The real magic is in user-defined aliases—think URL shorteners for common paths:

```toml
# eka.toml: client config file
[aliases]
# predefined for convenience
gh = "github.com"
# can build on other aliases
work = "gh:my-verbose-work-org"
cool = "work:our-cool-project"
org = "gitlab.com/some-org"
```

This lets you write commands like:

```
❯ eka do org:project::the-atom@^1
❯ eka get work:repo::a-pkg@0.2
❯ eka add cool::cool-atom@^3
```

When adding an atom as a dependency (like that last command), the manifest stores the full URL—e.g., `https://github.com/my-verbose-work-org/our-cool-project`—making it readable and clickable. This is crucial: embedding aliases in the manifest would break for downstream users without the same aliases, so we expand them to keep things sane.

Additionally, as a core library component, any tool interacting with atoms can tap this URI format to reference them effortlessly. It’s a small but mighty piece of the puzzle, making atoms as easy to use as they are powerful.

Now, let’s dive into the Atom Nix language API and explore how it harnesses this foundation to help deliver a more disciplined, scalable Nix experience.

## Atomic Nix

With the atom URI paving the way for user-friendly access, we’re ready to explore the high-level Atom Nix language frontend. As I’ve said, Atom is fundamentally a packaging API. We’ve dissected the Ekala Git store as a storage backend; now it’s time to unpack what a language frontend needs to mesh with the atom protocol. This depends heavily on the language’s built-in facilities—or lack thereof. Take Rust: integrating Cargo crates with atom would be a breeze, since Cargo already provides a slick, consistent frontend. It’d likely just need atom as a dependency in the `cargo` binary and some glue code to tie it together.

We’re not rushing to support existing formats like Cargo while atom’s still young, but I bring it up to contrast with Nix. Unlike Rust, Nix has almost no native tools for neatly packaging or isolating its code. Building an atom frontend for Nix means crafting core pieces from scratch to make it work.

Here’s the rub: pairing the atom’s storage format with Nix’s current idioms reveals a glaring issue—Nix’s total lack of enforceable code boundaries. If you tried bundling raw nixpkgs code into atoms as-is, you’d get a mess. It’d be near impossible to untangle, let alone fix.

Why? Nix code can reference anything, anywhere in a repository—or even outside it in impure setups. If we naively carve out subdirectories to isolate as atoms, we’d end up with a tangle of broken references and unusable code. It’s a challenge, but also a chance to tame some of Nix’s wilder complexities. Done right, we could craft an API for Nix that’s leagues better than the patchwork mess of flakes, _et al_. Let’s start with the Atom Nix library, the heart of this frontend.

### Actual Encapsulation: What a Concept 🤯

[Atom Nix](https://github.com/ekala-project/atom/tree/master/atom-nix) is, at its core, a lean Nix library with a clean API for injecting values into a pure Nix evaluation in a type-safe way. That purity piece deserves its own deep dive, so we’ll save it for later and focus on the library’s heart: actual encapsulation.

The meat of Atom Nix lives in a [single function](https://github.com/ekala-project/atom/blob/affbdc7be5ca615c27a54cd19e5e080de2cbb153/atom-nix/core/compose.nix) that delivers what Nix folks toss around loosely: a “module system.” But let’s be real—Nix’s so-called “module system” is a far cry from what that term means in any other language. As I’ve [ranted before](../nix-to-eos.md#unbounded-hell-reducing-complexity-in-order-to-ascend), the NixOS module system falls flat on delivering the containment and consistency you’d expect. Our `compose` function fixes that, offering true module boundaries with zero bloat, spitting in the face of Nix’s sprawling complexity.

If you’re steeped in Nix’s quirks, you might be clutching your pearls, brainwashed by years of overengineered anti-patterns. No shame—Stockholm syndrome’s real. Newcomers, you’ve got the edge, unburdened by Nix’s baggage. To my friends who love those idioms: I get it. When you’re dying of thirst, even rancid water looks tempting. But Atom Nix isn’t here to coddle complexity—it’s the antidote, ruthlessly focused on delivering real boundaries and isolation, like any decent module system should. Fear not, though—beyond that, it stays out of your way, letting you revel in as much complexity as you like.

How’s it done? Simple in principle: stop letting Nix reference code willy-nilly. Instead, enforce strict rules on how modules access other code. The secret sauce? A little-known, often-slammed Nix feature: `builtins.scopedImport`. I’ll nod to the haters—careless use of `scopedImport` is a nightmare, making code untraceable. But we use it internally, and here’s the kicker: we rig it so it’s [literally impossible](https://github.com/ekala-project/atom/blob/affbdc7be5ca615c27a54cd19e5e080de2cbb153/atom-nix/core/compose.nix#L113) to call from an Atom Nix module. Take that, chaos.

Here’s how it works. `scopedImport` lets us import a Nix file with a custom context injected. We leverage that, plus its ability to override Nix’s default prelude, to make rogue calls to `import` or `scopedImport` trigger hard evaluation errors. That means modules can _only_ reference code from our controlled global context. Nix veterans hooked on its prototypical style—functions churning out results—might squirm. But ditching prototypes for an implicit global context, where modules are defined in their final form, is a game-changer.

Why? For one, it makes code introspectable. Prototypes hide their guts until evaluated—function, set, list? Who knows without running it, maybe at a steep cost. With Atom Nix, you see what you get upfront. Plus, rigid boundaries unlock tooling superpowers. A language server could pinpoint code locations and types—yours or upstream atoms—without touching a Nix evaluator. Good luck doing that with Nix’s free-for-all status quo.

### Atomic Scopes

Though Atom Nix is pre-stable and its scope may evolve, the [current pieces](https://github.com/ekala-project/atom/tree/master/atom-nix#a-modules-scope) are likely here to stay. Every Atom module’s evaluation context includes a top-level `atom` reference, exposing your atom’s public API. The `mod` scope offers a recursive reference to the current module, including private members.

And yes, Atom modules feature public and private members—because this is, again, a real module system. Access rules mirror Rust: child modules can tap their parent’s private members via the `pre` scope, which links to the parent module (and its `pre.pre` for the grandparent, and so on). Public members are declared with a capitalized first letter but accessed externally in lowercase to nod to Nix idioms. We might ditch this convention and fully break from Nix’s norms—stay tuned.

External dependencies split into two scopes. The `from` scope holds evaluation-time (Nix code) dependencies listed in the manifest. The `get` scope, kept separate, covers build-time dependencies (like source trees), fetched only during the build phase to avoid blocking evaluation. Unlike flakes, which carelessly fetch everything at eval time—needed or not—Atom Nix enforces this split to keep things sane.

Lastly, the `std` scope holds a built-in standard library of functions, itself an atom, always available in any context—no need to haul in heavy dependencies like nixpkgs just for basic utilities.

```nix
# A concise example of a module nested a few levels deep in an atom
let
  inherit (from) pkgs;
in
{
  PublicFunc = std.fix (x: { inherit x; });
  privateFunc = x: x + 2;
  Six = mod.privateFunc 4;
  accessParent = pre.pre.privateValue + atom.path.to.this.module.Six;
  Package = pkgs.stdenv.mkDerivation {
    inherit (get.package) src;
    # ...
  };
}
```

### Lazy Purity

Atom Nix salutes the purity goals flakes introduced years ago, but let’s be real: Nix’s approach is absurdly heavy-handed when the language’s core features already hand us nearly everything we need on a silver platter.

Take the [PR](https://determinate.systems/posts/changelog-determinate-nix-352) to make flakes fetch inputs lazily. Three years to slap a VFS layer onto the evaluation context? Cool. Atom Nix does it right now though, leaning on Nix’s built-in laziness. 🤯

Flakes also love copying everything—pre-lazy trees VFS, at least—straight into the `/nix/store` like eager beavers. Kudos to the upstream fix (coming… someday), but it’s wild that nobody paused to say, “Uh, guys, this language is _already_ lazy.” Atom Nix imports expressions into the store for isolation and boundary enforcement, sure, but we do it with the [inherent laziness](https://github.com/ekala-project/atom/blob/affbdc7be5ca615c27a54cd19e5e080de2cbb153/atom-nix/core/compose.nix#L158) of Nix. No bloat, no wait... Try to hold on. 🤯

Each module and expression lands in the store only when accessed, blocking sneaky filesystem references. But sometimes, Nix packaging or config legit needs a local file. Atom Nix has a clean API for that. Relative paths (`./.`)? Hard no—they fail, since each lazily imported Nix file’s working directory is the `/nix/store` root. Want a file like `my-config.toml` in your module for a NixOS service? Just use string interpolation: `"${mod}/my-config.toml"`. It’s lazily imported, disciplined, and keeps your scope tight.

This setup ensures we only touch files in our own module, never rummaging through parents’ or children’s directories. Filtering out parents and children makes lazy store copying dirt cheap—we copy only the current module’s files, lazily, skipping duplicates. No redundant store bloat here.

Now, runtime purity. Nix, outside flakes’ pure eval or a `nix.conf` toggle, can’t fully lock down impurities like absolute path access using just language tricks. We could cave, enable pure eval, and drown in the copying and complexity we’ve dodged. Or—hear me out—we sandbox the evaluation runtime like Nix does for builds. What?! 🤯

We start by [disabling](https://github.com/ekala-project/atom/blob/affbdc7be5ca615c27a54cd19e5e080de2cbb153/atom-nix/core/compose.nix#L115-L116) impure builtins with our `scopedImport` tactic, the same one that bans random imports. For absolute paths, early tests with a cross-platform [sandbox library](https://github.com/ekala-project/eka/blob/master/crates/nixec/src/main.rs) look promising. The `eka` CLI or other tools can easily tap this, ensuring the eval runtime sandbox sees _nothing_ but the atom itself. No disk, no nonsense.

And there it is: flake-level purity, no VFS, no three-year wait. Using only the features we already have, and the isolation principles Nix is literally built on 🤯💥🤯

### Atomic Files

Got any brains left? 😏

I’ll cop to it: the last segment was dripping with sarcasm. I’ve [ranted before](../12-years#the-forgotten-utility-of-ridicule) about how a well-aimed jab can vaccinate against half-baked ideas—all in good fun, of course. Now, let’s wrap up our tour of the Atom Nix module system with the dead-simple file structure of a Nix atom.

The rules are straightforward: a top-level module is marked by a `mod.nix` file, and any directory with its own `mod.nix` is a submodule. For consistency, there’s no skipping layers—each module must be a direct child of its parent in the filesystem.

As a bonus, any `*.nix` file in your module’s root (besides `mod.nix`) gets auto-imported as a member. This keeps long or complex Nix expressions tidy in their own files with zero boilerplate fuss.

```
# Example: structure of the WIP `std` atom
atom-nix/std
├── file
│   ├── mod.nix
│   └── parse.nix
├── fix.nix
├── list
│   ├── imap.nix
│   ├── mod.nix
│   └── sublist.nix
├── mod.nix
├── path
│   ├── make.nix
│   └── mod.nix
├── set
│   ├── filterMap.nix
│   ├── inject.nix
│   ├── merge.nix
│   ├── mergeUntil.nix
│   ├── mod.nix
│   └── when.nix
└── string
    ├── mod.nix
    └── toLowerCase.nix
```

```nix
# file/mod.nix
{
  # Re-export the auto-imported private member from `parse.nix` as public
  Parse = mod.parse;
}
```

Easy enough, right? Now let’s dive into the pulsing _core_ of an atom—the manifest format—a make-or-break piece for long-term success, as users will either wrestle or rejoice with it daily.

## Static Configuration: An Antidote to Complexity

We’re wrapping up this piece by digging into the manifest format and lock file—the heart of atom’s design. Most of what we’ve covered so far (barring the explicitly future stuff) is already implemented or proto-typed, but I’ve deliberately held off on the manifest for months. Why? To avoid painting myself into a corner like flakes did. I’ve [ranted before](../nix-to-eos#the-proper-level-of-abstraction) about keeping crucial metadata static for better separation of concerns and performance, but this is the deep dive you’ve been waiting for—so let’s go all in.

The manifest splits into three clear categories: **dependencies**, **configuration**, and **metadata**. Here are the high-level goals I’m chasing:

- **Totally static, human-editable format**: TOML, hands down.
- **Intuitive, exhaustive system handling**: No weird parsing or Nix code tricks—just a clear, upfront list of supported systems and cross-configurations.
- **Distinct dependency groups**: Eval-time vs. build-time dependencies should be crystal-clear, both for performance and sanity.
- **Exhaustive package variations**: Static vs. dynamic linking, musl vs. glibc, etc., declared upfront to keep Nix code lean and mean.
- **Type-checked configuration**: After minimal frontend processing, the config gets injected into Nix, purity intact.

Hitting these goals unlocks a ton of goodness:

- Static queries for package variations, systems, and defaults.
- Static schema validation for Nix inputs.
- Static access to metadata without spinning up Nix.
- Static build matrices for CI and caching.

See the theme? We want an _exhaustive_ high-level view of our package—systems, variants, metadata—without touching Nix evaluation. Clients can serve up package info fast, even without a local Nix install. Users get quicker feedback, fewer “why is this so slow?” moments, and a cleaner experience. It’s a smarter way to tame the chaos of package permutations in nixpkgs—like `pkgsCross` or `pkgsStatic`—which are neither obvious nor newbie-friendly. Plus, it beats the shotgun approach of generating every possible variant, whether it works or not. Let’s track what _actually_ builds and make it dead simple for users and CI to grok.

The payoff? Less Nix code complexity, a snappier user-facing API, and smarter build scheduling. Who knew [searching the problem space](../closed-openness/#practical-resistance-the-ekala-way) before charging in could work so well?

I’m hammering out an [Ekala Enhancement Proposal](https://github.com/ekala-project/eeps) (EEP) to lock in a release candidate—check the rough draft at [ekala-project/atom#51](https://github.com/ekala-project/atom/issues/51). For completeness's sake, let's just take a quick peek at the TOML and lock format in the next segment.

### Atomic Manifest: A Sketch

Let’s riff off the draft in [ekala-project/atom#51](https://github.com/ekala-project/atom/issues/51). This will, therefore, be the latest snapshot until the Ekala Enhancement Proposal is finalized. This is the manifest’s current vibe, and it’s shaping up to be the user-friendly core of atom.

```toml
# Package identity and metadata
[atom]
id = "mine"
version = "0.1.0"
# Type determines the configuration schema
type = "nix:package"  # Or nix:config, nix:deployment, etc.

[atom.meta]
# Similar to pkg.meta in current Nix packages
description = "A cool package doing cool things"
license = "MIT"
maintainers = ["alice <aliceiscool@duh.io>", "bob <bobsalright@fine.com>"]

## Dependencies: eval-time (Nix code) and build-time (sources, tools)

### Eval-time Atom dependencies
[deps.atom]  # Available at `from.atom`
url = "https://github.com/ekala-project/atom"
version = "^1"

[deps.my-lib]  # e.g., eka add work:mono@^2
url = "https://github.com/org/mono"
version = "^2"

[deps.local]  # Local atom in the same repo
path = "../../path/to/other/atom" # locked in lock file

### Eval-time legacy Nix libraries
[pins.pkgs]  # Available at `from.pkgs`
git = "https://github.com/NixOS/nixpkgs"
ref = "nixos-25.05"
# Expression to import, since we can’t do it ourselves
entry = "pkgs/top-level/impure.nix"

## Build-time sources: tarballs, git repos, subatomics, lock files

### Tarball source
[srcs.src]  # Available at `get.src`
url = "https://example.com/v${major}/${version}/pkg.src.tar.xz"
# Version for URL string interpolation
version = "${atom.version}"

### Git source
[srcs.repo]
git = "https://github.com/owner/repo"
ref = "v1"

### Subatomic reference
[srcs.pkg]  # Locked as git tree-id in lock file
path = "../../my/source/tree"
# No URL; assumed to be in the same repo

### Lock file for builders
[srcs.cargo]  # For builder libs or plugins
path = "../Cargo.lock"

## Build configuration: platforms, variants, and distribution formats

### Supported/tested/cached cross-compilation matrix
[platform]
# BUILD:HOST:TARGET, with shell-style expansion (< = previous value)
supported = [
  "riscv64-linux",
  "x86_64-linux:{<,aarch64-linux}",
  "{aarch64-darwin,x86_64-darwin}:{<,aarch64-linux,x86_64-linux}"
]

### Abstract packages for variants
[provide]  # e.g., eka do --cc=clang --host=aarch64-linux <uri>
ld = ["binutils", "mold"]  # From deps, default: first
cc = ["gcc", "clang"]
libc = ["glibc", "musl"]

### Dependency-free build variations
[support]
# Flags injected into build command if requested; off by default
my-feature-flag = ["MY_FEATURE=1"]
# Boolean toggle, overridable by client
static = false

### Distribution formats, e.g., `eka get --oci` for OCI container
[dist]
formats = ["deb", "oci"]
```

The lock file’s a snooze compared to the manifest—just a list of hashes to lock in reproducibility. Its schema’s still in flux, so we’ll skip the details for now, but here’s the key bit: local path dependencies (like `[deps.local]` or `[srcs.pkg]`) get pinned in the lock file with both their git tree IDs and reproducible “atomic” commit hashes for sanity. Before publishing, the `publish` logic double-checks the lock’s accuracy—messed up? It bails.

The `[provide]` and `[support]` keys both define build configurations, but here’s the difference: `[provide]` expects extra dependencies from `nix:package`-type atoms (e.g., picking `clang` or `gcc`), while `[support]` handles dependency-free tweaks like flags or toggles (e.g., `static = true`). This keeps variants clear and Nix code lean.

Future backends, like the proposed Eos API, will cryptographically track built variant combinations to skip redundant builds and turbocharge caching—as we alluded to earlier.

With that, we’ve unpacked every major piece of the atom format in gritty detail. The brave can dive into the [code](https://github.com/ekala-project/atom) or contribute, but for now, let’s wrap it all up.

## Forging the Future: A Call to Rethink Nix

Wow, props to you for slogging through this beast of a piece, dense with technical grit. I wouldn’t blame you if it took a few sittings to digest—I’ve spent a year wrestling words to explain it half-decently. Atom’s design tackles Nix’s scaling woes head-on: a Git store for lightweight versioning, URIs for snappy user access, lazy purity to ditch flakes’ bloat, module boundaries to tame code chaos, and a static manifest to make daily use a breeze. Let’s revisit our core motivation with this full picture in hand.

The atom format is bold, aiming to be a long-term packaging API and a rock-solid replacement for Nix idioms buckling under scale. But is it worth it? I’m no zealot—I’ll admit defeat if it’s time. Yet, from my years in the Nix trenches, I’m convinced it’s a thundering _yes_. Skeptics might cling to flakes’ familiarity, but atom’s rigor, built on 20 years of Nix lessons, offers stability, not chaos. We could keep patching flakes’ half-baked API or stretch nixpkgs’ creaky architecture until it snaps. Or we can honor the grind that got us here and see this as a new beginning.

Many Nix abstractions will stick around, atom or no atom—I’m sure of it. But their shape could shift dramatically. I respect the magic that’s carried Nix for 20 years, but we’ve mostly been tweaking old idioms. With two decades of global-scale lessons, we’ve got the perspective to ask, “What’s next?” Imagine a Nix ecosystem where builds are fast, configs are intuitive, and scale’s no issue—Atom just might be the spark to get us there.

Look, if you’ve read this far, you clearly care about Nix and its innovation. You've also seen that I’ve got strong opinions—my [ramblings](../closed-openness) prove it—but they've been forged iteratively, over a long timespan, from questioning my own assumptions and ditching what doesn’t work. Atom’s not my pet project; it’s a community effort, and your ideas will shape its path. So, join us on [Discord](https://discord.gg/DgC9Snxmg7) and share your take. Be brutally honest or wildly supportive—just bring your real thoughts. Whatever comes next, thanks for diving deep into my ideas. Catch you soon! And...

Viva [_Rebellion_](../code-of-rebellion)!
