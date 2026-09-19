+++
title = "Copyback"
description = "If You Profit from the Commons, You Owe Value Back"
date = 2026-07-14
tags = ["axiosophy", "open-source", "freedom", "commons", "sovereign-source", "copyback", "licensing", "ai"]
+++

> _"The great irony is that all these machinations of institutional decay are fragile. They depend on silence."_ — [Anamnesis, §IX](/blog/anamnesis)

## I. Their Turn to Click "I Agree"

For forty years, they made us click "I agree."

Every install, every update, every account: a wall of text nobody read, written by lawyers nobody hired, binding everybody who wanted to participate in modern life to terms they never negotiated. The EULA, the ToS, the clickwrap — the instruments of an asymmetry so total we stopped noticing it. One side writes the terms. The other side clicks.

This piece announces the inversion. It is called **copyback**, and its gloss is twelve words long:

> **Copyback: if you profit from the commons, you owe value back — code, compute, or cash.**

If you're an individual, a small business, a nonprofit, a researcher — this asks nothing of you that copyleft hasn't asked for forty years. Run the code. Study it. Share it. Modify it. Nothing registers, nothing reports, nothing is owed. The freedoms are yours, unconditionally, at any scale below the threshold where extraction begins.

But if you are a hyperscaler wrapping the commons in a managed service, a platform monetizing infrastructure you did not build and do not sustain, or an AI lab distilling forty years of commons labor into proprietary weights — then, for the first time, the terms run in the other direction. Your deployment is your signature. Your training run is your signature. The conduct that takes the benefit is the conduct that accepts the obligation — the same doctrine your own lawyers built to bind us to your terms,[^eula-doctrine] pointed, at last, the other way.

The instruments exist. They are drafted, reviewed, and published alongside this piece: a license, an agreement, an ethic, and the tooling to adopt them.[^repo] This piece is the why. The documents are the how. And the why begins with a correction to the most basic map we carry of our own economy.

## II. The Dichotomy That Hides the Theft

Ask the culture war what economic system we live under and you will get two answers, each certain, each wrong. One side says capitalism — and defends it or indicts it accordingly. The other side says capitalism — and demands its replacement with state command. Forty years of politics have been fought between these two answers.

Neither describes where you live.

The system we actually inhabit has a more precise name: **extractivism.** Its signature is not the market and not the plan; it is the funnel. Value is produced at the edges — by workers, by researchers, by volunteers, by the commons — and funneled to a handful of entities positioned at the chokepoints, through a relationship between large states and large firms so reciprocal that calling it either "public" or "private" misses the point of the arrangement.

The receipts are public, and they stack three layers deep.

At the foundation: the technologies themselves. The internet was DARPA. GPS was the Defense Department. The multi-touch screen, the voice assistant, the algorithm that became Google — public research funding, all of it, converted into private moats and celebrated afterward as garage genius.[^mazzucato]

Above that: the money. After 2008, the central banks of the developed world created new money on a scale with no precedent in history — Yanis Varoufakis counts thirty-five trillion dollars printed between 2009 and 2023; the Federal Reserve's balance sheet alone went from $0.9 trillion to nearly $9 — to save the financial system. That torrent of nearly-free capital had to land somewhere, and, as Varoufakis argues, one sector proved uniquely able to convert it into capital goods: the platforms, the data centers, the cloud. Not by conspiracy — by his own account the convergence was accidental. The result is not accidental at all: the public's money built the machines, and the public rents access to them now, forever.[^varoufakis]

And at ground level: the subsidies. States and municipalities bid against each other to hand billions in tax abatements to the wealthiest firms in human history — ten states now lose over $100 million a year each, and states' own auditors find they recover as little as fifty-two cents on the dollar — for data centers that employ almost nobody. While the software running inside them was written, in staggering proportion, by unpaid volunteers.[^gjf]

