+++
title = "Nix Is Right. Its Cost Is Not."
description = "The case for composition-addressed systems."
date = 2026-07-04
tags = ["nix", "atom", "eos", "systems", "architecture"]
+++

## A Confession

I have spent over a decade inside the Nix model. I have advocated for it,
built on it, and defended it in rooms where it was not popular. The work
I've published on atoms[^atom-reforged] exists because I believe the core
of that model is one of the genuinely important ideas in software.

So understand that what follows is not a drive-by. It's aimed at my own
house.

Here it is: **Nix is right about everything except the thing everyone
thinks defines it.** The store, `/nix/store/<hash>-name`, the signature
move, the thing in the first paragraph of every Nix pitch, is not the
insight. It's the *cost*. And the cost is so much higher than it needs to
be that it has functionally capped the model's reach for twenty years.

This post makes three claims:

1. The store path is five different mechanisms wearing one trench coat,
   and the overload is where all the pain comes from.
2. One of those five, embedding hashes inside artifacts, makes the one
   thing Nix has wanted for a decade, true content addressing,
   *impossible*. Not hard. Impossible.
3. You can keep every guarantee that matters, drop the store entirely,
   build upstream software with **upstream's own unmodified build
   process**,[^patching] and nearly every piece required already exists
   in production today.

If those claims hold, the conclusion writes itself: there is a system
strictly simpler and more capable than Nix sitting in plain sight,
waiting for someone to assemble it. Let me take each in turn.

## Five Jobs, One Trench Coat

What does `/nix/store/x7q2…-openssl-3.0.12` actually *do*? Pull it apart
and you find five distinct jobs:

| # | Job | What it means |
| :-- | :-- | :-- |
| 1 | **Storage key** | Where the bytes live on disk |
| 2 | **Build-time binding** | The compiler finds dependencies at these exact paths |
| 3 | **Runtime binding** | RPATHs and shebangs embed these exact paths into binaries, forever |
| 4 | **Closure discovery** | Nix finds runtime deps by *grepping your build output for hash strings* |
| 5 | **Co-installation** | Unique prefixes never collide, so twenty glibcs coexist |

Five jobs, one string. Rich Hickey has a word for this: *complected*.[^hickey]
Braided together such that you cannot touch one strand without pulling
the other four.

Job #3 is the expensive one, and you can watch it happen. Pick any binary
in the store and ask what it links against:

```
$ patchelf --print-rpath $(command -v openssl)
/nix/store/x7q2…-openssl-3.0.12/lib:/nix/store/1a4…-glibc-2.39/lib
```

Those are not search hints. They are absolute paths, burned into the
binary at build time. The binary does not depend on *openssl*; it depends
on openssl living at exactly `/nix/store/x7q2…`. Change one byte of glibc
and its hash changes, so its path changes, so every rpath pointing at it
is now wrong, so everything downstream rebuilds. Not because any behavior
changed, but because a string embedded in a binary did.

This is also why Nix must wage a permanent war against upstream build
systems: patchelf, wrapper scripts, `cc-wrapper`, a stdenv of heroic and
unknowable complexity, thousands of patches whose only purpose is to
coerce software into linking against paths no upstream developer has ever
heard of. nixpkgs is a magnificent engineering artifact, but a huge
fraction of it exists to fight the store, not to package software.

And yes, job #4 is really how it works. The runtime closure of your
artifact, the complete set of things it needs at run time, is computed
by scanning its bytes for things that look like store hashes.[^refscan]
It is over-approximate (any textual mention counts), it is
under-approximate (compress or encode a reference and it vanishes), and
it is the load-bearing mechanism underneath every Nix deployment on
earth. We'll come back to this.

## The Impossibility Result

Now the finding that reframed everything for me.

Nix has wanted *content addressing*, naming artifacts by what they
**are** instead of by the recipe that made them, for over a decade.
Eelco's thesis calls it the intensional model,[^intensional] and it's
been the grail ever since: cache hits when different recipes produce
identical outputs, early cutoff on rebuild cascades, trustless binary
sharing. RFC 62 was proposed in 2019.[^rfc62] It is 2026, and
`ca-derivations` is still experimental, still being wrestled with by some
of the best engineers in the ecosystem.

It is not a staffing problem. **It's a math problem.**

A cryptographic hash has no accessible fixed point. An artifact cannot
contain its own hash: to know the name you must first fix the bytes, but
the bytes want to contain the name. And an artifact that embeds *pointers
to other artifacts' hashes* cannot be named until every pointer is
resolved, which means self-references and reference cycles must be
detected, normalized, and rewritten, which changes the bytes, which
changes the hash, which breaks the signatures. This is why the RFC 62
work drowns in "hash rewriting" and "self-reference normalization"
machinery.[^intensional]

Read that again with the five jobs in mind. **Job #3, embedding hashes
in artifacts, is precisely the thing that makes content addressing
unreachable by any clean path.** `ca-derivations` doesn't disprove that;
it demonstrates it. What its machinery addresses is not your artifact
but a normalized shadow of it, self-references stripped out for hashing
and stamped back in afterward. That is a coherent naming scheme, but it
names the shadow, not the bytes you run, and half a decade of
experimental status is the running price of the substitution. Nix's
most famous mechanism and Nix's most wanted feature are mutually
exclusive. No amount of engineering fixes a contradiction. It has to
be dissolved.

Now run the logic in reverse. An artifact that embeds only *names*,
`libssl.so.3`, the way upstream already writes software, has a stable
hash the moment the build finishes. Nothing to rewrite. Nothing to
normalize. The pointer information doesn't vanish; it moves into a
separate object that maps names to hashes. The obstruction doesn't get
solved. It *evaporates*.

And this is a choice Nix made, not a law it obeys. Its own
content-addressing effort accepts the obstruction and fights it. Spack,
input-addressed like Nix, never meets the fixed point at all, because
the install-tree root never enters package identity. But it still
embeds prefixes in its binaries, and it pays for that whenever a
binary cache moves them: padded placeholder prefixes, RPATH rewriting.
It escapes the naming trap but not the patching war.[^spack] The weld
is not one thing: identity-to-location, and location-into-artifact,
are separate choices, and each is optional.

## What Nix Actually Got Right

If the store isn't the point, what is? Strip away the store, the
language, even the derivation format, and the irreducible core of Nix
is this:

> **Purely functional composition into a cryptographically verified
> closure.**

