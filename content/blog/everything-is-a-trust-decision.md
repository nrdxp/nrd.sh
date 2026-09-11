+++
title = "Everything Is a Trust Decision"
description = "Make them explicitly, count them, and know what each one costs."
date = 2026-09-11
tags = ["trust", "supply-chain", "identity", "science", "nix", "systems"]
+++

*Second draft, revised 2026-09-11. The first draft went out earlier the
same day and stays in the record at
[commit ea08510](https://github.com/nrdxp/nrd.sh/commit/ea08510); the
diff between the two is the honest account of what changed. The change
in register is deliberate: we decided that the argument for the
result's utility is load-bearing, so where the first draft was
conservative about the science, this one is predictive along its
consequences, each consequence stated with its bound and what would
falsify it.*

## Far More General Than Packaging

Last time I argued that Nix is right about everything except the store,
and near the end I said in passing that the line between what a system
can *verify* and what it can only *vouch for* should be a field in the
metadata, not a feeling.[^lastpost]

I undersold it. The line is a theorem, and it is not about packaging.
It applies to anything that keeps a record and wants an answer from it
to stay true: package managers, transparency logs, signed commits,
reproducible science, the key you rotate when your laptop is stolen.
This post is about that shape. You already make trust decisions all day; the shape says make
them explicitly.

Start with the largest record there is, because that is where the
stakes are. This week a lab announced a solution to a Millennium Prize
problem, and two researchers who had posted first asked in public how
their work had been used.[^navier] I do not know who is right. What
strikes me is that nobody can know from the record, because the record
science keeps cannot answer the question. Who posted what, when, and
what rests on it are claims about an append-only sequence of findings,
and science settles every one of them by reading, argument, or
reputation. Attribution is load-bearing for the whole enterprise, since
otherwise we listen to whoever took the work instead of whoever did it,
and no law enforces it: ideas are not property, and rightly so. The
discipline falls on the commons, and the commons has no instrument for
it but conduct.

Science is not the only commons in this argument. Open source is the
other, and I have argued twice in this series that a commons cannot be
run as a business without ceasing to be one.[^sovereign][^anamnesis]
The calculus gives the structural half of that in one line: nothing
closes without a check you can re-run, so an input that is withheld
from you closes never, or only under a hardness assumption, and every
other route to it is someone's word. Both commons are on life support,
open source in burned-out maintainers and captured governance, science in the reproducibility crisis, and they
depend on each other: without science, civilization cannot scale or
even sustain itself, and the science that runs on software runs on the
open-source commons. Conduct does not scale for either. A record whose
claims carry their grades does, and it is what both lack and both need.
I have said before that something formal and distributable is what it
takes to scale science past its current breaking point without giving
up integrity; the discipline is the same for both.

The deeper problem sits under attribution. A citation is what you do
when you do not hold all the pieces yourself: you point at someone who
does, and you trust the pointer. If you do hold the pieces, the result
is verified whether or not any journal has said so. Verification is
primary and citation secondary, and our pipeline has it backwards.
Prestige sits in the citation rather than in whether the thing it
points at is true, so true results get dismissed for want of a paper to
cite and false ones get the look of truth by making it into the
pipeline. That is a bottleneck on what anyone is willing to trust. It
is also a technical problem, and technical problems can have technical
solutions.

Certificate Transparency shows what one looks like. It is the most
widely deployed append-only record in the world, and it can prove
exactly two things: that an entry is in the log, and that one version
of the log is a prefix of another. Both proofs are the size of a path
down a Merkle tree. Ask it anything about what the entries say, how
many certificates it holds for your domain, whether any was issued by a
CA you never authorized, and it has no proof to give you; someone reads
the entries. That is no gap in its engineering. Its two proofs read the
tree's shape and never its contents, and nobody had a theory of which
claims about contents could have a proof like that.

Now there is one. Whenever a claim over a record is a fold, meaning
what it says about the whole combines from what it says about the
pieces, a bounded checker can take it in at every size, on the shape of
the claim alone, assuming nothing but the hash. Everything else that
stays small buys it with a cryptographic hardness assumption. The
paper's word for a record held that way is *eusynoptic*, Aristotle's
word for a city small enough to survey at a glance, and the glance
stays bounded no matter how large the record grows. Inclusion and
consistency are two folds that happen to read structure. "This finding
was in the record before that one" is another, and it reads the
entries. So is "everything this paper cites was in the record before
it," and so is "no package in this closure has been yanked as of entry
*n*." "This result reproduces" is fixed by the record only when the
record carries everything a stranger needs to run it, and where it does
not, the theorem names what you are trusting instead: the authors'
word, or a named replicator's.

The realest expression of science in our time is a machine doing it,
and the dispute this post opened with is, underneath, an argument about
what machines did and in what order, which no record anyone keeps can
say. Everyone says they care about AI safety, and almost nobody can
state the question in a form a record could answer. Alignment in the
large is hard, and I claim nothing about it. But there is a small
version that is a yes-or-no claim: is this machine making progress
toward the goal I set? Every step a machine takes toward a goal is
itself a claim, and a claim can be graded by what it rests on: checked
by machine, cited at source, the operator's word, or reasoning. The
grade asks what the claim rests on, not who made it. That rule falls on
me, on the machine that assisted me, and on you, because all three of
us are fallible, and "who wrote it" is not a grade. Track every
intermediate claim and grade it, and the whole has a grade. The model's
output is probabilistic; the record of its claims is a deterministic
spine through it. Now point the same discipline at the corpus instead
of the session. Imagine the training set itself graded, every claim in
every entry, against the three conditions the rest of this post lays
out, so the model was built from a record where each claim carried what
it rests on rather than from text taken as given. In practice there
would be an error ratio; the point is the picture, not a promise. None
of this is a theory of alignment, just one question about alignment
that has an answer, and the session version is how this paper was
built: the claims machines made on the way to it were recorded and
graded, and the paper's own claims carry those grades onto the page.

Nobody has felt this yet, because nobody has built a record whose
claims come with proofs the size of a Merkle path: priority as a
receipt instead of a dispute, a citation as a pointer you can check
instead of one you trust, a result graded by what a stranger can rerun.
Those are predictions the formalism makes, and you can hold it to them.
They are stated falsifiable on purpose, because a prediction you cannot
be proven wrong on is worth nothing to science, and I am asking to be
proven wrong. We are building two such records, one for packages and
one for identity, and both appear near the end, along with the rougher
one that built this paper. The one science needs, nobody has built,
and the finding says what it would have to be. You may want to see us succeed
or you may want to see us fall. Either way, the argument is the thing
to contend with.

A few facts the argument depends on. This is my first scientific
contribution. My co-author Zach Collier and I asked one question in two
forms. Trust has boundaries; everyone knows that, and Thompson drew one
forty years ago. What nobody had was a proof that the boundaries are
exhaustive, that past a certain line there is nothing left to verify
and every kind of trust that remains has been named. So: is there a
provable upper bound on how much you can verify, and is what lies past
it completely accounted for? The answers are in a paper titled
*Factoring Trust: A Machine-Checked Calculus of Where Verification Must
End*, under double-blind review at CSF 2027, the IEEE Computer Security
Foundations Symposium, so the paper and the Lean 4 development behind
it stay private until a decision. The mechanization is mostly mine,
with AI assistance, done under a discipline I describe at the end; that
is provenance, not a grade. The grade is this: every time I say the
machine checks something, that is today my word, from a named person
you can hold to it, and it becomes something you can run yourself when
review ends. I grade it as a vouch here because that is what it is.

Why post before review? Because I judged the finding too important to
sit on a shelf for a year, and because the dispute above is the
argument for posting dated. A large firm can publish a result within
days of finding it; an independent researcher waits that year for
review, and many of the bottlenecks that make up that wait are exactly what a
graded, verifiable record could automate away. The argument asks for it
too: if verification is primary and citation secondary, the claim
should go out with its grades on it and let the review follow. A public
statement of what you found and how strongly you hold it is the
cheapest insurance there is, and it is the discipline this post is
about.

## The Question Thompson Opened

The question is old. Socrates was called the wisest man in Athens, and
his own account of why was that he alone knew there was an end to what
he knew. He could not say where it was, only show that everyone he
examined was standing past it without noticing.[^apology] Twenty-four
centuries later, Ken Thompson put the end inside the machine: you
cannot trust code you did not totally create yourself, and no amount of
source-level scrutiny will save you, because the compiler that compiles
your compiler could be lying.[^thompson] He closed with a moral rather
than a map. Verification stops somewhere; he did not say where, and he
was not trying to.

For forty years the pieces needed to say it sat in different fields.
Distributed-systems theory proved which states of knowledge a group of
machines can reach.[^halpern] Cryptography proved exactly which sets of
corrupt players a protocol can survive.[^hirt] Security engineering drew
a perimeter around the trusted computing base and admitted, in
Lampson's words, that what is inside it is "not easy to figure
out."[^lampson] Some argued the limit is social and cannot be a theorem
at all.[^demillo] And the people who build tamper-evident logs listed
their trusted parties one system at a time, without asking whether the
list was complete or why those parties and no others.[^crosby]
Everyone since Thompson has agreed that verification stops. What
nobody asked, as far as we can find, is whether the place it stops has
a shape: over a record that only grows, take every claim you could
make about it; is the set a bounded checker can settle exactly
describable, with everything past it being exactly what you must
trust, and is that line a theorem rather than a policy? The sentence
falls the day someone produces the prior work, and I will say so when
it does.

Why did it go unasked for forty years with the pieces on the table?
The honest answer is boring. They lived in different fields:
cryptography had the tree, functional programming had the fold,
databases had the time window, distributed systems had common
knowledge, security logic had the trust statement, metascience had
reproducibility. Each solved its own component, and nobody stood where
they meet, because standing there is not a research position in any of
them. We stood there because we were building a system that needed
every piece at once and kept asking what they had in common. That is a
vantage, not an insight the fields lacked.

I am going to claim that this question is now closed. Not trust, which
is enormous and mostly human; the question.

Put more exactly: what we have in hand is a fundamental piece of
epistemic machinery, not proposed but derived, for claims over a record
above two named grants. Within that bound every part of it is forced:
the three conditions with no fourth, the residues with none missing,
the order of the climb, the shape of the certificate. Anyone who cares
what that sentence claims will know exactly what it claims, and can
check it when the development is public.

## Everything Is a Trust Decision

Start with what you already do. A lockfile pins *what* you depend on,
not *who* stands behind it. A signed commit is someone's word. The CA
root in your trust store is something you decided to believe, once, and
stopped thinking about. The transitive dependency your dependency pulled
in, that you never opened, is nobody's word at all.

Those are four different positions. Take any artifact you run and
everything beneath it, transitively: sources, dependencies, their
dependencies, the compiler, the keys. Call each a part. Every part is
in exactly one of the four. Some you **closed**: a re-runnable check
passed, on top of someone's vouch that the thing is what it claims to
be. The rest is the *open surface*, and it splits three ways. Some of
it you were **given** and chose to take as is: the seeds, meaning the
compiler you run, the hash function, the root key. Some was **vouched**
for by a principal you admit and not yet checked. And some is
**anonymous**: nobody has vouched, nobody has checked. Run the opening
examples through it. Your CA root is a seed. The signed commit is a
vouch. The reproducible build you re-ran yourself is closed. The
dependency nobody opened is anonymous.

That is the first equation, and it belongs to the second of the paper's
two calculi, the one about built things:

$$\Sigma \;=\; G \;\uplus\; V \;\uplus\; A$$

The open surface $\Sigma$ of an artifact, everything under it that
verification has not closed, is the disjoint union of what you were
given, what was vouched for, and what is anonymous. Every open part is
in one bucket and one only. That split is how the accounting classifies
every part, and the classifier has no fifth verdict; the theorems come
later, when the buckets start to move.

The thesis of this post is under that equation. Trust is not the enemy
of verification but what verification leaves behind, and it can be
named, counted, and moved. The given bucket, what you chose to take as
is, is not a failure but a decision. Zero trust does not exist. Named
trust does.

The title is a play on "everything is a file." That slogan earned fifty
years because it was literally true of the architecture, and you could
hold Unix to it. I want the same bar here and the same consequence: a
discipline you can hold a system to. Everything is a trust decision,
and an attestation is your signature on one. Write every one of them
down, sign it, and put it where it can be counted. Not trustless: trust
less, and say exactly what is left.

## What It Means for a Claim to Last

Everything above is a snapshot. The real question is what happens when
the record grows. You verified something yesterday; overnight the log
took ten thousand new entries. Do you check again?

Three words carry the rest, each in its plain sense:

- A **record** is an append-only sequence of entries. Git history if you
  never force-push. A transparency log. A package index that only adds.
- A **certificate** is the thing you check instead of re-reading the
  record: a Merkle path, a signature, a proof.
- A claim is **enduring** when its certificate keeps working no matter
  what is appended.

Plato had a word for an opinion tied down by an account of why it is
true: it becomes *monimos*, abiding.[^meno] A record in which tied-down
claims abide is what the paper calls a *monimograph*, and the word will
matter once, near the end, for a record that is not one. The first of
the paper's two calculi ranges over exactly this object, and its
judgment is the one to remember:

$$R \;\vdash^{+}\; c \;\triangleleft\; \pi$$

Over the record $R$, the claim $c$ holds by the certificate $\pi$, and
keeps holding over every extension of $R$. The plus is the point: not
"true now" but true from here on. The law that makes the plus honest
says that if the record grows from $R$ to $R'$ and $c$ endured at $R$,
then $c$ holds at $R'$: the certificate was made at $R$, stays anchored
there, and you never need a new one. The machine checks that, on my
word for now.

## Exactly Which Claims Can Last

Take the claim every developer knows: "this commit is the latest." It
is true right now, it is computable from the record, and the next push
unmakes it. No certificate, of any kind, under any assumption, can make
"latest" endure. That is not a limitation of Merkle trees or
signatures; it is what the claim is, a photo of a scoreboard mid-game,
true the instant you took it and meaningless a moment later.

The central conjecture says which claims can last, and it is a
biconditional:

$$\exists\, \text{enduring scheme for } c
\quad\Longleftrightarrow\quad
\mathrm{determined}(c) \;\wedge\; \mathrm{certifiable}(c) \;\wedge\; \mathrm{monotone}(c)$$

Determined means the record alone fixes the answer; who is asking and
who wrote it do not matter. Certifiable means a checker of the power you
actually have can recognize a certificate for it. Monotone means that
once it is true, appending more entries cannot make it false. A claim
has an enduring certificate exactly when all three hold, and the
machine checks that in both directions: given the three conditions, it
builds the verifier.

Why three and not four? Because there are three things in the picture:
the claim, the checker, and the record's growth. Each condition is one
of them failing, and there is no fourth part to fail. That is why the
count is a theorem and not a taxonomy someone liked.

"Latest" fails the third condition, and that one fact is why every
transparency log in production had to grow a liveness layer: gossip,
witnesses, freshness checks. Certificate Transparency shipped inclusion
and consistency proofs and then found it needed gossip on top.[^ct]
The field found that by getting burned; the calculus says it had to be
so. Distributed-systems people will recognize the third condition from
the other side: CALM says a monotone specification needs no
coordination, and our watcher is that coordination, bought per claim.
CALM has no analogue for the checker leg, and what the calculus adds is
that the three conditions are exhaustive.[^calm]

The three conditions say nothing about your domain, and that is the
design lever. The calculus does not know what an entry means, what a
signature is, or what a build does. It fixes the procedure for knowing
and leaves every one of those choices to you, which means they are
yours to get right. So classify the claims your system will live or die
on before you build, because the classification tells you which can be
checked once and which will have to be checked forever, and nothing you
build afterward can move a claim across that line.

One note on where the checking stops. "A checker of the power you
actually have" is a parameter, and the machine checks the biconditional
at two settings of it: unlimited power, and merely computable.
Polynomial time, the setting most developers care about, is future work
in the paper. I do not think that weakens anything. At any power a
checker either exists or it does not, so the count of three is the same
theorem at every setting. What changes at polynomial time is the floor:
our proofs take the hash as absolutely binding, and a polynomial
version would have to take it as computationally binding, which makes
it a theorem in cryptography with hardness assumptions and security
parameters, on a trusted base that has no usable definition of
polynomial time yet. I expect it to follow with the partition
untouched.

## What You Can Check Without Reading Everything

Why does everyone reach for a Merkle tree? Is that the right instinct or
a fashion?

A claim you can check from summaries alone is one whose answer over two
pieces of the record combines from the answers over each piece:

$$h(x \,\text{++}\, y) \;=\; h(x) \oplus h(y)$$

For those claims a bounded checker takes the whole record in at every
size, and the bound comes from the shape alone, with nothing assumed
but a binding hash; that is the eusynopsis from the top of the
post.[^politics] The machine checks that the enduring terms of the
calculus are exactly these functions, the list homomorphisms of Bird's
theory of lists.[^bird] Succinct proof systems reach outside the class
and pay for it with a hardness assumption. Inside it the bound is free.

That is where the tree comes from. Because $\oplus$ is associative, you
may bracket the fold any way you like. The balanced bracketing is a
tree, and the certificate for one entry is one path down it. That is a
Merkle tree, and its logarithmic proof is the shape the algebra
produces: the associativity made visible. The instinct was right. It is
easy to say too much about the tree, so here is exactly what is true:
it is optimal for certificate *length* among constructions that assume
nothing but a binding hash, a lower bound that is Tamassia and
Triandopoulos's,[^tamassia] and constant-size alternatives exist,
accumulators and vector commitments, which buy their constant with a
hardness assumption.[^boneh]

Inclusion is the single-entry case, and Certificate Transparency stops
there. Read the entries instead and the same tree gives the same proof
for any claim of this shape, a fold over every entry it touches. The
claim can be stated after the entries it ranges over, or extended as
the record grows, and as long as every piece it is built from endures,
the whole endures and you can verify it at any time. Where a piece does
not, the calculus names which one, and that is exactly where your
checking stops.

In practice the calculus hands you an interface with four parts: what
you read out of each entry, how two readings combine, what you do with
the total, and which stretch of the record you range over. Supply those
and it tells you which cell your claim lands in and whether an enduring
certificate can exist for it. Take "no package in this closure has been
yanked." Read each entry as "is this a yank of one of mine," combine
with or, finish by negating, range over the whole record so far.
Determined, checkable from summaries, and not monotone: the next entry
can be the yank. That claim is a phone call. Change one parameter, the
range, to "as of entry 1,204," and it is a receipt you can issue once.
Nothing else about your system had to change.

That is the designer's job: not picking a data structure, but
committing to data and metadata such that the claims you care about
come out as folds over the record, and knowing before you ship which
ones cannot and what you owe in their place. Leave a claim outside the
class and you have not failed; you have a residue with a name, and a
bill.

## Five Ways to Fail, Three Cures, One Price

Three conditions give eight combinations. One is the verifiable case.
Two cannot happen, because a claim the record does not fix admits no
checker at all, so certifiability is not even a coordinate for it. That
leaves five ways a claim can fail to endure, each with a named residue.
The paper has the table; what a working engineer needs is the three
kinds of thing you are left trusting, each with a claim you have
shipped:

- The record does not fix the answer, so you trust a **witness to
  history**. "The key that signed this event was in its owner's hands."
  The xz backdoor lived here. Every signature on those releases was
  valid, and the signatures told the truth: the person who inserted the
  backdoor was the person who signed. What no record could fix was
  whether the person behind the key was who two years of patient
  contribution said they were. No mechanism removes that residue. A
  record can only make it a named person's word instead of nobody's,
  and mark exactly where you are relying on it.
- The answer is fixed but no checker of your power can reach it, so you
  trust a **voucher**. "This build never finishes." "This image contains
  what its SBOM says." A laundered image ships with a clean SBOM because
  the SBOM is the publisher's account, not a walk.
- The answer is fixed and checkable and the next entry can unmake it, so
  you trust **someone still watching**. "This certificate has not been
  revoked." "This is the current key."

Each has a cure, and each cure is a single edit to the claim:

1. **Restrict the window.** Stop saying "latest." Say "as of entry
   1,204." That claim endures.
2. **Get a vouch.** Let a named principal's attestation stand in for
   what you cannot compute. The claim now rests on their word, and the
   calculus writes that word down as what it rests on.
3. **Get a witness.** For facts the record does not carry, who did it
   and when, a witness's entry in the record. The claim rests on the
   witness.

Paying someone to keep watching, so the current-window claim stays
alive, is not a cure, and the word matters. Gossip and heartbeats are a
price, paid continuously, for as long as you insist on the claim, and
much of the confusion in this space comes from treating the price as a
cure. The
shorter way to say the third failure was the first theorem we found on
the way here: a certificate can be eternal, it can be checked offline,
or it can be about now, and you may have any two of the three.[^eon]
Eternal and offline is a receipt. Now is a phone call.

That reframes a cost intuition most of us carry, and I held it for
years: trust cost scales with the record, bigger log, more to check. It
does not. The cost
is per *claim*. A claim in the enduring class costs one certificate,
forever, however large the record grows. A claim outside it costs a
watcher, forever, however small the record is. Engineers have sorted
claims into those two piles by trial and error for decades, and often
got it backwards, building a vault where a receipt would do or handing
out a receipt that silently expires. The calculus says which pile, in
advance. It is also where transparency logs and blockchains part ways:
not by size but by which claims they insist on. A blockchain insists on
one claim a log does not, that there is a single current tip and this
is it, and that claim is not monotone. Consensus is its price. I am not
calling anything broken, only saying what the bill is for, and that the
discipline is to pay it for the one claim that needs it, on purpose,
and for nothing else.

## Where an Artifact Stands

A dashboard that counts "unverified vouches" will go *up* as your
system gets healthier, right up to a point, and only then start
falling. If that sounds like a bug in the dashboard, keep reading.

The first calculus ranged over the record. The second ranges over
composed artifacts, things built from other things, which the record
does not carry: two artifacts can share one record and differ in what
is still open beneath them. Its judgment reads: given the evidence
admitted so far, the artifact stands on an open surface and a standing
basis.

$$\sigma \;\therefore\; a \;\because\; \langle\, \Sigma \mid B \,\rangle$$

$\sigma$ is the evidence admitted so far, the vouches and checks your
policy accepts, with a retraction modeled as an omission. $\Sigma$ is
what is not yet closed beneath $a$. $B$ is the admitted evidence it
rests on. As $\sigma$ grows, $\Sigma$ only shrinks and $B$ only grows.
They move in opposite directions and never trade places.

The climb has two marks on it, and a distance between them:

$$\text{provenance floor} \iff A = \varnothing
\qquad
\text{total ceiling} \iff \Sigma = G
\qquad
\text{distance} = |V|$$

The floor is where nobody anonymous remains under the artifact. The
ceiling is where only what you chose to trust remains. The distance is
how many vouches still await a check.

Here the machine starts checking things that are not true by
construction, and in this post's voice they are still conjecture. Both
marks are genuine biconditionals: they fail in one direction under a
classifier that mistakes an undeclared leaf for a seed, and we know
because ours did until it was fixed. Nothing closes without both a
re-runnable check and someone's vouch behind it, so you cannot reach
the ceiling without passing the floor, and the order of the climb is a
theorem, not a policy. And the distance can *rise* before the floor,
because an anonymous part gaining a vouch is honest progress that looks
like regress on the count; it falls only after the floor. The dashboard
was right and the intuition was wrong.

<figure>
<img src="../fig-interval.svg" alt="The open surface of an eight-member closure, stepping down as evidence is admitted, with the provenance floor and the total ceiling marked" style="max-width: 28rem; margin: 1rem auto; display: block; background: #fff; padding: 1rem; box-sizing: border-box;">
<figcaption>The open surface of one artifact with eight parts, computed from the mechanization, as vouches and checks are admitted one at a time. Watch the vouched band: it widens while anonymous parts are still being vouched for, and only starts to shrink once the floor is passed.</figcaption>
</figure>

The floor is the one piece of guidance I would hand any team tomorrow,
and it shows where good practice turns into bad. Nothing stops you from
admitting an anonymous part; the calculus represents it fine. But an
anonymous part is the one position in the partition that nobody
decided, and with one anywhere beneath an artifact you cannot guarantee
the provenance of anything above it. That is not an opinion about
hygiene but what the partition says, and you can only say it because
every term in it is exact. So treat anonymous trust as the smell, and
make the floor your admission criterion: nothing enters that nobody has
vouched for. Then close the vouches. Systems that skipped straight to
closing, without a floor, left anonymous parts they could not see,
because a part nobody has vouched for is on nobody's list, and their
dashboards said nothing because there was no count under them.

## The Floor of Two Assumptions

Thompson said verification must end somewhere. Here is where.

The result grants exactly two things and names them. First, that the
hash binds: two different records never share a commitment. We state
that as absolute, which is an idealization, and we own it; real hash
functions are collision-resistant against bounded adversaries, not
collision-free, and the paper says how far that is from absolute. Second, that the verifier you run is the one you think you
run. That is Thompson's moral read as a premise: you cannot check your
ruler with the same ruler. Neither grant is an axiom of the
mechanization. Inside the proof the axioms are Lean's own three and
four of ours, which say only that entries and contexts are types, that
a context exists, and that a second one differs from it. The two grants
sit beneath the model, where the mathematics meets the world.

Everything above those two is a statement about what a record can
carry, and this is where the old question ends. Socrates knew there was
an edge to knowing and could not say where. Thompson found it in the
compiler and left it as a moral. Here is the edge, drawn: two grants
beneath it, three named pieces of trust above it, and no fourth.
Verification ends at the floor; everything past it is named, counted,
and priced, and nothing above the floor need be anonymous. That
question is done.

## Three Instances

If the shape is real it should show up where nobody was thinking about
packaging, and it does: wherever anyone keeps a record of claims and
wants an answer to survive the record's growth, which is a much larger
place than software. Version control and transparency logs, obviously.
Ledgers and land registries. The rules of evidence, which already let a
hash stand in for a witness. Causal inference, where the record not
fixing the answer has its own name. History, which is a record with
witnesses and nothing else. Science. The justice system.[^fields] The
class is abstract, so nobody will finish that list, and the paper does
not try. Each domain brings its own entries, its own checks, and its
own idea of a vouch; the calculus brings the three conditions and the
count. Here are three, each further from software than the last.

**Packaging.** Nix got the first move right twenty years ago: compute
the closure before the build, so every input has a name before anything
runs.[^dolstra] I spent a decade inside that model and said last time
what it costs. What I did not say is exactly where it stops. A
derivation exists before the build and is addressed by its own hash,
but nothing binds a named principal to a claim about it until after the
build, when a cache key signs the output. That is an attestation after
the fact, and in the calculus an attestation after the fact is a
citation, not a verification: a pointer at a history the record never
fixed, graded as a witness's word. The closure is a map of the floor,
but nobody in it has vouched, so the map is not the floor.

Signing derivations up front would not fix it. Nix in practice is a
just-in-time attestation machine: this expression yields this
derivation, which yields this output, decided at evaluation time, with
no object anywhere that states the claim ahead of it. A derivation is a
recipe, and a recipe is the wrong shape for a claim. It carries too
much, every flag and every path, and it is coupled to the bytes on
disk, which is what makes it rigid and what keeps real content
addressing out of reach for the reasons the last post gave. The
discipline is old and plain: separate the concerns. Attestations belong
in their own append-only record, not welded to the data they are about.

That is what the atom is.[^atom] An atom is a minimal, signed,
versioned statement of intent, sources plus manifest plus lock, entered
into its own append-only record before anything is built, with the
build derived from it step by step in that order. The order is the
whole point. Declared first, "this was built from those" is fixed by
the record. Built hermetically, a stranger can check it. Anchored in a
record that only grows, it stays checked. Those are the three legs, and
they have a practical face: you check the atom before you run the
build, walking its closure signature by signature, and if one is wrong
you stop walking. Nothing has been built yet, so nothing has to be
thrown away. The atom is the claim to the recipe and to the content
underneath it, and every vouch on every part is a signed fact in the
same record. That is the field I said the metadata should carry. It
turned out to be the floor, with the accounting above it, and that is
the whole of what I will say about the last post. It is finished.

**Identity.** This is where the question was born, and I think it is
more fundamental than packaging, because packaging depends on stable
identity and, in my view, nothing deployed has solved it well. Zach
leads Cyphr, our lab's self-sovereign identity protocol, and I work on
it with him.[^cyphr] In Cyphr, who you are is a genesis commitment and
an append-only chain of signed key events under it: this key added,
that one rotated, this one revoked. Your whole identity, keys and
history, is one digest. Of the claims the chain fixes and a checker can
settle, every one endures except one, which is what eusynopsis looks
like in one domain: every claim about the chain but one is a receipt.
"This is their current state" is a tip claim. It cannot endure, and
nothing you sign can make it. That is why key transparency needed
gossip, why rotation needs a record rather than a replacement, and why
Cyphr's design has a witness network: the watcher the calculus prices,
bought for exactly one claim and nothing else.

The attack we were designing against is the split view, where a server
shows two people two different histories. Working through it in the
calculus gave us a sentence I keep using: evidence of a lie endures,
evidence of honesty never does. Two conflicting signed heads are a
monotone fact; append anything you like and they still conflict. "The
log has been honest" is only ever true as of now. That asymmetry is why
gossip works at all, and it fell out of the classification before we
had a name for the classification. Zach's insight, which partly
inspired the question, is the middle rung of a ladder of names: a
content-addressed name fixes *what*; an *attestation-addressed* name,
the digest of content and attestation together, fixes what and *who
attested*; a position in an append-only record fixes what, who, and
*after what*.[^zach] The mechanization carries an identity instance
beside the packaging one, a hash chain of key events with the tip claim
shown non-monotone, so a reviewer can watch the same core do both.

**Science.** A reproducible result is a claim the published record
fixes and a bounded checker, a lab with the equipment, can settle. A
citation
is a pointer at the record where the claim is to be verified. A result
that cannot be reproduced from what is available is a vouch, the
authors' word, and an honest literature would grade it as one. One more
thing, and the rest belongs to a book: science has no monimograph, no
shared append-only record that a finding is entered into under a
commitment, and retraction alone breaks monotonicity. So a finding's
endurance is claimed, never judged. Draw
your own line from there.

One thread runs through all three, and I keep seeing it in science and
open source alike. A result whose inputs are withheld is a vouch, the
authors' word, and that is the reproducibility failure. A commons whose
admission is keyed to who you are converts, for everyone it excludes,
closures into vouches, and that is the open-source failure. Same
bucket, reached by two routes, withholding and identity-keyed
admission, and cured the same way: inputs in the record, and admission
by a check anyone can re-run. That is not an analogy between two
fields. It is one structure instantiated twice.

## Not Trustless. Trust Less.

The industry's answer to every supply-chain incident of the last decade
has been more of the same: more signatures, more scanners, more
dashboards. Each hides a trust decision, and the decision is the part
nobody writes down. A signature says who signed and nothing about what
that is worth to you. A scanner reports what it found and nothing about
what it could not have found. A dashboard counts what it was told to
count, and without a floor under it the number means nothing. None of
it is wrong, and all of it is anonymous trust, because the decision to
rely on it lives in someone's head, and heads are not append-only.

The discipline that replaces it is short enough to fit on a card, and
every line of it is something the calculus says you can do, not
something it says you should.

Classify before you build. Decide which of your claims must be
receipts, and shape your data and metadata so they come out as folds
over the record, because those are the claims whose proof stays the
size of a Merkle path however large the record grows. Where a claim
cannot, know which condition it fails and name the residue you carry: a
witness, a voucher, or a watcher.

Weed out anonymous trust. Admit nothing that nobody has vouched for,
so the floor is where you start rather than where you hope to end up.
Then count the distance to the ceiling and climb it, vouch by vouch,
at whatever pace you can afford.

Pay for watching on purpose. Some claims are phone calls, and you will
keep making the call for as long as you insist on them. Insist on as
few as you can, know which ones they are, and put the cost where you
can see it.

Grade your own claims. Never state a status above your backing. Checked
by machine, cited at source, vouched by a named party, or argued in
prose: those are different things, and whether a person or a model made
the claim is not one of them. A reader who cannot tell which you mean
has no way to trust you correctly. It is the only part of the
discipline anyone can check you against, and the part that makes the
rest honest.

Nothing forces any of this on you. The structure is a theorem; the
practice is a choice. Everything is a trust decision either way. The
only question is whether you make yours explicitly, and if you claim
your system is verified, or your result reproducible, or your identity
yours, the check now exists and it will be run.

## What We Claim, What We Do Not, and What Comes Next

All of this is technical, and I suspect that is the other reason nobody
gave the whole problem a structure: each piece was hard enough on its
own, and holding all of them at once looked like a philosophy project.
It is not, once the pieces are in hand: three conditions, three
residues, two marks, and a count. What takes discipline is keeping hold
of what we are actually talking about, which is not trust in the
abstract but truth, or at least the verifiable kind, and exactly where
its edges are.

Piece by piece, our contribution is small: an exhaustive bound, and two
calculi for working with claims coherently, tying together things the
fields already knew. That is how a field matures: decades of partial
understandings, each sound in its corner, until someone puts the pieces
in one place and the folklore turns out to have a shape. The shape is
what closes the book, because a count is not a matter of taste. Since
we found it, it has explained after the fact more than we have had time
to write down, and it has shaped two protocols in advance, the atom's
declare-first record and Cyphr's witness layer. Standard formulations,
a machine proof, and a structure that explains what it did not predict
and predicts what it has not yet explained: that is why we are
confident, and the only reason.

The order things happened in, since it is the only credential I have.
I found the trichotomy.
Then I built a record system to keep long AI-assisted sessions honest:
graded claims, signed entries, an append-only log, an open surface of
unbacked claims and unanswered questions. It adheres to the trichotomy;
I do not claim it is formally sound against the calculus. Using it
showed me the trichotomy alone could not account for what it had to
track, and that is where the second calculus came from. The same system
then built the paper, which carries a reviewer's guide, one row per
claim with its grade and its backing: that system projected onto the
page.

The method has a name, and we claim it as ours: claim factoring. Two
verbs. Factor: write every claim with what backs it, a check that ran,
a named witness, a derivation from other claims, or nothing, so that a
document has a visible open surface exactly as an artifact does.
Contend: send each unbacked claim to up to *n* reviewers, human or
machine, in contexts that cannot correlate, so none sees another's
verdict until you decide; what survives is backed, cut, or left open by
name. The first verb is the one nobody had, and it is why the second
was always hard: without your claims sorted by what backs them, there
is nothing to aim the cross-examination at. Its known limit is that
when reviewers converge on a general claim whose narrow form is what
each actually checked, more reviewers cannot break the tie, and the
escalation is to someone holding a different model of the problem. The
results above were reached under it, this post was written under it,
and you can run it tomorrow.

I have argued in this direction for years while most of the industry
went the other way, and I have said elsewhere that if nobody wants to
listen, I will be content not to take part. I meant it. What I will do
is point at a dated post, a paper under submission with its title on
it, and a mechanization with seven axioms, and say: check it. That is
the only kind of authority I want, and the only kind this result allows
anyone.

Thompson's moral was that you cannot trust code you did not create.
The moral that follows from the model is its complement: you can trust
exactly what you can re-run, from anyone. Closure is keyed to
re-runnability, and who you are enters the model in one place only,
the admission policy that says whose checks count. So a commons that
refuses a re-runnable check on any axis orthogonal to whether it runs,
whatever the axis, converts closures into vouches for everyone it
excludes, exactly as a proprietary policy does. Identity-keyed
admission is what makes a commons someone's business. "Show me the
code" was always the right instinct. Its grown-up form is a policy:
admit by corroboration, not by identity, and let the record say what
stands.

**We claim.** The open surface partitions exactly into given, vouched,
and anonymous. A claim admits an enduring certificate exactly when it is
determined, certifiable, and monotone, and trust is the complement with
three named factors and no fourth. The provenance floor and the total
ceiling, with the order of the climb a theorem and the distance a count.
That the cost of trust is per claim, not per record.

**We do not claim.** Anything about *degree* of trust. Delegation
between principals. Revocation dynamics. What the record does not carry:
custody, authorship, intent. That any system is broken. That science is,
formally, a monimograph; it is not, and that is the point of the book.
That the polynomial-time checker is mechanized; it is conjecture.

**The field found first.** The Merkle tree. The liveness layer under
every deployed transparency log. Computing the closure before the build.
Attestations as vouches, which in-toto and SLSA built around this
boundary without stating it.[^intoto]

Verify all you can. Then decide what to trust of what remains. What
remains has three names.

## _References_

[^lastpost]: [Nix Is Right. Its Cost Is Not.](./store-was-never-the-point), the previous piece in this series. The passage in question is in the section "CA or Bust": the boundary between the reproducible regime and the signed regime "becomes a field in the atom's metadata."

[^navier]: The dispute over credit for OpenAI's claimed Navier–Stokes result, September 2026. See [MIT Technology Review's account](https://www.technologyreview.com/2026/09/08/1143747/what-openais-latest-controversy-tells-us-about-the-future-of-math/) and [Axios's](https://www.axios.com/2026/09/08/openai-math-solution-navier-stokes-credit). I take no position on who is right; the point is that the argument is about what was posted when, and that a public record with dates is the instrument for settling it.

[^sovereign]: [Sovereign Source](./sovereign-source), "The Captive Commons," earlier in this series. It argues that the open-source commons is dying; that the four freedoms guarantee value flows out of the commons and provide no mechanism for it to flow back; that the technological wonders attributed to capitalism are the product of that decaying commons; and that software stopped being an object you hold and became a commons whose quality depends on the behavior of its participants.

[^anamnesis]: [Anamnesis](./anamnesis), "The Hacker's Ethic," also earlier in this series. It argues that the open-source commons has been captured from two directions, that a commons without an ethic is a commons without an immune system, and that such a commons will be captured by whatever force best understands how to exploit procedure.

[^apology]: Plato, [*Apology* 21d](https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0170:text=Apol.:section=21d), Fowler's translation: "this man thinks he knows something when he does not, whereas I, as I do not know anything, do not think I do either." And [23a](https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0170:text=Apol.:section=23a): the wisest is the one who "has recognized that in truth he is worth nothing in respect to wisdom."

[^thompson]: Ken Thompson, ["Reflections on Trusting Trust,"](https://doi.org/10.1145/358198.358210) Communications of the ACM 27(8), 1984. "The moral is obvious. You can't trust code that you did not totally create yourself."

[^halpern]: Joseph Halpern and Yoram Moses, ["Knowledge and Common Knowledge in a Distributed Environment,"](https://doi.org/10.1145/79147.79161) Journal of the ACM 37(3), 1990. The nearest neighbor on form: a theorem bounding which states of knowledge are attainable, over agents rather than claims, with no typed residue.

[^hirt]: Martin Hirt and Ueli Maurer, ["Player Simulation and General Adversary Structures in Perfect Multiparty Computation,"](https://doi.org/10.1007/s001459910003) Journal of Cryptology 13(1), 2000. The nearest neighbor on shape: an exact characterization, both directions, of which adversary structures are tolerable. Trust there is a set of players supplied as input, not a residue derived from a claim.

[^lampson]: Butler Lampson, ["Computer Security in the Real World,"](https://bwlampson.site/64-SecurityInRealWorld/Acrobat.pdf) IEEE Computer 37(6), 2004: "In general, it's not easy to figure out what is in the TCB for a given security policy." The closest sentence we found to the question being posed, asked of components and left as a difficulty.

[^demillo]: Richard De Millo, Richard Lipton, and Alan Perlis, ["Social Processes and Proofs of Theorems and Programs,"](https://www.cs.umd.edu/~gasarch/BLOGPAPERS/social.pdf) Communications of the ACM 22(5), 1979. The limit on verification argued as a limit on credibility, from how belief forms.

[^crosby]: Scott Crosby and Dan Wallach, ["Efficient Data Structures for Tamper-Evident Logging,"](https://www.usenix.org/legacy/event/sec09/tech/full_papers/crosby.pdf) USENIX Security 2009. "Tamper-evidence requires auditing. If the log is never examined, then tampering cannot be detected." The "someone still watching" residue in engineering form, enumerated per system. The e-voting verifiability literature does the same; see Kremer, Ryan, and Smyth, ["Election Verifiability in Electronic Voting Protocols,"](https://doi.org/10.1007/978-3-642-15497-3_24) ESORICS 2010.

[^meno]: Plato, [*Meno* 97d–98a](http://data.perseus.org/texts/urn:cts:greekLit:tlg0059.tlg024.perseus-eng1): true opinions run away like the statues of Daedalus until tied down by an account of the reason why; then they become knowledge, and abide. The word is *monimos*.

[^ct]: Ben Laurie, Adam Langley, and Emilia Kasper, [RFC 6962, "Certificate Transparency,"](https://doi.org/10.17487/RFC6962) 2013. The RFC defines two proof types, the audit path and the consistency proof, and defers detection of split views to gossip and auditors. Every deployed log since has carried some liveness layer.

[^calm]: Joseph Hellerstein, ["Complete CALM: A Coordination Criterion for Specifications,"](https://arxiv.org/abs/2602.09435) 2026, the current form of the CALM line: monotone specifications need no coordination. The correspondence with our third condition is exact over element inclusion and is stated in the paper as a correspondence, not a corollary; CALM ranges over programs and coordination, the calculus over claims and certificates, and CALM has no counterpart to the checker leg.

[^eon]: We call it EON, for eternal, offline, now, and the mechanization carries it as a corollary of the trichotomy. It and its sibling EALM, which reads "endurance is logical monotonicity" and is the third condition on its own, were the intermediate results that sharpened the question before we found the full partition. Readers who know the CAP theorem will hear an echo. We hear it too, and mark it as an analogy: the two are not mechanically tied, and we make no claim that one derives the other.

[^politics]: Aristotle, [*Politics* 1326b](http://data.perseus.org/texts/urn:cts:greekLit:tlg0086.tlg035.perseus-eng1): the best city is one that can be "easily taken in at a glance," *eusynoptos*.

[^bird]: Richard Bird, ["An Introduction to the Theory of Lists,"](https://doi.org/10.1007/978-3-642-87374-4_1) in *Logic of Programming and Calculi of Discrete Design*, 1987. The homomorphism lemma: a function on lists that respects concatenation factors into a map and a reduce. Our mechanization proves the enduring terms are exactly these.

[^tamassia]: Roberto Tamassia and Nikos Triandopoulos, ["Computational Bounds on Hierarchical Data Processing with Applications to Information Security,"](https://doi.org/10.1007/11523468_13) ICALP 2005. The logarithmic lower bound on hash-based authentication.

[^boneh]: Dan Boneh, Benedikt Bünz, and Ben Fisch, ["Batching Techniques for Accumulators with Applications to IOPs and Stateless Blockchains,"](https://doi.org/10.1007/978-3-030-26948-7_20) CRYPTO 2019. Constant-size membership proofs, under a hardness assumption in groups of unknown order.

[^fields]: Two of those with their sources, since they are the ones I have read at source. Since 2017, [Federal Rule of Evidence 902(13) and (14)](https://www.law.cornell.edu/rules/fre/rule_902) lets a qualified person's written certification stand in for a live witness when the item is a record "generated by an electronic process or system that produces an accurate result" or data "authenticated by a process of digital identification," which is to say a hash. Testimony stays where the claim reaches past the record. The committee's stated reason is expense, not our argument, so the rule reaches the same line by a different route. Pearl and Bareinboim's [non-identifiability](https://ftp.cs.ucla.edu/pub/stat_ser/r372.pdf) is the first condition, "the record does not fix the answer," in the vocabulary of causal inference.

[^dolstra]: Eelco Dolstra, Merijn de Jonge, and Eelco Visser, ["Nix: A Safe and Policy-Free System for Software Deployment,"](https://www.usenix.org/legacy/publications/library/proceedings/lisa04/tech/dolstra.html) LISA 2004. The closure is computed before the build and every dependency is built before the builder runs (p. 82).

[^atom]: [Atom: From Proof to Protocol](./atom-reforged) introduces the object; the last post's section "I Deleted the Derivation Without Noticing" says why it makes the derivation redundant. The design record, including the surety-of-source accounting that classifies every closure member fail-closed and never lets an artifact resting on an unvouched part present as fully closed, is public at [github.com/axiosoph/axios](https://github.com/axiosoph/axios).

[^zach]: [Zach Collier](https://x.com/zacharycollier). The attestation-addressed name, a digest of content and attestation together, is his. Combined with my work on source identity for packaging, it is a large part of why the question got asked at all.

[^cyphr]: [Cyphr](https://github.com/Cyphrme/Cyphr), self-sovereign identity and authentication for the internet: a principal is a genesis root, every key event and every action is individually signed, and the whole state is one Merkle root over the history, kept in an append-only log whose tree structure is itself machine-checked. The trichotomy was first worked out in Cyphr's own design record, on the split-view problem. How the protocol sits in the calculus is its own post.

[^intoto]: Santiago Torres-Arias et al., ["in-toto: Providing Farm-to-Table Guarantees for Bits and Bytes,"](https://www.usenix.org/conference/usenixsecurity19/presentation/torres-arias) USENIX Security 2019, and the OpenSSF's [SLSA specification](https://slsa.dev). in-toto signs a layout before the steps run and links as they run: the determined side of the line and the witness side, respectively, built without the line being stated.