That last clause is the one this piece exists to address. Because beneath the public research and the public money and the public subsidies, there is a fourth subsidy, the largest and least acknowledged: **the commons itself.** An $8.8-trillion foundation of software,[^oss-value] built by people who were never paid, maintained by people who are burning out, governed by institutions that have been captured, and strip-mined by the exact firms the other three subsidies enriched.

Neither capitalism's defenders nor its critics can see this clearly, because both are arguing about a system that isn't the one running. The extractors are not capitalists in any sense Adam Smith would recognize — they do not compete, they enclose. And the remedy is not the state — the state is the extraction's senior partner. The fight is not left versus right. It is **the funnel versus the commons.**

## III. What We Forgot

The commons is the oldest social technology our species possesses, and the most thoroughly forgotten.

Consider what it actually does. The capitalist and the communist can't agree on what an economy is for — and both drove here on the same roads, speak the same language, and route their manifestos over the same protocols. That is the commons working: it is the cooperation layer beneath ideology, the mechanism by which people with incompatible ends coordinate their means. You do not have to agree with your neighbor about God or property to share a well with him. For most of human history, you did share the well — and the pasture, and the irrigation channel, and the forest — under rules your community enforced, because the alternative was that everyone starved separately.

Elinor Ostrom won a Nobel Prize for demonstrating that this was not a fairy tale.[^ostrom] Where a handful of design principles held — boundaries, proportionality, collective choice, monitoring, graduated sanctions — commons persisted for *centuries*: Swiss alpine meadows documented since 1224, Spanish irrigation tribunals running since the tenth century. The "tragedy of the commons" is real only where the commons is left ungoverned. Governed commons are among the most durable institutions humans have ever built. We did not lose the commons because it failed. We lost it because it was taken.

The taking has a name, and the name has a history. English law once recognized **rights of common** — not metaphors, but enforceable legal entitlements held by ordinary people in land they did not own: pasture for their animals, estovers of wood, turbary for fuel. The Charter of the Forest, sealed in 1217 beside Magna Carta, guaranteed them.[^charter] Then, over four centuries of enclosure acts, those rights were extinguished — the hedges went up, the commoners became laborers, and the process was recorded by its beneficiaries as *improvement*. Legal scholars now call our own era's version the **second enclosure movement**: the fencing of the intangible commons — knowledge, culture, code — by an ever-expanding perimeter of intellectual property.[^boyle]

Software found a partial answer to the first wave of digital enclosure, and it was a work of genius: **copyleft**. Stallman took copyright — the enclosure instrument itself — and inverted its polarity, using the exclusive right to guarantee openness instead of restriction. It worked. It built the largest commons in human history. And it protected exactly what it was designed to protect: *the copy*. What it could not protect — what nothing in its legal machinery could even see — was the commons around the copy: the maintainers, the governance, the feedback loop between value taken and value returned. The previous two pieces in this series documented, at length, what happened in that blind spot.[^series]

So the sequence completes itself. Copyright enclosed the work. Copyleft freed the copy. **Copyback restores the right of common** — the entitlement of those who sustain a shared resource to a proportional return from those who profit by it. Eight hundred years after the Charter of the Forest, the commoners are writing their charter again. This time it compiles.

This piece is the third movement of a promise made twice. [*Sovereign Source*](/blog/sovereign-source) derived the freedoms — the nine structural conditions a software commons needs to survive, four for the artifact and five for the commons itself. [*Anamnesis*](/blog/anamnesis) derived the ethic — the obligations, tenets, and refusals that keep those freedoms alive, recovered from the movement's own amputated history. Both pieces ended with the same admission: freedoms without enforcement are rhetoric, and an ethic without an instrument is a wish. Today the instrument exists.

## IV. The Mechanism

Everything in the framework descends from one design invariant, so I'll state it up front: **this is a positive-incentive structure, not a punishment regime.** The instruments exist so that lawsuits never get filed. Success isn't judgments won; it's a gradient where, for every actor at every scale, contribution is simply the cheapest rational choice. The gate exists so the gradient can do the work.

Here's the machinery.