A build is a pure function. Its inputs are named by hash, completely and
exhaustively; the Nix model, Guix included, is the only *exhaustive*
dependency manager there is. (Spack comes close but will happily bless
a host compiler it never built; nothing outside a Nix closure exists
at all.) Its output is therefore trustworthy in a way no
`apt install` can ever be. The sandbox enforces the purity; the hashes
make the closure unforgeable; composition of verified pieces yields a
verified whole.

The same invariant, read operationally, gives the name the rest of
this argument leans on: **hermetic, transactional composition**, HTC
from here on. *Hermetic*: the build sees nothing but its declared
closure, and the kernel enforces it. *Transactional*: a closure is a
value, so change is never mutation; you produce a new verified whole
and switch to it atomically, the old root intact beside the new, which
is everything people actually mean when they praise Nix's upgrades and
rollbacks. *Composition*: the whole is assembled from verified parts,
and the assembly is itself the object. Every Nix pitch you have ever
heard, reproducibility, rollback, the end of dependency hell, is one
of these three properties wearing a store-shaped costume.

*That* is the treasure, under either name. And notice: nothing in any
of it mentions `/nix/store`. The hermeticity was always the sandbox's doing,
deny-by-default, only declared inputs visible. The store path contributed
*binding*, not isolation. Which raises the question I kept circling: what
if the sandbox showed the build a plain, boring, Filesystem Hierarchy
Standard (FHS) world, the `/usr/lib`, `/usr/include` layout every
upstream build system has expected since the dawn of Unix, but
*synthesized that world, file by file, from content-addressed
inputs?*[^fhsenv]

The guarantee is identical: the build can only read what the closure
declares, and the kernel enforces it. But now `./configure && make` just
works. No patchelf, no wrappers, no stdenv. And nothing to scan or
rewrite afterward, because the binary embeds only the name `libssl.so.3`,
resolved by the mount the same way it resolves on any other Linux system.
The absolute path never enters the artifact, so it never has to be found
and patched back out.

This is not hypothetical. OSTree ships a content-addressed object store
today whose deployed files sit at ordinary FHS paths, and it never
rewrites an rpath, because nothing it builds embeds a store hash to begin
with.[^ostree] The scan-and-rewrite problem was never a property of
content addressing. It was a property of putting the hash inside the
artifact.

And the network, the other hole hermeticity has to close? Discipline
first, fallback second. The discipline is version resolution:
dependencies are declared, resolved over real version ranges, and
locked into the closure before the build starts, a notion Nix does not
have at all. Native tooling already handles its own layer, a cargo
lock fully pins a crate's Rust dependencies, but it stops at the
language border: the C libraries underneath are somebody else's
problem, and here they are declared and resolved in the same generic
format as everything else. The recording proxy is the last-stage
fallback, for the ad hoc residue neither resolution nor native tooling
captures, because projects love to improvise: it content-addresses
everything such a build fetches on first run, and forever after the
"network" is a replay of pinned bytes, anything off-script failing
closed. (The first run is trust-on-first-use; so is the human
transcribing a fixed-output hash into a Nix expression.)

Determinism? It was never the store path's doing. Build identity here is
input-addressed, keyed on the declared closure and toolchain exactly as a
Nix derivation is keyed on its inputs, so you get one cached, signed
result per build intent whether or not upstream's build is bit-for-bit
reproducible. Reproducibility is the sandbox's job, and the residual
nondeterminism upstream ships is the same orthogonal problem Nix already
faces.[^determinism]

## Three Primitives

Decomplect the trench coat and you get three primitives, each with a
single job:

1. **A content-addressed store of files and trees** (a *real* Merkle
   tree, not an opaque tarball), where bytes live. Solved several times
   over in production: git, OSTree, Bazel's remote-execution CAS,
   Fuchsia's blobfs.[^cas]

2. **The composition**, a small, signed, content-addressed manifest
   mapping conventional names to content hashes: `/usr/lib/libssl.so.3 →
   blake3:9f2c…`. This object *is* the closure, at any scale. It's what
   the build sandbox materializes, what the runtime mounts, what gets
   signed and shipped and diffed. It binds at whatever granularity you
   need, a single file or a whole tree, so an environment is usually a
   few dozen human-readable lines pinning package trees to FHS prefixes:
   something you read and diff, not an opaque image. When I said the
   pointer information "moves into a separate object," this is that
   object.

3. **An executor** that materializes a composition cheaply and runs a
   process inside it. On Linux today: mount namespaces and
   composefs,[^composefs] one metadata image plus one content-addressed
   object directory, mounted as a *single* overlay, kernel-verified with
   fs-verity. If you ever tried to map store paths onto container layers
   and hit the overlayfs wall, know that this is O(1) layers no matter
   how many packages compose, and the kernel refuses tampered content at
   read time. That last part is a guarantee Nix does not give you: Nix
   verifies signatures when it downloads a path, and again on demand if
   you run `nix store verify`, but nothing re-checks the bytes on the way
   to execution.[^nixverify] Tamper with a store file after the fact and
   it runs.

Storage, binding, execution: three clean jobs. The store path did the
first two and left execution to the OS, then bolted two hacks onto the
same string, closure discovery and co-installation. Pulled apart, each
piece is boring, and boring is exactly what you want underneath a trust
system.

That leaves jobs #4 and #5 from the trench coat. Co-installation (#5)
falls out for free: conflicts can only exist *within* one composition,
where they're real ABI questions, not filesystem accidents. What Nix
bought with divergent rpaths doesn't vanish; it moves *between*
compositions: an application that truly needs its own libssl becomes
its own composition, mounted for it alone, and within one, a name
collision is exactly the compatibility question someone should have
been made to answer. And because
every composition draws its files from the one content-addressed store,
sharing is the rule, not the exception: two applications that pin the same
openssl point at the same verified blob on disk, where a per-app container
would ship its own opaque copy. Co-installation without the container
tax.