**Two grants.** The Open Grant is classic copyleft, for everyone, forever: run, study, share, modify, with source reciprocity when you serve modified versions over a network. Below the scale threshold, that sentence is the entire framework. The license says so in language nobody can pretend to misread: no copyback, no registration, no reporting, no fees.[^ocl-small] The Scale Grant is where the new law lives: commercial deployment at scale, reimplementation from study, and AI training are licensed *on condition* of accepting the Open Commons Agreement — and for a scale actor who never accepts, those acts are not breach of contract. They are unlicensed, full stop.

**The threshold is derived, not decreed.** Copyback scales superlinearly with deployment, which means small scales round to zero by construction — the curve itself exempts the little guy. The visible threshold (default: ten million dollars of group revenue, or a deployment-scale materiality point, whichever trips first) simply makes the curve's zero-region legally legible, so no one has to wonder. And the group is measured honestly: shell companies aggregate upward, a giant's obligations can never be laundered through a small front — and a startup is never made a "scale actor" by the size of its investors. The obligation routes up. It never routes down.

**Discharge is a menu, not a toll.** Copyback can be paid in upstreamed code, staffed engineering on priorities the commons sets, infrastructure, compute, documentation, security auditing — or money, which is deliberately just one item on the list. Standard items are valued by a published rate card; bespoke offers get deadlines and appeals; and none of it, ever, buys voice. Discharge purchases a license in good standing. Governance is not for sale at any layer of indirection.

**The rug-pull is structurally impossible.** Every relicensing betrayal of the last decade — every project that sold its community's work out from under it — required one precondition: concentrated copyright, harvested through CLAs and assignment agreements. The Open Commons License makes that concentration *void by its own terms*. Contributors keep their copyright. The steward owns nothing. There's no one to buy, no one to pressure, and no pen that can sign the community's work away. The Linux kernel has this property by accident of history; every Open Commons project has it by law.[^no-cla]

**Three bodies of law, one system.** Copyright carries the conditions — that is settled ground.[^jacobsen] Contract carries what copyright can't touch: the copyback schedule, the audits, the governance obligations, with the commons itself expressly named as the beneficiary entitled to enforce. And patents, where a commons holds them, reach the one actor neither copyright nor contract can: the clean-room reimplementer. There is no separate patent license to buy. Nobody re-derives the work without opening up.

**Acceptance is conduct.** The notice travels in every file of every copy — strip it and you've violated the license; mirror it and the notice arrives intact. Deploy at scale, train a model, build a competing implementation from study, and you have accepted the agreement by the same legal mechanism that enforced forty years of shrinkwrap and clickwrap against the rest of us.[^commonswrap] We call the mechanism **commonswrap**. Their doctrine. Our direction.

And when someone violates anyway? Notice. Cure. Reinstatement. The published non-compliance log, so the default is visible. Termination only for the unrepentant, and even then the road back is discharge, not exile. Ostrom's finding was that in commons that survive centuries, the graduated sanctions are almost never invoked — their function is assurance, the guarantee that cooperators are not suckers. That is the posture. The teeth exist so they never have to bite.

## V. The AI Hinge

Now the part of the argument that couldn't have been written five years ago and can't responsibly be skipped today.

The weights of every frontier model are, among other things, a consolidation of the commons' memory. Forty years of code — patterns, idioms, bug fixes, architecture, the crystallized judgment of a million maintainers — compressed into parameters and sold back to us by the token. Stallman built copyleft along copyright's grain: *copying obligates*. Copyback is built along contract's grain, for the era in which the commons' most voracious readers are machines: **training obligates — and stewardship discharges.**

The mechanism inherits everything from §IV. Training on covered works owes copyback, dischargeable like anything else: in compute, in inference credits, in money, in code. But one component of every training discharge is non-waivable: **provenance disclosure.** What commons code went in, what filtering was applied, what attribution survives. No amount of compute or cash buys total opacity. This clause is doing deliberate work far beyond software: the great unsolved problem of AI governance is that model auditability is structurally disincentivized — no lab volunteers its training-data receipts, no regulator has compelled them, and self-report is worthless because the reporting system and the reported system are the same system.[^audit] Someone outside the building has to hold the receipts. The commons — the single largest supplier of training data on earth — just became someone outside the building.

Two rules close the obvious exits. **The obligation follows the model**: train while small, get acquired, deploy to a hundred million users — the copyback attaches at deployment, whoever deploys, whenever. Weights do not launder. (An innocent deployer of notice-stripped weights gets notice-then-comply, never retroactive liability; the gap is billed to whoever stripped the notice.) And **retention bridges to training**: feeding commons code to a model at inference time is deployment, not training — but the moment your retained inference logs feed the next training run, they are training input, and your retention practices sit inside the audit scope. "We only ingested it" is a sentence with an expiration date.

I want to be equally honest about the other side of this clause, because the commons has its own reckoning due. The agreement affirms, as contract, that AI-assisted contributions are the contributor's own — judged by correctness, provenance, and compliance, *never by the method of their authorship*. This is not a concession. It is a correction. The open-source community has spent three years performing contempt for these tools — deriding "slop" as though slop were a property of machines rather than of carelessness, as though humans never shipped garbage — while the actual extraction proceeded unopposed. Slop is a quality failure; quality is a methodology question; and a commons that polices *origin* instead of *structure* has lost the vocabulary of freedom and will not notice its own capture. Worse: the commons is the only constituency on earth with both the standing and the leverage to contest AI's consolidation of power, and it has been spending that position on aesthetic purity. Abstinence is not resistance. It is unilateral disarmament dressed as virtue. Copyback's AI clause is what contesting actually looks like: engagement, with terms.

## VI. The Instruments

Five documents, published today as versioned release candidates. One paragraph each; the texts are canonical, the summaries are courtesy.[^repo]

**The Open Commons License (OCL)** carries the grants: the Open Grant that is classic copyleft for everyone below scale, the Scale Grant that conditions deployment, reimplementation, and training on the agreement, the patent layer, and the acceptance-by-conduct machinery. Drafted from first principles — zero inherited text — against verified case law, with every contested doctrine flagged in the open.

**The Open Commons Agreement (OCA)** is the contract: one multilateral instrument that binds every participant in the role they occupy — contributor, steward, scale actor — because a commons is not a vendor relationship, it is a polity. It carries the copyback schedule mechanics, the audits, the discharge rate card — and, at equal length, the constitution that constrains the commons' own government: transparency by default, concentration caps that no employer can hire around, a conduct firewall with a classification ruling that kills the oldest trick in governance capture (reclassifying technical dissent as behavioral violation — the maneuver has a documented body count[^rust]), two-key appointment of independent arbiters, and steward fiduciary rules borrowed from the strictest corner of trust law: recusal on the mere appearance of conflict, and per-se voidability of self-dealing where good faith is not even a defense. The **eternity clause** locks the immune system itself — transparency, the firewall, the caps, the no-CLA rule, the right to organize, arbiter independence — behind near-unanimity. A supermajority can tune the parameters. It can never blind the sensors.

**The Open Commons Ethic v2** is the spirit the letters serve — six tenets, six refusals, one imperative, each traceable to a documented failure. It is the direct descendant of a document I published in 2024, before any of this research existed, and its version history says so honestly: the instinct was right; its derivation did not yet exist. It binds every participant in every role — and it carries no enforcement machinery of its own, because an ethic with its own tribunal is how codes of conduct became parallel power structures. It is jurisdictionally humble by design: it governs interaction with the commons and nothing else. Not your politics, not your beliefs, not your character as others judge it. That is not moral relativism. It is jurisdiction.

**The Schedule** is where each commons sets its parameters — thresholds, rates, deadlines, tiers — because a solo maintainer's library and an ecosystem-scale platform are not the same polity, and pretending otherwise is how one-size-fits-all governance dies on contact with reality.