Closure discovery (#4), the hash-grep, is the one real debt. Its
replacement has existed in production for decades. RPM and Debian extract
dependencies *structurally*, reading the actual `DT_NEEDED` entries, the
actual undefined symbol tables, the actual soname records, rather than
grepping for magic strings.[^structdeps] We take that lineage and upgrade
it: hash the extracted interface itself, and let the observed read set
(more on that shortly) catch the dynamic loading that static structure
misses. Which unlocks something Nix cannot do at any price: patching a
dependency without touching its dependents.

## Lego, Not Marble

Look at how each tool names a dependency. A Docker image pins the whole
filesystem: one opaque blob, take it or leave it. A Debian package pins a
version range, "libssl3, version ≥ 3.0," and trust the maintainer. A Nix
derivation pins exact bytes, built against *this* glibc, down to the
commit. Three granularities, all of them wrong. One so coarse that
sharing is an accident of layer ordering, one too loose to verify
anything, one so tight that a single byte rebuilds the world. Each
misses the thing a binary actually depends on, which is none of the
above: an *interface*. These symbols, these
versions, this ABI surface.

In the model I'm describing, every built artifact gets an **interface
manifest**, mechanically extracted: what it *provides* (soname, exported
symbols, hashed into an interface digest) and what it *requires* (needed
symbols, per dependency name). The property everything turns on: the
manifest is **binding-free**. It names *no other artifact*. It's a
pure fact about one tree of bytes.

Bindings live only in compositions. So when a security patch lands for
OpenSSL: build the new one, check that its provided interface still covers
what every consumer needs, a set-inclusion check that emits a storable
proof, then swap the pointer in the composition, recompute the root, and
re-sign. **Nothing rebuilds.**[^static] The new root hash is exactly as
unambiguous, exactly as verifiable, exactly as *sure* as a Nix
world-rebuild, without paying the cascading rebuild cost that
hash-tattooed binaries force. This is strict by default: an entry is an
exact digest pin, and the guarantee is precisely Nix's. Accepting a
substitute because its interface covers the need, rather than because
its bytes match, is a deliberate opt-in, per composition, with the proof
recorded.[^abi]

If you know Nix or Guix, you're already objecting: we have this, it's
called grafting. Guix can patch a vulnerable OpenSSL into thousands of
dependents without rebuilding them, and nixpkgs has `replaceDependencies`
to match.[^grafts] But look at *how*. Grafting walks every dependent and
rewrites the old store hash to the new one in place, byte for byte, which
only works if the replacement path is exactly the same length. Nixpkgs'
own source admits the rewrite can "cause breakage" and "should be a
short term solution"; one well-known community write-up is blunter:
"somewhat evil/potentially unsound."[^evil]
That's not the Lego swap. That's the marble, re-carved in place with a
chisel, hoping the new name has the same number of letters as the old
one. Grafting has to exist because the store fused identity, location,
and dependency edge into one string, so "patch one library" *must* mean
"rewrite that string everywhere it was stamped." Remove the fusion and
the chisel goes with it. The composition swaps a pointer, and nothing
downstream is touched, because nothing downstream ever named the path.

Environments stop being marble, carved once and shattered on every
change. They become Lego. You keep the property Nix actually promised
you, an environment whose root hash cannot change unless something inside
it changes, and you stop paying for it in rebuilds.

And for interpreted ecosystems ("Python has no stable ABI," you say),
the same algebra holds with different extractors.[^pyabi] Wheels ship
exact file manifests (`RECORD`), imports are statically parseable, and
dynamic behavior is caught by observation, because builds read their
inputs through the executor's other face: not the composefs mount that
deployment gets, but a logging filesystem daemon serving the same
objects. Every file a build or test actually touches is logged, for
free. Declared closure
enforced by the sandbox; observed closure measured by the daemon; the
delta is a list of pruning candidates exactly as good as the coverage
that produced it. Nix cannot tell you which of its closure
entries are actually used. This system knows.

## Every Environment Is a Composition

Notice what the composition doesn't care about: scale. A package is a
composition over one project's files. A dev shell is a composition over a
toolchain. A home directory, a whole operating system, each is just a
full root over some larger file set, signed and content-addressed the
same way. Every package is already an environment, and most environments
are a package with the walls pushed out.

This is the part NixOS users should care about most, because it's the
part Nix makes hardest. Reproducible dev, home, and system configuration
is built today by stacking a second layer on the store: the module
system, a meta-layer that reimplements "environment" in pure Nix and
carries much of nixpkgs' maintenance weight on its back.[^module-system]
Here there is no meta-layer welded to the build. The environment is the
primitive. You keep exactly what you wanted from Nix, a stateless
cryptographic description of a package and of a whole system, and you
assemble both from upstream's own artifacts instead of nixpkgs' patched
re-creations of them. That isn't a bonus so much as the only way a
system like this stays maintainable.

You might think that deletes the thing people actually love the module
system for: composing configuration, merging options, layering defaults,
overriding per host. It doesn't. Look at what configuration composition
actually is. It is pure functions over data, producing a composition.
Nothing in it touches how a package builds or how an environment is
verified, and it never did; the module system only welded the two
together so they looked inseparable. Pulled apart, configuration
combination is an ordinary data-transformation problem with no
privileged tie to Nix, and it belongs in a language built for it
(Nickel, say), with real types and first-class merge semantics.[^nickel]
Which dissolves the last reason to keep the Nix language at all: the
thing you would have kept it for was never part of the substrate.

This is also where the name comes from. A composition is a Merkle object,
a signed tree of name-to-digest bindings under one root hash. Content
addressing names a blob by the hash of its content; composition
addressing names an environment by the hash of its composition, its root.
And an environment is just a composition of packages, so the thing the
root commits to, the thing you address, is the composition. That is the
name, and it says exactly what it is: content addressing, one level up,
from blobs to whole environments. And like content addressing, it names
a family, the *what*, not any particular system. HTC is the *how*: the
discipline this stack practices to earn the name.

## A Commit, Not a Blob

The composition has a second dimension the last section left implicit:
time. A composition is close enough to a git tree that the
correspondence deserves running to the end: if an environment's state
is a tree, a *change* of environment is a commit, a signed transaction
from one root to the next, and a system's history is a Merkle DAG of
those transactions. Nix gestures at this with profile generations, a
numbered symlink per state; here the transition is a first-class
object: what changed, from what, signed by whom. The OpenSSL swap two
sections ago was one of these, a transaction appended to history. This
is HTC's transactional leg made concrete: an update exists completely
or not at all, rollback is a pointer move, and "what changed" is a
tree diff you compute rather than a changelog you trust.

The atomic unit of the model is the single coherent composition: one
tree, every name bound exactly once, conflicts surfaced and resolved
at compose time. You can still stack: overlay a quick patch
composition on top of your declared one to chase a bug, or to hotfix a
library at three in the morning, and the executor will happily mount
the pile. But the stack is scaffolding,
working-tree state, and the transaction model never records it. To
*commit* the fix is to merge it down: run the merge, let any name or
interface conflict surface as the real question it is, and emit one new
tree, one root, one transaction. Git users will recognize the shape
because it is the same shape: the dirty working tree is where you live,
a commit is one coherent tree, and nothing in between is history.

Now hold that next to what the container world calls a layer. An OCI
layer is a tarball of filesystem changes, applied in order, with
deletions encoded as whiteout files; when two layers touch the same
path, the later one silently wins.[^oci] The image is whatever the
stack happens to overlay to. Coherence is the operator's hope, not the
format's contract. And yet the *workflow* is right, base plus patches
is exactly how people want to work, and the industry's entire delivery
machinery is built around shipping it. The unit is what's wrong. Here
the layer keeps the workflow and acquires a meaning: a layer is a
composition, conflict-checked, signed, diffable to the file, and a
committed image is by construction one coherent tree rather than a pile
of diffs in a trench coat of its own.

OSTree, which appeared earlier as an existence proof, deserves a second
word, because it aimed squarely at this, "git for operating system
binaries" is its own tagline, and landed half of it.[^bootc] The half
it landed is real: content-addressed objects, whole-tree commits,
atomic deploys. But its trees arrive from outside the model, assembled
by rpm-ostree or by a container build, so the composition step, the
part that says what is in the tree and why it coheres, is invisible to
it. And as its ecosystem converges on shipping commits inside OCI
images, the working unit degrades back into the opaque blob.
Transactional without hermetic composition: half of HTC. Nix has both
halves; it pays the store for them.

Which brings the argument to its widest frame. There are three worlds
today, plain FHS distributions, OCI, and Nix, and they do not compose:
committing to one means forfeiting the others' virtues. This model is
native in all three at once. The world a build or a process sees is
plain FHS, boring on purpose. The artifact ships and mounts with the
container ecosystem's own machinery, and composefs is that ecosystem's
own next move, not our imposition.[^composefs-oci] And the object
underneath carries a formal closure equivalent in nature and intent to
a Nix derivation's, at a fraction of the maintenance and storage cost.
Nix's answer to the status quo has always been secession: a parallel
world with its own paths, its own language, its own everything. The
properties never required the secession. Extracted as HTC, they stop
being a country you emigrate to and become the bridge between the
worlds everyone already lives in.

## I Deleted the Derivation Without Noticing

This whole model needs one thing at its root that nothing in the
container world, the Bazel world, or the distro world provides: an
**unforgeable, signed, content-addressed statement of build intent**.
What sources, what dependencies, what claim of ownership, what chain of
custody. The derivation is Nix's version of it, unsigned and
store-coupled, but the right *kind* of object.

I've spent the past two years building exactly this object, and I did not
understand what I had. It's called an [atom](./atom-reforged): a signed
snapshot of sources plus manifest plus lock, with cryptographic
provenance chaining back to the origin repository. Claim, publish,
verify, all offline, no registry required.

It is source-first in the most literal sense: an atom is bound directly
to the git tree that is the source's own source of truth, the same exact
tree, not a re-description of it in another language. That is where its
equivalence to a Nix derivation comes from. What it adds is the discipline
raw source never had: clean separation from the build details, and
mandatory versioning. Every atom is versioned, and that is the part that
makes real dependency resolution, SAT over version ranges, possible at
all. Nix pins exact commits and calls it done; it has no version range to
resolve. Closing that gap was the first problem I set out to solve, years
before I understood where it led.

The lock file inside the atom resolves name-and-version-range
declarations down to pinned, signed content pointers. That is the *same
shape* as the composition, one layer up: version ranges contract to lock
pins the way interface requirements contract to composition pins. One
binding algebra, running at the source layer and the artifact layer both.

When I stripped every derived hash out of atom identity and keyed
everything on names bound to signed pointers,[^atom-reforged] I thought I
was tidying up atom. I wasn't. I had removed the last thing that made a
*derivation* necessary, and I didn't notice, because I was still thinking
in derivations. That is the trap in a single frame: the Nix model is
good enough that even the person taking it apart mistakes the
scaffolding for the structure. Atoms don't reimplement the derivation. They make it
redundant. I couldn't see it from inside the Nix way of thinking, the
same way of thinking that has the whole ecosystem digging, with enormous
skill, in the wrong direction.

And this part is not a whiteboard sketch. A proof of concept already
resolves and locks atoms end to end, with full SAT resolution over
isolated, versioned git objects, which is the one component the whole
design hangs on.[^eka] The milestone the earlier essays called upcoming
is proven; the properly abstracted implementation is what's being built
now.

## CA or Bust

There is one more constituency in this story: the reproducible-builds
project, a decade of unglamorous work, one embedded timestamp at a
time, toward builds any stranger can verify by rebuilding them bit for
bit.[^rb] Many there are Nix's natural allies; some of the sharpest
voices are pointedly unpersuaded, and their complaint is the
trust-shaped version of this piece's argument. Nix's pitch sounds like
reproducibility; what it delivers is input-determinism, and the
measured gap between the two is real: depending on the year, somewhere
between a tenth and a third of nixpkgs does not rebuild
bit-identically.[^rb] And when a build is not bit-for-bit, Nix's
fallback is a flat signature: one cache key, trusted wholesale, pasted
into a configuration file, with no per-artifact provenance, no
key-distribution scheme, and no gradation between "verified" and
"vouched for."[^nixtrust] Trustless binary sharing was the payoff
content addressing was supposed to buy, and content addressing is the
thing the store cannot reach. CA or bust, and bust is what ships.

Here the boundary between the two regimes stops being an aspiration
and becomes a field in the atom's metadata: two statements the system
can make about any blob, programmatically. One: *this output is
reproducible; expect exactly
this hash for this source and this configuration, from anyone, and
reject anything else.*[^ion-config] Two: *this output is not
reproducible; it is signed by this key, and the key's provenance
chains back to the origin repository.* Neither statement solves
nondeterminism. What they dissolve is the confusion between the
regimes: every byte in your closure sits under one or the other, the
strict regime is enforced wherever upstream's determinism has earned
it, and everywhere else you stand on the strongest fallback there is,
a key you chose, on a provenance chain you can walk.

And nobody has to run the registry. Atom is a decentralized protocol:
claim, publish, and verify all work offline, and a trust root is a
key, not an institution. Institutions can still cooperate: two that
trust each other publish a shared trust chain at the canonical source,
and if you want web-of-trust semantics without anyone's blessing, fork
the repo, add your key to the metadata, and point whoever trusts you
at your mirror, where tampering is trivially provable, because it is
git. Which turns
the reproducible-builds endgame, many independent parties converging
on one hash, from an entry fee into an additive attestation:
independent rebuilders countersigning the same content address, each
signature one more witness that the boundary sits exactly where the
metadata says it does.[^trustix]

## Eos, Properly Introduced

I've teased Eos as "the build engine" in prior posts and never given it
real treatment. A full exposition is coming,[^eos-docs] but this
argument needs its shape now, because the substrate reshapes it.

Eos is a build *scheduler*: it takes a DAG of pure build actions and
decides what runs, where, and when, locally embedded or across a fleet,
with caching at every level of the cryptographic chain (atom → version →
revision → plan → output), so work is skipped at the highest level
possible. Unusually for this genre of software, the scheduling discipline
came *before* the code: the dispatch model is grounded in the classical
scheduling literature, its fairness and starvation-freedom are
model-checked in TLA+, its performance bound mechanized in Lean, and the
whole thing validated in simulation against real-world build traces
before we committed to an implementation.[^eos-proofs] I'm allergic to
research-grade architecture shipping as production infrastructure (Nix
itself is the cautionary tale[^atom-reforged]), so this time the proofs
came first.

Under the original plan, Eos scheduled Nix *derivations*, which meant it
also needed an evaluation pipeline: run the Nix language to discover the
DAG, coordinate evaluators feeding builders, coalesce the phases. An
entire subsystem.

In this model, **the DAG is just the atoms**. The lock already
*is* the dependency graph, signed, resolved, sitting in a file. No
language to evaluate, no evaluator to schedule. Each node builds by
handing the atom's closure to the executor and letting *upstream's own
build system* do what it does, including its own internal parallelism,
which is the part upstream actually optimized. Eos schedules the graph;
`make -j` does the leaves. An entire layer of the architecture, the part
I was least looking forward to building, deleted by a better model. The
scheduling theory transfers untouched.

## The Snix Windfall

"Nearly every piece exists" was claim three, so let me be concrete about
the biggest one. [Snix](https://snix.dev), the community reimplementation
of Nix in Rust, made an architectural decision somewhere along the way
that I want to publicly applaud: they built their storage layer,
*castore*, as a **generic content-addressed blob and directory
store**.[^cas] Real Merkle trees. Not NARs, not store-path-aware,
deliberately and cleanly generic, with lazy on-demand materialization
over FUSE and virtiofs.

They may have built it to serve `/nix/store`, but what they actually
built is primitive #1 of this architecture, production-grade, sitting on
a shelf.

It goes further. Their build protocol describes a build as a set of
castore Merkle nodes (the inputs), mounted at a *configurable* location,
a command, an environment, and expected outputs. The store-path
assumptions are parameters, not axioms: the mount location and the store
composition are configurable, not baked in. And their sandbox runs builds
as rootless OCI containers with inputs lazily streamed from castore.
Point that machinery at an FHS layout instead of `/nix/store`, and
primitive #3 is most of the way built too. Even the observation channel
falls out, because the FUSE daemon serving the inputs is the single
unbypassable point every read already flows through.

castore also does content-defined chunking, deduplicating below the file
level. In Nix, that kind of work is damage control: every hash change
copies the world, hardlink dedup can't collapse the copies because the
tattooed paths make their bytes differ, and sub-file dedup is what
keeps the cache from exploding. Here it isn't load-bearing. The
composition model already keeps storage cheap, because swapping a
pointer copies nothing downstream. So castore's dedup stops being a
mitigation. Good engineering, finally allowed to be a bonus instead of
a patch. And that
Snix treated a generic blob store as urgent enough to build is itself a
tell: the storage cost of the current model is not a theoretical
objection; it's a load the system is already bending under.

I don't know if the Snix folks think of castore as the foundation of a
post-store world. But credit where due: they decomplected their storage
layer when they didn't strictly have to, and in doing so they may have
built the most important component of a system bigger than the one they
were reimplementing.

## The Honest Ledger

So what actually remains to be built? Fewer things than I have fingers:

- **The composer**, the composition object itself: format, merge rules,
  root computation, signing, and emission to composefs images. Small.
- **The interface analyzers**, the ELF extractor (a Rust reimplementation
  of what rpm and deb have done for decades, plus interface hashing) and
  the Python extractor. This is the genuinely novel code, and it's pure
  functions over bytes: analyzable, testable, cacheable by input hash.
- **The fetch proxy**, record and replay. Annoying (TLS), not hard.
- **The closure computer**, resolving requirements against providers to a
  minimal justified runtime set. Set operations over manifests.
- **The FHS delta** on the Snix executor, and the read-set logging in the
  FUSE layer. Small seams into existing code.

Every one of these has a production ancestor. None is research. The
identity, trust, and locking layer, the part that *doesn't* exist
anywhere else, the part everything hangs off, is atom. And atom is not a
proposal: it's specified, formally modeled, demonstrated in a working
proof of concept, and being built properly now.[^atom-reforged]

The other column of the ledger is the things this model *deletes*: the
Nix language (compositions are data, the only function is `build`;
configuration still deserves a typed merge language, but an
off-the-shelf one, owing nothing to the substrate). nixpkgs and the
module-system meta-layer stacked on it (upstream's build process *is* the
packaging; the composition *is* the configuration). The patching war
(patchelf, wrappers, stdenv, gone).[^patching] The evaluation scheduler.
The *forced* world-rebuild (a toolchain bump still changes build keys;
rebuilding downstream becomes scheduled policy, not a correctness debt
the rpaths call in). The store-path grammar and its hash-modulo
arcana. The NAR format. I have been asked what a "simple Nix" would
look like for years, and I kept trying to answer by *subtracting from
Nix*. Wrong direction. You get the simple system by keeping Nix's one
true invariant, pure functions over a verified closure, and rebuilding
outward from it with parts that each do one job.

A newcomer to Nix must learn a lazy functional language, derivations, the
store grammar, stdenv lore, and a million-line package set before their
mental model stops lying to them. A newcomer to this system must learn:
an atom is signed sources with a lock; a build runs the project's own
instructions in a box that contains exactly the lock; a composition maps
names to hashes and is itself hashed; you can swap compatible parts and
the root hash tracks it. Every surface they touch (FHS paths,
`./configure`, `pip`) is one they already know. That's not "simpler than
Nix." That's *legible to someone who has never heard of Nix*.

## Why Hasn't Anyone Built This?

The honest answer isn't that no one was clever enough. It's that the
parts lived in different worlds that never met. Debian and rpm have extracted interfaces structurally for
twenty-five years, but in a world with no cryptographic purity and no
content addressing. The container world built planet-scale distribution
and mounting for filesystem layers, but never gave the layer a meaning
beyond "apply this tarball next." The reproducible-builds project built
the verification discipline, hash-for-hash rebuilds, independent
rebuilders, with no substrate willing to record where reproducibility
ends and trust begins. Nix had the purity and the hashes, and spent
its cleverness in the other direction: it welded identity to
the store path, then poured a decade into fighting the self-reference
problem the weld created, RFC 62 and ca-derivations and grafts, instead
of noticing the weld was the problem. Nobody stood at the intersection
holding all the pieces at once.

And the raw materials barely existed until now. A generic content-addressed Merkle store you can lazily mount is
only a few years old. A kernel that mounts a verified composition as a
single overlay in milliseconds, composefs over fs-verity and EROFS, only
became complete at the end of 2023, with kernel 6.6. Attempt this in
2018 and you would have had to build two of the three primitives
yourself before writing a line of the actual idea.

The last piece is the one I spent years building for narrower reasons,
version resolution chief among them: a signed, versioned,
source-addressed statement of intent, decoupled from any store. What I
could not see until now is that it is *sufficient*, that it replaces the
derivation outright. Seeing that required the one move the ecosystem
couldn't make, which was to stop thinking in terms of the store. The gap
was never in anyone's ability. It was a gap in architectural thinking:
we assumed the store was load-bearing because it was complex. Only in
pulling it apart, job by job, do you find the pillar was never
carrying the weight.

## What Happens Next

I'm not announcing a finished system today. I'm not announcing a hunch
either, and the difference is worth being precise about.

The two hardest, riskiest pieces already exist. The atom lock is proven
end to end in a proof of concept, SAT resolution and all. The Eos
scheduler, the part most likely to be quietly unsound, had its
discipline machine-checked and its performance bound mechanized before a
line of production code was written.[^eos-proofs] The storage and
execution layers I didn't have to build at all: castore and composefs
already exist, already verified. What remains is mostly connective
tissue and one new but bounded piece, the interface analyzers, and
none of it is research.

The Eos proof was written against an abstract DAG of pure actions. It
never knew whether a node was a derivation or an atom, so when this model
reorganized the graph beneath it, the proof did not break; it applied to
the new nodes unchanged. The simpler design deleted an entire layer and
cost nothing already proven.

I'll be honest about the timeline of my own understanding. I have spent
over a decade with a nagging sense that something in Nix was
overcomplicated, and I could never name which part. I named it last
night. So the truest answer to "what happens next" is that I am
re-forming the architecture around this simpler model, and the re-forming
is mostly subtraction. The design at the highest layers has been
settling for years; last night it just got smaller. What remains is
to build it, in the open, in stages, and I would rather not do that
alone.

The stages are deliberately un-heroic. Each one ships something usable on
its own, and no stage is a bet on the next.

1. **The hermetic builder.** An unmodified upstream package, curl or zlib
   or CPython, its own release tarball, its own `./configure && make`,
   built inside an FHS world synthesized from content-addressed inputs,
   with a signed closure of every byte it read and a log of every byte it
   touched. No Nix anywhere in the room. This is the thing Nix cannot do,
   and it's first for a reason.
2. **Analyzers and the composer.** Interface manifests extracted
   mechanically, the composition assembled and signed, and the swap that
   makes the case: an ABI-compatible OpenSSL moved into a live
   composition, the satisfaction proof recorded, a new root computed,
   nothing rebuilt.
3. **Eos on the atom DAG.** The scheduler driving real builds across the
   graph, on the discipline already proven.
4. **The MVP.** One command over a real project with real upstream
   dependencies: add, resolve, lock, build, analyze, compose, run.

The full architecture, the roadmap, and the formal groundwork are in the
open at [github.com/axiosoph/axios](https://github.com/axiosoph/axios), as
always. If any of this reads like something you've wanted for as long as
I have, that's the point. I'm one person who spent a decade trying to
renovate this house from the inside, and the rebuild is bigger than one
person. Come argue with me. Come build a piece of it.

We've been calling this family of ideas "store-based systems," and I never
liked the name. Now I can say why: it names the one part we're throwing
away. The invariant was never the store. It was the composition. These are
composition-addressed systems, and Nix proved the foundation they stand
on: purely functional composition into a verified closure is the right
model for trustworthy software. Then it spent twenty years paying a
five-way tax on it. The tax is optional now, and so is the isolation:
carried as HTC, the guarantees stop seceding and become the bridge. The
pieces are on the table.

Time to compose them.

## _References_

[^atom-reforged]: [Atom: From Proof to Protocol](./atom-reforged), the atom protocol: identity, claim/publish transactions, formal verification, and the move from PoC to specification. Its predecessors: [From Nix to Eos](./nix-to-eos) on the original vision, and [Anatomy of an Atom](./atom-anatomy) on the proof of concept.

[^hickey]: Rich Hickey, ["Simple Made Easy"](https://www.infoq.com/presentations/Simple-Made-Easy/) (Strange Loop, 2011). Hickey draws the distinction this whole piece turns on: to *complect* is to braid together so the strands can't move independently; to *compose* is to place beside, separably. The store path complects. The composition composes.

[^refscan]: This is not a figure of speech. Nix scans each build output for the hash parts of its inputs' store paths; see [`src/libstore/references.cc`](https://github.com/NixOS/nix/blob/master/src/libstore/references.cc) and the [derivation docs](https://nix.dev/manual/nix/2.22/language/derivations). The scan is an over-approximation, which is a genuine virtue in one respect: it catches references structural analysis would miss, like a path assembled at runtime or reached through `dlopen`. It's also under-approximate the moment a reference is compressed or encoded. Structural extraction is more precise but not strictly superior; a serious system measures both. And the trade should be stated plainly for the model this piece proposes: with no embedded hashes to grep for, the net is structural extraction plus observed reads, and observation is coverage-bound, so a `dlopen` no run ever exercises can hide a runtime dependency. That swaps the grep's fail-closed overshoot for the fail-open tail every conventional distro has always lived with, now backstopped by measurement. A trade worth making, but a trade. Farid Zakaria's [anatomy of a store path](https://fzakaria.com/2025/03/28/what-s-in-a-nix-store-path) walks through exactly what the hash parts are.

[^rfc62]: [RFC 62, "Content-addressed store paths,"](https://github.com/NixOS/rfcs/pull/62) was proposed in December 2019 and accepted in January 2022. As of the 2.34 manual (2025), [`ca-derivations`](https://nix.dev/manual/nix/2.34/development/experimental-features.html) remains an experimental, opt-in feature.

[^intensional]: Naming an artifact by its inputs (extensional) versus by its content (intensional) is [Eelco Dolstra's distinction](https://edolstra.github.io/pubs/phd-thesis.pdf), from the thesis that introduced Nix. The self-reference problem and the hash-rewriting it forces are laid out in Tweag's [write-up on content-addressed self-references](https://www.tweag.io/blog/2020-11-18-nix-cas-self-references/), which calls the placeholder-substitution trick "obviously a hack." Farid Zakaria's [walk through the intensional model](https://fzakaria.com/2025/03/08/demystifying-nix-s-intensional-model) is the clearest recent tour of the same ground.

[^spack]: [Spack](https://tgamblin.github.io/pubs/spack-sc15.pdf) hashes the full build spec into each package's identity but keeps the install-tree root out of that identity, and relocates cached binaries on install (padded placeholder prefixes, RPATH rewriting), yielding relocatable artifacts. It's the cleanest existing proof that hash-based identity and install-location binding are separable, and that Nix fuses them by choice.

[^fhsenv]: Nix users will note that nixpkgs can already synthesize an FHS view over the store: [`buildFHSEnv`](https://nixos.org/manual/nixpkgs/stable/#sec-fhs-environments), the bubblewrap wrapper that makes Steam work on NixOS. It is a runtime compatibility shim, not a build substrate: it lives outside the sandbox and the derivation model, nothing signs or records what runs inside it, and you cannot build a derivation through it. "Cannot" in this piece means cannot *hermetically*, with a signed closure and an observed read set; that is the property everything downstream leans on.

[^ostree]: [OSTree](https://ostreedev.github.io/ostree/introduction/) keeps files in a content-addressed object store and checks them out to ordinary FHS paths by hardlink. Because nothing it deploys embeds a content hash in its own references, it never patches an rpath or a shebang. Fuchsia's [blobfs](https://fuchsia.dev/fuchsia-src/concepts/filesystems/blobfs) makes the same move: blobs named by Merkle root, resolved through a manifest rather than baked into the artifact.

[^cas]: Production content-addressed stores are not scarce: [git](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) objects, OSTree, [Bazel's remote-execution CAS](https://github.com/bazelbuild/remote-apis), and Fuchsia's blobfs all name blobs and trees by digest. Snix's *castore* is the one deliberately built as a clean, Nix-agnostic Merkle store.

[^composefs]: [composefs](https://github.com/composefs/composefs) builds a single overlay from one EROFS metadata image plus a shared content-addressed object directory, and validates each file's [fs-verity](https://lwn.net/Articles/920670/) digest on every read. Integrity is enforced continuously by the kernel, not audited once at download time. The kernel support it leans on landed in two pieces: data-only overlayfs lowerdirs in 6.5, and fs-verity digests in the overlayfs metacopy xattr in 6.6, complete as of late 2023.

[^nixverify]: Nix can verify store contents (`nix store verify` re-hashes paths and checks signatures), but it does so on demand, not on the path to execution; nothing re-checks a store file's bytes at read time. The NixOS community [evaluated dm-verity, fs-verity, and IMA for the store](https://discourse.nixos.org/t/boot-time-integrity-checks-for-the-nix-store/36793) and settled for a one-time signature check in the initrd.

[^structdeps]: RPM has extracted dependencies structurally for decades via [`find-requires`/`find-provides` and `elfdeps`](http://ftp.rpm.org/max-rpm/s1-rpm-depend-auto-depend.html), reading ELF `DT_NEEDED` and soname records; Debian does the equivalent with [`dpkg-shlibdeps`](https://manpages.debian.org/testing/dpkg-dev/dpkg-shlibdeps.1.en.html). (Interpreter and shebang dependencies on Debian are handled separately, by debhelper tools such as `dh_python3`, not by `dpkg-shlibdeps`.) None of it greps for magic strings.

[^static]: For dynamically linked consumers, which is what an FHS composition binds by name. A consumer that statically links or vendors OpenSSL carries the dependency in its own bytes and must rebuild here exactly as it must everywhere else, Nix and grafts included; no binding model can swap what the compiler already inlined. The comparison with Nix is unchanged, but the no-rebuild win is scoped to the dynamic case.

[^abi]: Symbol-and-version satisfaction, the consumer's needed symbols and versions being a subset of the provider's exported ones, is necessary but not sufficient: a change that keeps a symbol's name while altering the layout behind it slips past it. So the default, an exact digest pin per entry, is the guarantee floor, identical to Nix; satisfaction-based substitution is opt-in per composition with a recorded proof; and deeper type-level comparison (the libabigail/DWARF lineage) is a known next tier behind the same interface, not a research problem. The claim is that the substrate can name and check the ABI surface at all, which Nix cannot, and can tighten the check without changing the model, not that matching symbols proves compatibility.

[^grafts]: Guix documents grafting under [security updates](https://guix.gnu.org/manual/1.5.0/en/html_node/Security-Updates.html): the patched package is rebuilt, then its store-path hash is binary-rewritten into every dependent in place, which requires the replacement name to be exactly as long as the original and the libraries to remain ABI-compatible. Nixpkgs' equivalent is [`replaceDependencies`](https://github.com/NixOS/nixpkgs/blob/master/pkgs/build-support/replace-dependencies.nix). Grafts aren't deprecated; they're a conceded hack that content-addressing is meant to eventually obviate.

[^evil]: The breakage and short-term-solution warnings are in-source comments in nixpkgs' own [`replace-dependencies.nix`](https://github.com/NixOS/nixpkgs/blob/master/pkgs/build-support/replace-dependencies.nix); "somewhat evil/potentially unsound" is Jade Lovelace's, from her [survey of package-pinning techniques in Nix](https://jade.fyi/blog/pinning-packages-in-nix/).

[^pyabi]: Wheels record every installed file with a hash in [`RECORD`](https://peps.python.org/pep-0427/). Python does have a stable ABI ([`abi3`, PEP 384](https://peps.python.org/pep-0384/)), but it's opt-in, narrower than the full C API, and unused by most compiled extensions, which is exactly why the `cp3x`/manylinux wheel matrix exists. "No stable ABI" overstates it; "no universally used stable ABI" is the honest version, and the interface-extraction argument holds either way.

[^module-system]: I've made the case against the NixOS module system at length in [From Nix to Eos](./nix-to-eos#unbounded-hell-reducing-complexity-in-order-to-ascend): a global namespace masquerading as modularity, breaking Nix's laziness to type-check eagerly, with an effectively unknowable complexity bound, which is why so much of nixpkgs' effort goes to maintaining semantics that shouldn't exist. The point here is narrower: none of that machinery is needed once the environment is the primitive rather than something reconstructed on top of the store.

[^nickel]: [Nickel](https://nickel-lang.org) is Tweag's configuration language, born from the Nix module-system experience: gradual typing, contracts, and merge semantics as language features rather than a library reimplemented inside a lazily evaluated DSL. Nothing here depends on Nickel specifically; the point is that configuration composition belongs in a language designed for it, decoupled from the build.

[^oci]: The [OCI image specification](https://github.com/opencontainers/image-spec/blob/main/layer.md) defines a layer as a tar archive of filesystem changes, applied in sequence, with deletions encoded as whiteout files. Nothing in the format expresses what a layer provides, requires, or conflicts with; the final filesystem is defined operationally, by replaying the stack, and a path touched by two layers resolves to whichever was applied last. The layer is a diff, not a statement.

[^bootc]: "[Git for operating system binaries](https://ostreedev.github.io/ostree/)" is OSTree's own self-description. The trees it commits are composed outside it, by [rpm-ostree](https://coreos.github.io/rpm-ostree/) or, increasingly, by a container build: the [bootc](https://github.com/bootc-dev/bootc) direction ships bootable systems as standard OCI images, which buys the registry ecosystem at the price of reinstating the opaque tarball layer as the unit of change. None of this retracts the credit given earlier: OSTree's storage layer remains the existence proof that content addressing needs no rpath rewriting. What it never had is composition semantics.

[^composefs-oci]: [composefs](https://github.com/composefs/composefs)'s stated target use cases are OSTree-style deployments and OCI container storage, and [containers/storage](https://github.com/containers/storage), the layer beneath podman, already supports it as an image backend. Mounting a verified composition with container-native machinery is that ecosystem's own trajectory, not a detour this model asks it to take.

[^patching]: One caveat: a package with no staged-install path (no `DESTDIR` or `--prefix` discipline) still needs a single conventional patch to add one. That is the only patching this model ever requires, and it is orders of magnitude less than the store-fighting patches, wrappers, and stdenv machinery it replaces.

[^eka]: The proof of concept lives in [eka](https://github.com/ekala-project/eka). It is not a tool to adopt and not the intended surface; it is unstable, and it exists to prove the load-bearing result, that the atom lock, with full SAT resolution over isolated, versioned git objects, works end to end. That result is established; the real implementation is being built properly now.

[^rb]: The [Reproducible Builds](https://reproducible-builds.org) project is the cross-distribution effort to make builds verifiable by independent rebuilding. The measured numbers for Nix come from Malka, Zacchiroli, and Zimmermann's large-scale study, ["Does Functional Package Management Enable Reproducible Builds at Scale? Yes"](https://arxiv.org/abs/2501.15919): rebuilding 709,816 historical nixpkgs packages (2017–2023) yielded bitwise reproducibility between 69% and 91%, trending upward, with rebuildability over 99%. The title's "yes" is earned, and so is the residue: input-determinism scales; bit-for-bit output identity is hostage to upstream's nondeterminism, and no store layout fixes that.

[^nixtrust]: Nix's substitution trust is a signature on each `.narinfo`, checked against [`trusted-public-keys`](https://nix.dev/manual/nix/2.34/command-ref/conf-file#conf-trusted-public-keys); in practice most installations trust exactly one key, `cache.nixos.org-1`. The mechanism is real but flat: a path is either signed by a key you already trust or it isn't, with no delegation, no revocation story, and no distribution scheme for the keys themselves beyond pasting them into a configuration file.

[^ion-config]: "This configuration" is not a comment; it is inside the hash. Any deviation from a package's default build configuration is normalized to a canonical form and hashed into the build's input identity, a job owned by ion, the frontend layer of the stack. The mechanism is deliberately boring, canonicalize and hash, and the consequence is that a hash expectation names source *and* configuration as one cryptographic statement: a package built with non-default flags is simply a different build intent, with its own identity and its own reproducibility claim.

[^trustix]: The instinct is not new. [Trustix](https://github.com/nix-community/trustix) set out to bolt decentralized trust onto Nix: independent builders logging signed input-to-output hash pairs, with M-of-N agreement standing in for a trust root. Announced in 2020, it remains an early research demo, and the structural reason is the one this piece keeps finding: the store gives attestations nothing stable to attach to, an input hash names a recipe rather than a result, and where builds aren't reproducible the votes simply diverge, leaving policy where verification was promised. The right idea kept fighting the store. Here, the boundary it tried to compute after the fact is a fact the metadata carries from the start.

[^eos-docs]: For the impatient, a high-level tour of the Eos architecture is already hosted at [axiosph.netlify.app](https://axiosph.netlify.app/explanation/eos-architecture.html); the full ADR speccing it in detail lives on the same site, considerably more formal.

[^eos-proofs]: The scheduling model, its fairness and starvation-freedom proofs (TLA+), the mechanized performance bound (Lean), and the simulation harness against real build traces live with the rest of the architecture at [github.com/axiosoph/axios](https://github.com/axiosoph/axios).

[^determinism]: Running upstream's own build doesn't forfeit reproducibility, because reproducibility never came from the store path; it comes from the sandbox pinning inputs and controlling the environment, exactly as in Nix. Residual nondeterminism (embedded timestamps, build paths) is the domain of the [reproducible-builds](https://reproducible-builds.org) project and tooling like `SOURCE_DATE_EPOCH`, orthogonal to how artifacts are named. And because build identity is input-addressed, a non-reproducible build still yields one determinate cached result per intent; only the cross-recipe dedup bonus needs bit-for-bit reproducibility, precisely as with `ca-derivations`.