**The source header** is the notice that travels with the work — every file, every mirror, every training corpus that ingests it a million times. For human readers it is a courtesy. For machine readers it is the evidentiary backbone of commonswrap: a model trained on the commons has read the terms more times than any lawyer in history.

One more thing about where these documents come from, because it isn't a weekend's cleverness. This framework is the far end of a road that runs back years and starts much further down: in foundational philosophy I had to build for myself when the existing vocabulary kept failing, through the diagnostic work of an entire trilogy, through the published structural analysis of the commons' capture that the last two pieces in this series carried out — and before any of that, in the personal education of getting banned from hyper-ideological communities for saying true things. That's a curriculum you don't forget, and it can't be faked. The instruments themselves were then forged the way anything load-bearing should be: against adversaries. Throughout drafting they were subjected to hostile review — counsel simulations, capture engineering, doctrine audits — by reviewers whose only mandate was to break them, and I won't pretend the process was flattering. It caught quietly weakened protections. It caught definitions that didn't exist. Once it caught a false claim I made about my own earlier document — disproven the moment someone fetched the primary source I hadn't. Self-report failed; verification caught it. That's §V's auditability thesis demonstrated on its own author, and it's why the discipline is written into the instruments rather than trusted to anyone's character, including mine.

## VII. What This Is Not

A framework that demands honesty of others had better model it. The claims we are *not* making:

**It is not open source, above the threshold.** Below it, the four freedoms verbatim. Above it, the OSD would say no — and rather than lobby to stretch a definition, we state the departure and the price we paid it for. The definitions that could not defend the commons do not define this framework.

**It is not GPL-compatible** at the derivative-work level, said here before a critic says it. Aggregation is fine. Fusion is not. The FAQ answers the SSPL comparison at length — short version: the SSPL was one nuclear demand enforced through copyright alone; copyback is proportional, dischargeable, scale-gated, and enforced through three coupled layers with cure at every step.

**It is not retroactive.** Code already distributed under prior licenses — including every scrape already sitting in a training cache — is beyond reach. Adoption protects from adoption forward. Adopt at inception if you can.

**It is not omnipotent.** Contract cannot reach the disciplined clean room — only patents can, and only where a commons has filed them. Contract cannot reach influence-adjacent spending: the sponsored conference, the funded advocacy. We name the limits rather than sell you their absence.

**It is not settled law.** The condition architecture stands on verified precedent; the conduct-assent doctrine has enforced worse against better for decades; the damages structure follows a benchmark a court has already accepted. But no court has yet held anyone a third-party beneficiary of a copyleft instrument — the case that will move that doctrine goes to trial this August[^vizio] — and AI fair-use doctrine is visibly in motion. Attorney review is underway. And every untested edge is flagged inside the instruments themselves — [COUNSEL], in the text, at the exact clause — because you deserve to know where they are before opposing counsel enjoys the surprise.

**It is not finished.** These are v1.0 release candidates, open for public comment, versioned like the software they protect. Under the framework's own ethic, a discovered loophole is a defect to disclose, and its knowing exploitation is defection. Five hostile reviews shaped these instruments before you ever saw them. Be the sixth. Refute this framework by gaming it, and we will fix what you find and thank you in the changelog.

**It is not unprecedented, and credit is owed.** Bruce Perens's Post-Open saw the same structural truth — license plus contract, scaled obligations — years ago, and its struggles taught this design real lessons. The copyfair and Peer Production License theorists mapped reciprocity licensing a decade before that. The Commons Clause, the BSL, the SSPL each probed a wall of the same prison. The differences here — the dual-state design, the in-kind discharge, the third legal layer, the governance constitution, the AI clause — are answers to *their* hard-won failures, which is the only way anything real gets built.

## VIII. Why I Have to Build This

[*Sovereign Source*](/blog/sovereign-source) opened with why I had to see this clearly: because I spent a decade inside the commons, watched its institutions get captured from within, and paid personally for saying so. This piece ends with the harder half of that sentence. Seeing is not enough. I am building infrastructure I intend to matter — and I have watched, in documented detail, what happens to infrastructure that matters when its defenses are made of goodwill.

Let me be concrete, because the stakes aren't hypothetical for me. I've been thinking about the problems of software composition for over a decade, and working on this one problem specifically for more than three years. The result is the system my [last piece](/blog/store-was-never-the-point) described at the level of ideas, and it is the reason this framework had to exist *now*, finished, before launch — not promised for later. I know what that work is worth. I know exactly which firms will want to wrap it, fork it, absorb it, and strip-mine whatever community forms around it, because I've spent two full essays documenting what they did to everything else worth taking. It launches under this framework from its first release. Not as a legal experiment — because in the environment it's entering, nothing weaker is worth signing.

My projects will not be captured like all the rest, and I am no longer willing to rely on the restraint of extractors or the vigilance of the exhausted to guarantee it. The defense now exists before the extraction arrives. That has never once been true in the history of this movement.

I owe the reader one provenance note. The analytical framework beneath this series — the entropy-grounded ethics I call axiosophy — is my own philosophy, and it's how I *found* these conclusions. It is not why you should accept them. Everything above stands on Ostrom's evidence, the documented capture record, verified case law, and instruments you can read and attack yourself. The philosophy was the discovery path. The receipts are the argument.[^axio]

Eric Hoffer said every great cause begins as a movement, becomes a business, and degenerates into a racket. Open source ran that arc in forty years, and the racket now runs on our code, our labor, our burnout, and our silence. But Hoffer only described the descent. Nothing forbids the return trip — a racket, seen clearly enough, can be made into a movement again. That is what this is. The commons is old law, older than copyright, older than the corporations, older than the states that subsidize them. We are not asking for something new. We are remembering something ours.

So: the instruments are published. The FAQ answers your reservations, the guide walks your adoption, and the deed fits on one screen. Adopt it, attack it, or improve it; all three help.

For forty years, they made us click "I agree."

Your turn.

**Copyback: if you profit from the commons, you owe value back — code, compute, or cash.**

Not free software. Not open source. Sovereign source.

[^eula-doctrine]: The conduct-assent doctrine: *Register.com, Inc. v. Verio, Inc.*, 356 F.3d 393 (2d Cir. 2004) — knowledge of terms plus repeated taking of the benefit binds, "regardless whether he did or did not say, 'I agree.'" Applied to FOSS specifically in *Artifex Software v. Hancom* (N.D. Cal. 2017): using dual-licensed software without the commercial license *was* assent to the GPL, no signature required. [DRAFT NOTE: final citation format pass pending.]

[^mazzucato]: Mariana Mazzucato, *The Entrepreneurial State* (2013). Verified examples: ARPANET/internet (DARPA, NSF), GPS (DoD), multi-touch (NSF- and CIA-funded research at Delaware → FingerWorks → Apple), Siri (DARPA's CALO project via SRI), and Google's PageRank algorithm (NSF Digital Library Initiative grant — documented by NSF itself under the title "On the Origins of Google").

[^varoufakis]: Yanis Varoufakis, *Technofeudalism: What Killed Capitalism* (2023); the $35T figure is his, from "Quantity to Quality" (New Left Review, Sidecar, Nov. 2024): "capitalist states printed $35 trillion between 2009 and 2023." Documented G4 central-bank balance-sheet expansion 2008–2022 is ~$20–25T; the Fed's $0.9T→$8.97T is the hard anchor. His mechanism — Big Tech as the only sector able to convert the torrent into capital goods — is presented as his argument; the technofeudalism thesis is contested (see Snow in *Jacobin*; Morozov).

[^gjf]: Good Jobs First: "Money Lost to the Cloud" ($2B+ in state/local data-center subsidies to the five giants; eleven megadeals averaging $1.95M per job); Amazon's Morrow County, Oregon deal (~$1B over 15 years against a ten-job minimum); ≥10 states each losing >$100M/year in data-center tax exemptions by FY2025; state auditors' own ROI findings of 52–70¢ recovered per subsidy dollar.

[^oss-value]: Hoffmann, Nagle & Zhou, "The Value of Open Source Software," Harvard Business School Working Paper 24-038 (2024): $8.8T demand-side replacement value. Same figure cited in [*Sovereign Source*](/blog/sovereign-source).

[^ostrom]: Elinor Ostrom, *Governing the Commons* (1990): Törbel (documented since 1224), the Valencia irrigation tribunal (10th century), and the eight design principles validated across them.

[^charter]: The Charter of the Forest (1217). The rights of common — pasture, estovers, turbary — were enforceable entitlements of non-owners, guaranteed alongside Magna Carta and eroded by the enclosure acts over the following centuries.

[^boyle]: James Boyle, "The Second Enclosure Movement and the Construction of the Public Domain," 66 *Law & Contemporary Problems* 33 (2003).

[^series]: [*Sovereign Source: The Captive Commons*](/blog/sovereign-source) (the freedoms; the broken feedback loop; the SaaS gap; the extraction patterns) and [*Anamnesis: The Hacker's Ethic*](/blog/anamnesis) (the two capture vectors; the tenets and refusals; the definitional crisis).

[^ocl-small]: OCL §1.6: "if You are not a Scale Actor, Deployment — including commercial Deployment — is licensed by this Article unconditionally. Below the Scale Threshold there is no copyback obligation, no registration, no reporting, and no fee."

[^no-cla]: OCL §5.3: "Contributions are licensed, never assigned… Any such requirement, and any instrument executed under it, is void as against this License. The Steward acquires no ownership of any Covered Work."

[^jacobsen]: *Jacobsen v. Katzer*, 535 F.3d 1373 (Fed. Cir. 2008): open-source license conditions are enforceable in copyright, not merely as contract covenants — with the Ninth Circuit's nexus limit (*MDY Industries v. Blizzard*, 629 F.3d 928) honored in the drafting: every condition intended to carry copyright remedies is scoped to the reproduction, modification, and distribution grants themselves.

[^commonswrap]: The notice architecture is drafted to the modern standard: *Berman v. Freedom Financial Network*, 30 F.4th 849 (9th Cir. 2022) — reasonably conspicuous notice plus an explicit statement of the conduct's legal significance. See OCL Art. 3.

[^audit]: The structural argument: interpretability and auditability are cost centers that create liability surface and leak competitive moats, so the incentive gradient points uniformly toward opacity; auditability must be structurally required because it will not be volunteered. Self-report fails because weights are not legible as text and the reporting system is the reported system. [DRAFT NOTE: this footnote may grow a pointer to the fuller treatment when that piece publishes.]

[^rust]: See [*Anamnesis*, §IV](/blog/anamnesis) — the Rust moderation-team resignation, the Vagg case, and the documented pattern of technical dissent reclassified as behavioral violation.

[^repo]: Canonical repository: [URL — pending the org/domain decision; currently github.com/nrdxp/open-commons, private until release]. Instruments, deed, FAQ, Adopter's Guide, Schedule template, and source header.

[^vizio]: *Software Freedom Conservancy v. Vizio* (Cal. Super. Ct., Orange Cty.), trial set for August 10–19, 2026. Accurately stated: the third-party-beneficiary theory has repeatedly *survived* — remand, summary adjudication — but has never affirmatively *won*; no court has yet held anyone a third-party beneficiary of a copyleft license. The Open Commons instruments name their beneficiaries expressly, which is a materially stronger posture than GPLv2's silence — and still untested.

[^axio]: The trilogy: [*Axiosophy*](/blog/axiosophy), [*Constructive Nullification*](/blog/Constructive_Nullification), [*The Counterfeit*](/blog/the-counterfeit). For readers who want the derivation behind the diagnosis; nothing in this piece depends on accepting it.
