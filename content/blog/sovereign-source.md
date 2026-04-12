+++
title = "Sovereign Source"
description = "The Captive Commons"
date = 2026-04-05
[taxonomies]
tags = ["axiosophy", "open-source", "freedom", "economics", "commons", "sovereign-source"]
+++

> _"Every great cause begins as a movement, becomes a business, and eventually degenerates into a racket."_ — Eric Hoffer

## I. Why I Had to Build This

The four freedoms of free software are intact. Every one of them.[^fsf] You can run any GPL'd program for any purpose, study its source code, redistribute copies, and distribute modified versions. Forty years of legal infrastructure protect these rights. They are enforceable, recognized, and sound.

And the commons they were built to protect is dying.

Sixty percent of its maintainers are unpaid. Seventy-three percent report burnout. In 2024, a solo maintainer's exhaustion nearly let a state-level attacker backdoor the compression library embedded in virtually every Linux distribution on earth. The estimated value of this commons to the global economy is $8.8 trillion. Its annual funding is a rounding error on a rounding error.

The freedoms guarantee that value flows _out_ of the commons. Anyone can take the code, deploy it, build on it, train a model with it. They provide no mechanism, none, to ensure that value flows back in. That gap is not a policy failure. It is a structural one, and this piece is the account of why.

I built the tools to explain it because I needed them. I spent ten years inside the open-source commons: writing packages, maintaining infrastructure, reviewing pull requests at hours no sane person should be awake.[^background] Then I watched the commons I helped build get captured from inside its own institutions. Governance committees seized by people who had never shipped a patch. Behavioral codes weaponized to silence the engineers who objected. And when I said so publicly, the cost was personal: my career, my reputation, my family's stability. Not because I was wrong. Because I dissented.[^standing]

The self-appointed champions of the disadvantaged smacked down someone from precisely the background they claim to protect. I am currently surviving on a fraction of my previous salary, kept afloat by a client who recognized my skillset. The stability I spent years building was traded for the crime of speaking plainly.[^consequences] I would pay the cost again. They expected me to cave. My own difficult upbringing taught me young that staying quiet is its own form of miserable hell, one I will not suffer again, and one I will not condemn my children to.

That would have been enough to make me angry. It was not enough to make me build what I built. What pushed me further were encounters with institutional corruption that had nothing to do with software, personal upheavals that forced me to confront why systems designed to protect people so consistently produce the opposite of their stated purpose.[^personal] Together, they compelled a descent to first principles: a three-part series that grounded ethics not in preference or consensus but in the structural constraints that entropy imposes on any complex system.[^trilogy] I called the framework _axiosophy_: ethics from the axioms of physics, not from the opinions of philosophers.[^axiosophy-link]

From those constraints I derived a diagnostic tool: _structural inversion_.[^si-explain] That tool is the engine of this piece. I built it because I needed to understand what happened to open source. Now I can say what the problem actually is.

It's not the corporations. It's not the governance committees. It's not the codes of conduct. Those are symptoms. The problem is the axioms.

The four freedoms were formalized between 1986 and 1999, and they were correct for the world they described: a world where software was a thing on a disk that you could hold in your hand.[^history] That world is gone, and the four freedoms, while still necessary, are catastrophically incomplete. They protect the artifact. They do not protect the commons. This piece identifies the structural gap, derives the conditions the original four fail to cover, and states a set of expanded freedoms that any developer can verify against their own experience.

And it matters beyond software, because the wonders of the internet era, the ones that modern society attributes to capitalism, are in reality the product of this decaying commons. Capitalism did not build the internet. The commons did. Capitalism showed up with a credit card and a term sheet. And if the commons dies, capitalism cannot replace it, because capitalism doesn't even understand what it is.

[^background]: For the longer version of that story, see [Twelve Years as a Digital Hermit](/blog/12-years). The short version: no degree, no connections, no safety net. Everything I built in this industry was built from the commons itself.

[^standing]: I'm not going to retell the full NixOS story here. The broader context spans several pieces: [In Defense of the Disagreeable](/blog/in-defense-of-the-disagreeable), [Twelve Years as a Digital Hermit](/blog/12-years), [Political Bikeshedding: NixOS Edition](/blog/nixos-policy-breakdown), and [The Closing of Open Source](/blog/closed-openness). This piece assumes familiarity with none of them.

[^consequences]: I could have stayed quiet and been sitting comfortably by now, with a cushy salary and a sizable amount of equity. That was the deal on offer. The price was my silence and my integrity. Some deals are too expensive at any price.

[^personal]: See [Letter to My Children](/blog/letter-to-my-children) for the only public account I've given. It is not a full account.

[^trilogy]: A three-part series: [_Axiosophy_](/blog/axiosophy), [_Constructive Nullification_](/blog/Constructive_Nullification), and [_The Counterfeit_](/blog/the-counterfeit). The third applies structural inversion to economics (the Cantillon Effect), governance (Procedural Supremacy), and moral philosophy, demonstrating that structural inversion is the dominant failure mode of modern institutions. This piece does not require having read them. Where I need their tools, I'll explain them here. Where I need their conclusions, I'll say so and link to the derivation.

[^axiosophy-link]: To be clear: I'm not claiming that physics tells you what to do. I'm claiming that physics tells you what _must be the case_ if a complex system is to persist. The formal derivation begins from Shannon entropy as a measurable constraint and builds, through conditional necessities, to a set of structural obligations that any persisting complex system must satisfy. The "ought" is conditional, not categorical: _if you wish your society to survive, then these conditions are not optional_. See [_Axiosophy_, §I–III](/blog/axiosophy#part-i-foundations) for the full chain and why this escapes the naturalistic fallacy.

[^si-explain]: Structural inversion: a mechanism designed to protect X is weaponized to suppress X, while X itself is maintained as a rhetorical trophy. The three-step pattern is: **Hollow** the substance of the right, **Substitute** a procedural replacement that performs the function of protection without providing it, and **Preserve** the rhetorical surface so the right appears to still exist. In its specifically legal form — where procedural mechanisms neutralize legal protections — I call it _constructive nullification_; see [_Constructive Nullification_](/blog/Constructive_Nullification) for the formal apparatus. For the general pattern, see [_The Counterfeit_, §V–VI](/blog/the-counterfeit#v-the-structure-of-inversion).

[^fsf]: Richard Stallman, [_The Free Software Definition_](https://www.gnu.org/philosophy/free-sw.html), first published in _GNU Bulletin_ Vol. 1 No. 1 (1986), refined through 1999. Freedom 0: to run. Freedom 1: to study and change. Freedom 2: to redistribute copies. Freedom 3: to distribute modified copies.

[^history]: The formalization was iterative. The 1986 version stated two principles (share and change). By 1996, three freedoms were explicit. Freedom 0 was added in 1999 when reviewers realized the right to _run_ the program for any purpose had been assumed but never stated. The freedoms were designed for a world of tapes and floppy disks. They were brilliant for that world. See [The Free Software Definition: History](https://en.wikipedia.org/wiki/The_Free_Software_Definition).

## II. The Object and the Commons

When Stallman formalized the freedoms, software was an object. You could hold it. It came on a tape, or a disk, and you installed it on your machine, and it ran on your hardware. The question of what you could _do_ with it was a question about your relationship to that object, and the four freedoms covered that relationship completely.[^era]

That question made sense in 1986. It makes less sense now, and not because software has become more complex or corporations more aggressive, but because the _category_ has changed. Software is no longer primarily an object you possess. It is a commons you participate in.

An object is something you hold. A commons is a shared resource whose quality depends on the behavior of its participants. A loaf of bread is an object. A community oven is a commons. The difference matters because the governance requirements are fundamentally different. You can protect an object with property rights. You cannot protect a commons with property rights alone, because the commons has a maintenance budget, a governance structure, and a set of participants whose behavior affects everyone else. Elinor Ostrom spent her career proving this, and won the Nobel Prize for it.[^ostrom]

Software-as-code is non-rivalrous. Copying a binary costs nothing. My use of your library doesn't degrade your copy. The four freedoms correctly identified this property and built their protections around it. But software-as-ecosystem is deeply rivalrous. _Maintainer attention_ is rivalrous. _Governance seats_ are rivalrous. _Network position_ is rivalrous. _Security auditing capacity_ is rivalrous. When a cloud provider wraps your project in a managed service and captures the revenue, they haven't degraded your copy of the code. They've degraded your capacity to sustain the ecosystem that makes the code worth using.[^rival]

The freedoms protected what software _was_. They do not protect what software _is_.

Here is the structure of the problem, and to see it clearly you need to think about arguments the way you think about any complex system: in layers. Every argument has a rhetorical layer (what is _said_), a procedural layer (what is _done_), and a moral or structural layer (what is _actually true_ underneath).[^prism] Think of it as depth-testing: is the rhetoric consistent with the procedure? Is the procedure consistent with the underlying structural reality? When these layers diverge, you're looking at structural inversion, and you can map the distance between them with precision. I developed a formal version of this analysis in a previous piece, but the core idea is just honest engineering: check the surface against the substrate. Trust neither on its own.[^counterfeit-prism]

Apply that to open source:

- **What's said (rhetorical):** The four freedoms guarantee software freedom. They are intact. You can run, study, share, and modify any GPL'd program exactly as Stallman intended.
- **What's done (procedural):** Governance, economics, and infrastructure operate according to rules that the freedoms do not address. Who decides the project's direction. Who gets paid. Who controls the registry, the CI, the hosting. None of this is covered.
- **What's structurally true (moral):** The conditions for the commons to persist, whether the feedback loops exist, whether governance is capturable, whether the freedoms can actually be _exercised_ by the people who nominally hold them, are not even acknowledged.

The surface is intact. The substrate is eroding. The gap between them is where the commons is dying.

[^era]: For a thorough account of this transition, see the Ford Foundation's [_Roads and Bridges: The Unseen Labor Behind Our Digital Infrastructure_](https://www.fordfoundation.org/wp-content/uploads/2016/07/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure.pdf) (2016).

[^ostrom]: Elinor Ostrom, [_Governing the Commons_](https://www.cambridge.org/core/books/governing-the-commons/A8BB63BC4A1433A50A3FB92EDBBB97D5) (1990). Ostrom identified eight design principles that sustainably governed commons share: clearly defined boundaries, proportional equivalence between benefits and costs, collective-choice arrangements, monitoring, graduated sanctions, conflict resolution, minimal recognition of rights to organize, and nested enterprises. Validated across centuries-old irrigation systems, fishing communities, and grazing commons. Applied to open source, the four freedoms address none of these. Not one. See also Hess and Ostrom, [_Understanding Knowledge as a Commons_](https://mitpress.mit.edu/9780262516037/understanding-knowledge-as-a-commons/) (2007).

[^rival]: The Harvard/Linux Foundation [Census II](https://www.hbs.edu/news/releases/Pages/census-open-source-software-security.aspx) found that 136 developers were responsible for 80% of the lines of code in the top 50 packages. A subsequent study estimated the demand-side value of open-source to the global economy at [$8.8 trillion](https://www.reddit.com/r/programming/comments/1jg9y1v/harvard_study_open_source_has_an_economic_value/). The labor that sustains this value is overwhelmingly uncompensated.

[^prism]: I developed a formal version of this layered analysis in [_The Counterfeit_](/blog/the-counterfeit). The full version includes a measurable axis for structural depth and a method for detecting divergence between layers. But the core intuition is familiar to anyone who's debugged a system: the logs say one thing, the metrics say another, and the truth is in the code.

[^counterfeit-prism]: See [_The Counterfeit_, §III–IV](/blog/the-counterfeit) for the formal version. The relevant insight for this piece: when the rhetorical layer says "freedom" and the structural layer says "extraction," the gap between them is not an accident. It is the mechanism. The freedom _is the cover_ for the extraction.

## III. The First Inversion

Before the cloud providers arrived, before the AI companies, before the SaaS loophole, the movement was structurally inverted once already. And the people who did it thought they were helping.

In February 1998, following Netscape's announcement that it would release its browser source code, a group of developers met in Palo Alto to discuss strategy. Eric Raymond, Bruce Perens, Christine Peterson, and others recognized an opportunity to bring the free software development model to the mainstream. The obstacle, as they saw it, was the word "free." Not because it was ambiguous (though it was), but because it was _moral_. Stallman's framework was explicitly ethical: software freedom is an obligation, not a marketing advantage. Raymond wanted to drop what he called the "moralizing" and the "confrontational" ideology, replacing it with a pragmatic pitch to business: open source is more efficient, more reliable, more innovative.[^esr]

The rebranding worked. Spectacularly. Within a year, IBM, Oracle, and Sun Microsystems had formally embraced "open source." The movement gained corporate legitimacy, media coverage, and institutional momentum it had never had. The Open Source Initiative, co-founded by Raymond and Perens, became the definitional authority. The Debian Free Software Guidelines were adapted into the Open Source Definition. The word "freedom" was preserved in the rhetoric. The moral obligation behind it was surgically removed.

Apply the structural inversion diagnostic:

- **Hollow:** The ethical substance of the movement, the claim that software freedom is a moral obligation, was removed and replaced with a pragmatic efficiency argument.
- **Substitute:** The Open Source Definition performed the _function_ of principled governance (it defined what counted as "open source") while stripping the _moral reasoning_ that had motivated the original principles.
- **Preserve:** The rhetorical surface, "freedom," "community," "sharing," remained intact. The words stayed. The obligation left.

This matters for the rest of the argument because it explains _why_ the structural capture proceeded so cleanly. Once the ethical obligation was removed, the only structural defense remaining was the license. And the license, as §IV will show, had a gap, the SaaS loophole, that was invisible in 1986 but catastrophic by 2006. Through that gap drove every cloud provider, every AI company, and every VC-backed extraction cycle that followed.

I want to be careful here, because I am not moralizing the decision to rebrand. It's genuinely unclear whether we'd be in a better position without it. The rebranding built the commons at a scale that the free software movement, with its confrontational posture, might never have achieved. Without corporate adoption, the commons might never have grown large enough to demonstrate why commons governance matters. The very ecosystem whose capture I'm diagnosing exists in its current form _because_ the rebranding succeeded. The irony is structural: the pragmatic move that stripped the ethical defense is also the move that built the thing worth defending. I'm not saying Raymond was wrong. I'm saying this is where the gap opened, and tracing the causal chain matters more than assigning blame.

Stallman saw it at the time. He refused to adopt the new terminology and spent the next two decades arguing that the distinction between "free software" and "open source" was not semantic but structural: one carried a moral obligation, the other carried a marketing pitch.[^stallman-response] He was right about the distinction. But even he didn't see that the freedoms themselves, moral obligation or not, were incomplete. The ethical dimension he fought to preserve was necessary but not sufficient. You needed the moral claim _and_ the missing axioms. We lost the first. This piece adds the second.

[^esr]: Eric S. Raymond, ["Goodbye, 'free software'; hello, 'open source'"](http://www.catb.org/~esr/open-source.html) (1998). Raymond explicitly argued for replacing the ethical framing with a pragmatic one to make the movement palatable to corporate adopters. The founding of the Open Source Initiative followed the February 3, 1998 strategy session in Palo Alto. See also [History of the OSI](https://opensource.org/history).

[^stallman-response]: Richard Stallman, ["Why Open Source Misses the Point of Free Software"](https://www.gnu.org/philosophy/open-source-misses-the-point.html). Stallman's core argument: "Open source is a development methodology; free software is a social movement." He was right that the distinction is structural, not semantic. But even his framework, grounded in moral obligation, did not identify the missing structural conditions for commons persistence.

## IV. The Inversion of the Four Freedoms

In the trilogy preceding this piece, I described a pattern that shows up across domains with disturbing regularity: a right is structurally inverted when the mechanisms designed to protect it are turned against it, while the right itself is kept on display as proof of its own defeat.[^si-recap] Three steps: **hollow** the substance of the right, **substitute** a procedural replacement that performs the function of protection without providing it, and **preserve** the rhetorical surface so that everyone can still point to the right and say "see, it's right there."

Every one of the four freedoms has undergone this process. Not by conspiracy. By _structure_. The architectural transformation of software from object to platform created the conditions under which each freedom could be formally preserved and structurally emptied. Let me show you.

### The Freedom to Run

You can run the program as you wish, for any purpose. Nobody stops you.

Here's what "running" a meaningful piece of software looks like in 2026: you need a cloud account, an API key, a container orchestration platform, a CDN, a monitoring stack, a CI pipeline, and a user base. You can "run" PostgreSQL on your laptop. You cannot run a competitive database service without the operational layer that AWS has folded into a managed offering behind a credit card form. You can "run" Mastodon on a VPS. You cannot run a social network that anyone actually uses, because the network is the product and you can't fork a network. You can "run" an LLM locally. You cannot run a competitive AI service without billions of dollars in compute that produced the weights you don't have access to.

The freedom to run has been hollowed by infrastructure dependency. You have the right to run the code. You do not have the right to the substrate on which running the code is meaningful. Amartya Sen called this the capability distinction: a formal right without the material conditions to exercise it is structurally empty.[^sen] A self-hosted instance of a platform no one uses satisfies Freedom 0 the way a nominally free person with no resources satisfies the formal definition of liberty. The freedom is a theorem that compiles but never executes.

And the cloud providers know this. They price data _ingress_ at zero (getting your data in costs nothing) and _egress_ at $0.09-$0.12 per gigabyte (getting your data out costs a fortune). For large datasets, migration is not a business decision; it is a structural impossibility. Google Cloud offers to waive egress fees only if you _close your account_.[^egress] The exit toll is not incidental. It is the business model. Your "freedom to run" exists inside a walled garden with a one-way gate.

### The Freedom to Study

Source code is available. You can study how the program works and change it so it does your computing as you wish.

Chromium is roughly 35 million lines of code. Even if you had the time and expertise to read all of it, and you don't, the complexity is not incidental. It is the product of an engineering culture that optimizes for velocity over comprehensibility, a corporate culture that benefits from the opacity of its own "open-source" contributions. Nadia Asparouhova documented this shift precisely: from the "bazaar" model of distributed peers to the "stadium" model, a solo maintenance performer watched by a massive, silent audience who files issues but never sends patches.[^stadium] Publication of the code satisfies Freedom 1. Comprehensibility of the code is nobody's problem.

But the more profound hollowing is happening in AI. The "open-source" AI architectures, the model code, the training loop, the inference pipeline, are published. The model weights, the thing that actually makes the system work, the thing that required billions of dollars of compute to produce, are proprietary. The training data is proprietary. You can "study" the oven design. The recipe, the ingredients, and the fire are trade secrets. Publication of the architecture is the _substitute_: it performs the function of openness without providing it. The operational substance is withheld.[^ai-study]

### The Freedom to Redistribute

You can give copies to anyone. You can redistribute the code.

You cannot redistribute the network. You cannot redistribute the user base. You cannot redistribute the operational trust that enterprises have invested in the cloud provider's managed version. You cannot redistribute the institutional relationships, the support contracts, the compliance certifications.

Redistribution of the artifact, in an era of network effects, is the redistribution of a seed without the soil. Metcalfe's Law is unforgiving: the value of a network scales with the square of its participants.[^metcalfe] When Redis relicensed and AWS launched Valkey, within a year 83% of large Redis users were testing the AWS-backed fork.[^valkey] Not because Valkey was technically superior. Because AWS had the network position, the infrastructure, the pre-existing customer relationships. The code was identical. The network was not. The fork inherited the users because platform gravity determined the outcome before a single commit was reviewed.

The freedom to redistribute code in a world where value lives in networks is like the freedom to photocopy a deed to land everyone has already evacuated. The paper is free. The territory is captured.

### The Freedom to Distribute Modified Versions

This is the cleanest case, because it's not hollowing. It's definitional capture, and it's the most elegant structural inversion of the four.

"Distribute" was defined when distribution meant handing someone a tape. In the SaaS era, deployment _is_ distribution in every structural sense except the legal one. When you use Gmail, you are using Google's modified version of open-source components. You interact with it. You depend on it. You are subject to its modifications. You never receive a "copy." The GPL's reciprocity requirement, share your modifications if you distribute, is triggered by the legal act of distribution. Google can modify, deploy, and profit from GPL'd code without sharing a line, because the user never receives a binary. They receive a URL.[^saas]

The AGPL attempted to close this gap. The SSPL went further. Both were resisted. The Open Source Initiative rejected the SSPL, invoking Criterion 6 of the Open Source Definition: "No Discrimination Against Fields of Endeavor." A criterion designed to prevent licenses that prohibit military or commercial use was deployed to prevent licenses that recognize cloud hosting as a form of distribution.[^osi] The community's own definitional framework was weaponized to prevent the community from addressing the most significant structural change in software delivery since the floppy disk.

This is not hollowing. This is the **substitute** step operating at the definitional level: the _meaning_ of "distribution" was captured to exclude the dominant mode of actual distribution. The freedom is intact. The definition was rewritten around it.

[^si-recap]: See [_The Counterfeit_, §V–VI](/blog/the-counterfeit#v-the-structure-of-inversion) for the full pattern. In its legal form (constructive nullification), this same mechanism appears in constitutional law: a right is formally preserved while procedural mechanisms make its exercise structurally impossible. See [_Constructive Nullification_](/blog/Constructive_Nullification) for the legal species.

[^sen]: Amartya Sen, _Development as Freedom_ (1999), ch. 3. The capability approach: a formal right without the material conditions to exercise it is structurally empty.

[^egress]: Cloud egress pricing creates structural lock-in. AWS charges $0.09/GB for data transfer out of its regions. For a 10TB dataset, that's $900 just to _leave_. Google Cloud [waives egress fees only upon account closure](https://cloud.google.com/storage/pricing#network-egress). The economics of exit are designed to prevent exit.

[^stadium]: Nadia Asparouhova, [_Working in Public: The Making and Maintenance of Open Source Software_](https://press.stripe.com/working-in-public) (Stripe Press, 2020).

[^ai-study]: The legal challenge to GitHub Copilot alleges DMCA violations and license breach through the "one-way transformation" of licensed code into proprietary model weights. See the [Joseph Saveri Law Firm filing](https://www.saverilawfirm.com/our-cases/github-copilot-intellectual-property-litigation) and [Nordia Law analysis](https://nordialaw.com/insights-open-source-piracy-through-ai/).

[^metcalfe]: [Metcalfe's Law (Wikipedia)](https://en.wikipedia.org/wiki/Metcalfe%27s_law). For the specific application to open-source ecosystem value: NFX, ["The Network Effects Manual"](https://www.nfx.com/post/network-effects-manual).

[^valkey]: Within one year of Redis relicensing, [83% of large Redis users were testing the AWS-backed Valkey fork](https://vonng.com/en/db/redis-oss/). The code was identical. The network was not.

[^saas]: The "SaaS loophole": the GPL's reciprocity trigger (_distribution_) was designed for physical copies. SaaS providers never "distribute" in the legal sense. See Kyle Mitchell, ["The Copyleft Bust Up"](https://writing.kemitchell.com/2018/11/04/Copyleft-Bust-Up) and the [Cardozo Law Review analysis](http://cardozolawreview.com/wp-content/uploads/2018/08/GREENBAUM.37.4.pdf).

[^osi]: The OSI Open Source Definition, Criterion 6: "No Discrimination Against Fields of Endeavor." Designed to prevent licenses that prohibit military or commercial use. Invoked to reject the SSPL, which attempted to treat cloud hosting as distribution. A mechanism designed to protect freedom of _use_ was deployed to protect freedom of _extraction_. This is structural inversion at the definitional level.

## V. The Broken Feedback Loop

The four freedoms guarantee that value can flow _out_ of the commons. Use it. Copy it. Modify it. Redistribute it. Build a trillion-dollar company on it. Train an AI with it. Offer it as a service. All of this is permitted. All of this is by design. This is what makes open source powerful.

What the four freedoms do not guarantee, and what no existing open-source license addresses, is that any of that value flows _back in_.

There is no structural mechanism, anywhere in the canonical stack of freedoms, definitions, and licenses, that ensures the commons receives the energy it needs to persist. The pipe is one-way. And the result is exactly what the Second Law of Thermodynamics predicts: the system is degrading.

A commons is what physicists call a dissipative structure: a system that maintains its internal order only by continuously importing energy from its environment and exporting entropy.[^prigogine] A candle flame, a living cell, an economy, a software ecosystem: all dissipative structures. They persist far from equilibrium, and the moment the energy import stops, they collapse. Not slowly. Rapidly. Because equilibrium, for a dissipative structure, is death.

The internal entropy production of a software commons is always positive: technical debt accumulates, dependencies rot, security vulnerabilities compound, maintainers burn out, documentation decays. This is not a failure of management. It is a law of physics applied to information systems.[^entropy-tax] The only question is whether the energy import, the human labor, the funding, the cognitive attention, the infrastructure, is sufficient to offset that internal degradation. For the open-source commons, empirically, it is not. And the four freedoms say nothing about it, because the four freedoms protect the _artifact_. All of this is happening to the _commons_.

In a previous piece, I described what I call the _autonomic machine_: a system that produces the opposite of its stated purpose and punishes those who notice.[^autonomic] The open-source commons has become an autonomic machine. Its stated purpose is freedom. Its structural output is extraction. And the mechanisms designed to protect freedom, the licenses, the definitions, the governance frameworks, are the very mechanisms through which the extraction proceeds.

### Three Extraction Patterns

**Cloud extraction.** AWS, Azure, and GCP take mature open-source projects and offer them as managed services. The original maintainers bear the development cost. The cloud providers capture the revenue. When MongoDB, Elastic, Redis, and HashiCorp attempted to close this gap through relicensing, they were met not with negotiation but with forks: OpenSearch, Valkey, OpenTofu. The message was blunt: _we will rewrite the project before we will pay for it_.[^relicensing]

And here is a nuance that the tech press consistently misses, because the tech press itself is captured: when these projects relicensed, _they_ bore the brunt of the bad publicity. Not the extractors. The maintainers who tried to create a sustainable business around their own work were branded as traitors to open source. The trillion-dollar cloud providers who precipitated the crisis by strip-mining maintainer labor were cast as defenders of the community. Just as you cannot have freedom in a sovereign nation without a free and independent press, you cannot have a sustainable software commons without a tech media ecosystem that isn't financially dependent on the platforms it covers.[^media]

**AI extraction.** Generative AI companies use open-source code as training data, performing a one-way value transformation: billions of lines of human-authored, licensed code go in; proprietary model weights come out. The code is "free to study." The model that learned from it charges $20/month. A substantial portion of these companies' training sets originated from decades of uncompensated maintainer labor.[^copilot] And this is not even the full picture. These same companies have captured trillions of dollars in reallocated public funding: government subsidies, tax incentives, regulatory capture, favorable trade policy. The extraction of the commons is part of a much larger structural pattern in which public value is systematically converted into private rent.[^public-funding]

**VC extraction.** The lifecycle is patterned and predictable. Open-source → adoption → VC funding → proprietary layer → relicensing or acquisition. Docker, Confluent, HashiCorp: the arc is identical in each case. The commons funds the go-to-market. The exit extracts the value. HashiCorp's BSL relicensing in 2023 was followed by its $6.4 billion sale to IBM in 2024. The community launched OpenTofu under the Linux Foundation. Same pattern as Docker. Same pattern as Confluent. The commons builds; capital harvests.[^vc]

### Why It Matters

Modern society attributes its technological progress to capitalism. This is a lie. The wonders of the internet era, the infrastructure that powers global communication, the protocols that enable commerce, the security libraries that protect every transaction, the package ecosystems that make modern software development possible, are overwhelmingly the product of commons-based production. Of volunteers. Of maintainers who were never paid. Of communities that organized around shared problems and built solutions that no corporation planned, funded, or understood.

Capitalism did not build this. Capitalism showed up after the building was done, moved into the penthouse, and sent the builders an invoice for the elevator.

And it gets worse: the claim that capitalists are "substantially more productive" and therefore deserve outsized returns is nullified by their deliberate destruction of the very commons from which that "productive value" is extracted. The extractors are not adding value. They are capturing it while degrading the source, which is the opposite of productivity. It is _consumption_ performing the role of production while the host organism weakens.[^obliteration]

Neither capitalism nor communism has an answer here, and for the same structural reason: both are centralizing forces. Capitalism as practiced by the tech monopolies optimizes for unbounded private extraction. Communism optimizes for total state legibility and command. Both destroy the distributed, localized knowledge that makes complex systems adaptive. Both inevitably converge on surveillance, because whether the central hub is a Politburo or a Board of Directors, maintaining an unnatural monopoly over information requires total information extraction.[^commonsism] What we actually need is something closer to what Ostrom and Mises understood from different angles: decentralized, proportional stewardship of shared resources, governed not by central authority but by the localized wisdom of the people who actually do the work. Call it commonsism, if you need a word. It is not a political ideology. It is a structural requirement for any commons that intends to persist.

Ironically, AI proves their thesis more powerfully than perhaps anything else in human history. These systems represent the most expensive, most computationally intensive attempt at centralizing knowledge ever undertaken: unprecedented capital, unprecedented stolen data, unprecedented power concentration. And they _still_ cannot reliably produce the intimate, domain-specific structural knowledge that Mises argued could never be centralized. A maintainer who has spent three years inside a codebase knows things about its failure modes that no model trained on its git history can reproduce. That knowledge is produced by sustained human engagement with specific systems, and it is irreplaceable, not because we haven't built a big enough model, but because the knowledge _is_ the engagement. Centralize the data and you lose the signal. This is Mises's calculation problem and Ostrom's local knowledge principle, validated at civilizational scale by the most powerful information-processing infrastructure ever built, and it still isn't enough.[^ai-limit]

And here is the deepest irony: at a time when the ideals behind open source are at their structural weakest in decades, undermined by extraction, hollowed by platform capture, and betrayed by the very institutions that claim to defend them, their spirit has likely never been needed more. The AI revolution, whatever form it takes, will either be built on a sustainable commons or it will be built on a captured one. If we don't fix the foundations now, we're handing the most powerful technology in human history to the same extraction machines that broke the last one.[^stakes]

### The Human Cost

In March 2024, a Microsoft engineer named Andres Freund noticed a 500-millisecond delay in SSH logins. He investigated. What he found was a backdoor (CVE-2024-3094) inserted into xz-utils, a compression library embedded in virtually every Linux distribution, by an attacker who had spent more than two years building trust with the project's sole maintainer.[^xz]

The vector was not a zero-day exploit. It was a burned-out human being.

Lasse Collin maintained xz-utils alone. The attacker, operating as "Jia Tan," began submitting legitimate patches in late 2021. Sock puppet accounts then pressured Collin publicly, criticizing his slow release cycle, weaponizing the very exhaustion that the extractive model created. By late 2022, Collin granted Jia Tan co-maintainer access with signing authority. The backdoor went in.[^xz-timeline]

Now apply the structural inversion diagnostic. The "freedom to study" xz-utils was formally intact: the code was open, the commit history was public, the signing keys were transparent. The _substance_ of that freedom, the actual capacity for meaningful security review by a community with the resources to perform it, was empty. One person, unsupported, was bearing the maintenance load of infrastructure that underpinned the internet. The freedom was on display. The capability was gone.

Heartbleed was the same pattern, earlier. In 2014, a missing bounds check in OpenSSL (CVE-2014-0160) exposed the private keys of up to 55% of HTTPS servers. OpenSSL had _one_ full-time developer and received approximately $2,000 per year in donations.[^heartbleed] An $8.8 trillion ecosystem resting on a project funded at the level of a modest coffee habit.

These are not anecdotes. They are structural predictions. The numbers I opened with (60% unpaid, 73% burnout) are not anomalies. The Tidelift survey fills in the rest: 61% of maintainers are solo operators, and the share of contributors under 26 has dropped from 25% to 10% since 2021.[^tidelift] The commons is graying. The pipeline is drying up. The feedback loop is broken or was never there, and the four freedoms have nothing to say about any of it.

Because all of this, every bit of it, is happening on a layer the freedoms were never designed to reach.

[^prigogine]: Ilya Prigogine and Isabelle Stengers, [_Order out of Chaos_](https://deterritorialinvestigations.files.wordpress.com/2015/03/ilya_prigogine_isabelle_stengers_alvin_tofflerbookfi-org.pdf) (Bantam, 1984). The key equation: dS = d_eS + d_iS, where d_iS > 0 always (internal entropy production) and d_eS must be sufficiently negative (energy import) for the structure to persist.

[^entropy-tax]: In systems dynamics, this is modeled as a reinforcing feedback loop: extraction increases → maintenance capacity decreases → code quality degrades → security incidents increase → trust erodes → adoption patterns shift to managed services → extraction increases further. See Donella Meadows, [_Thinking in Systems_](https://github.com/mgp/book-notes/blob/master/thinking-in-systems-a-primer.markdown) and John Sterman, ["System Dynamics Modeling"](https://www.researchgate.net/publication/3228150_System_dynamics_modeling_Tools_for_learning_in_a_complex_world).

[^autonomic]: The autonomic machine: a system that produces the opposite of its stated purpose and punishes those who notice. See [_The Counterfeit_, §VIII](/blog/the-counterfeit) for the formal treatment and case studies.

[^relicensing]: The relicensing cascade: MongoDB AGPL→SSPL (2018), Elastic Apache→SSPL/ELv2 (2021), Redis BSD→RSALv2/SSPL (2024), HashiCorp MPLv2→BSL (2023). In each case, the community response was a fork backed by the very cloud providers the relicensing targeted. See ["The Future of Open Source is Polarized"](https://www.percona.com/blog/the-future-of-open-source-is-polarized/).

[^media]: The parallel is not hyperbole. The tech press depends financially on the same platforms it ostensibly covers: cloud provider advertising, platform partnerships, access journalism. The structural incentive is to frame relicensing as "betrayal" and extraction as "innovation." A free commons requires a free press. We have neither.

[^copilot]: GitHub Copilot class action: [Saveri Law Firm filing](https://www.saverilawfirm.com/our-cases/github-copilot-intellectual-property-litigation). See also ["Open-source piracy through AI"](https://nordialaw.com/insights-open-source-piracy-through-ai/).

[^public-funding]: The scale of public subsidization of AI companies includes direct government grants, tax incentives for R&D, preferential energy pricing for data centers, and regulatory frameworks written by industry lobbying. The total represents trillions in reallocated public value captured as private returns.

[^vc]: HashiCorp's BSL relicensing (2023) was followed by its [$6.4 billion acquisition by IBM](https://www.hashicorp.com/blog/hashicorp-joins-ibm) (2024). The open-source community launched [OpenTofu](https://opentofu.org/) under the Linux Foundation. The lifecycle analysis is detailed in the [reciprocity economics research](/drafts/5th/prompt_7).

[^obliteration]: The argument that extractive actors "create value" is belied by the measurable degradation of the commons from which that value is drawn. If the extraction rate exceeds the regeneration rate, the actor is not a producer. They are a consumer performing the social function of a producer. This is the economic analog of structural inversion.

[^commonsism]: Not a neologism for the sake of novelty. That Ostrom and Mises arrived at compatible conclusions from opposite ideological starting points is itself strong evidence that the insight is structural rather than ideological. Note the structural parallel: both capitalism and communism fail the adaptive test because both require information monopolies — the market monopoly of the corporation or the command monopoly of the state — that destroy the distributed knowledge Ostrom and Mises independently identified as essential. See Ostrom, _Governing the Commons_ (1990) and Mises, [_Human Action_](https://mises.org/library/human-action-0) (1949).

[^ai-limit]: This is Mises's [economic calculation problem](https://en.wikipedia.org/wiki/Economic_calculation_problem) in its information-theoretic form. LLMs can synthesize broad patterns from aggregated data but cannot reliably produce the domain-specific, context-dependent judgments that maintainers make daily: "this patch introduces a subtle regression in edge case X on architecture Y." That knowledge is _produced by_ the sustained engagement of a specific human with a specific system. It is not stored in the code. It is not in the git history. It is in the practitioner. Centralize the data and you lose the signal, because the signal was never in the data. It was in the relationship between the data and the person who understood its context. When the commons degrades, the practitioners leave, the knowledge degrades, and the AI trained on it degrades. The dependency is structural, recursive, and terminal.

[^stakes]: The conditional: _if the system is to persist, then these conditions must be met_. Not a preference. A physical requirement. A commons that fails to import enough energy to offset its internal entropy production will degrade. See [_Axiosophy_, §I–III](/blog/axiosophy#part-i-foundations).

[^xz]: [XZ Utils backdoor (Wikipedia)](https://en.wikipedia.org/wiki/XZ_Utils_backdoor). See also CISA, ["Lessons from XZ Utils"](https://www.cisa.gov/news-events/news/lessons-xz-utils-achieving-more-sustainable-open-source-ecosystem).

[^xz-timeline]: The sock puppet accounts ("Jigar Kumar" and others) applied public pressure on Collin's mailing list, criticizing his responsiveness, weaponizing the very burnout that the extractive model created. See the [Atlantic Council analysis](https://www.atlanticcouncil.org/content-series/the-5x5/the-5x5-the-xz-backdoor-trust-and-open-source-software/) and [Black Duck report](https://www.blackduck.com/blog/xz-utils-backdoor-supply-chain-attack.html).

[^heartbleed]: [Heartbleed.com](https://www.heartbleed.com/). For the funding data: the Ford Foundation's [_Roads and Bridges_](https://www.fordfoundation.org/wp-content/uploads/2016/07/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure.pdf).

[^tidelift]: [2024 Tidelift State of the Open Source Maintainer Report](https://assets-eu-01.kc-usercontent.com/ef593040-b591-0198-9506-ed88b30bc023/d325a56f-05be-4379-bfd1-ee4776fcad41/2024-tidelift-state-of-the-open-source-maintainer-report-.pdf). The "graying" data: GitHub, ["Who will maintain the future?"](https://github.blog/open-source/maintainers/who-will-maintain-the-future-rethinking-open-source-leadership-for-a-new-generation/).

## VI. The Missing Freedoms

The diagnosis is structural, and so the fix must be structural. Not a patch on the governance. Not a new donation platform. Not a more cleverly worded license. The fix is additional axioms: freedoms that the original four do not cover and cannot imply, because they address a layer of the stack that didn't exist when the originals were written.

The four freedoms protect the artifact. What follows protects the commons.

These freedoms have not been derived before because the tools to derive them did not exist. The free software movement has debated sustainability, governance capture, and maintainer exploitation for decades. Good people have proposed good solutions. But proposals are not derivations. A proposal says "this seems like a good idea." A derivation says "this is a conditional necessity given these structural constraints, and here is the chain of reasoning."

The framework I built in the previous series, axiosophy, formalizes the structural constraints under which complex systems persist or degrade. When you formalize the structure, the conditions for its success and failure stop being matters of debate and become demonstrable. Formalism denotes mechanism.[^formalism] You cannot derive what you haven't formalized. Now that the formalism exists, the derivation follows.

Each freedom below is derived from the same entropic constraint that grounds the entire framework: complex systems persist only by importing energy, maintaining self-correction, and resisting structural capture. These are not preferences. They are conditional necessities. If the commons is to survive, these conditions must be met, the same way a building that violates load-bearing requirements will eventually fall. Not because an engineer says so. Because gravity says so.[^derivation]

### The Freedom to Sustain and Be Sustained (Freedom 4)

The four freedoms guarantee that value can flow out of the commons. They provide no corresponding guarantee that value flows back in. This is not an oversight in hindsight. It is a structural gap that becomes lethal once the commons reaches sufficient scale and the extractors arrive with sufficient appetite.

Ostrom's second design principle, validated across centuries of commons governance from Spanish irrigation systems to Swiss alpine meadows, states that the benefits extracted from a commons must be proportional to the costs borne by its participants. Commons where this proportionality holds persist for centuries. Commons where it doesn't collapse within decades.[^ostrom-dp2] This is what entropy demands: a dissipative structure must import energy in proportion to its internal entropy production. The four freedoms provide no mechanism for this import.

Henry George, writing in 1879, identified an analogous structure in land economics.[^george] Land value, he observed, is not created by the landowner. It is created by the community: the roads, the schools, the economic activity, the population. The landowner captures this community-created value as _economic rent_, income derived from position rather than productive activity. George proposed taxing this rent specifically: not the improvements (what you build is yours), but the positional value the community created for you.

Open source has the same structure. AWS does not create the value of PostgreSQL. Decades of community maintenance, security patching, and ecosystem development create that value. AWS captures it by virtue of its _position_: the ability to host at scale with pre-existing customer relationships. That positional surplus is economic rent in the Georgist sense. And like George's land, it cannot be hidden: _commercial deployment requires public visibility_. You cannot secretly sell a product. You cannot secretly offer a managed service. The act of commercial deployment is the structural fact that no amount of corporate restructuring, no shell company arrangement, no contractor layering can conceal.[^routing]

> **Freedom 4 (The Freedom to Sustain and Be Sustained):** Those who produce and maintain a commons resource shall have structural mechanisms ensuring that value generated from commercial deployment of the commons flows back proportionally to sustain it.

The mechanism is a _Commons Value Return_ (CVR): a continuous, proportional return that follows the _deployment_, not the entity. It can take the form of funding, engineering contribution, infrastructure, or documentation. The specific rates are governance parameters. But the _existence_ of the return mechanism is the freedom itself. A commons without a feedback loop is a dissipative structure with its energy import cut. It is not a question of fairness. It is a question of physics.[^cvr]

### The Freedom from Institutional Capture (Freedom 5)

Philip Pettit distinguished between two conceptions of liberty: freedom from _interference_ and freedom from _domination_.[^pettit] The distinction is load-bearing. A slave with a kind master experiences no interference. But the master _could_ interfere at any time, for any reason. The slave's freedom is structurally empty because it depends on the goodwill of an entity with the power to revoke it.

This is the exact configuration of open-source projects governed by single corporate sponsors. Google could reshape Chromium's direction tomorrow. Meta could change React's license. Corporate sponsors who fund 90% of a project's development have the structural capacity to dictate its direction, even if they currently exercise restraint. The "kind master" is not the absence of capture. It is capture with a pleasant demeanor.

I want to be precise about what I'm _not_ saying. Contributing substantial code through the governance process is legitimate influence. Having strong technical opinions that prevail on technical merit is not capture. Being the largest funder of a foundation does not automatically constitute capture if governance mechanisms prevent funding from translating into control. Capture is the _structural capacity to dictate arbitrarily_, acquired through financial leverage, infrastructure dependency, or governance position, independent of technical merit.[^capture-distinction]

I chose the word "capture" deliberately. "Domination" is the correct term in political philosophy, but in the current cultural climate it would be weaponized within a week. "Your expertise is a form of domination." "Contributing more code dominates the discussion." We've seen this movie. "Capture" is a defined, falsifiable, structural term from institutional economics. "I feel dominated" is unfalsifiable and weaponizable. "This entity has captured the governance" is a structural claim you can verify against evidence.[^naming]

> **Freedom 5 (The Freedom from Institutional Capture):** No entity shall acquire the structural capacity to dictate the direction, governance, or economic terms of a commons-produced resource through the scale of its investment, dependency, or infrastructure control alone.

The mechanism is structural caps on governance concentration: no single entity or common-control group may hold more than a defined fraction of governance authority. The specific fraction is a governance parameter. The structural cap is the freedom.

### The Freedom to Dissent (Freedom 6)

Self-correction requires error detection. Error detection requires agents who can name errors without being destroyed for naming them. This is not a nice-to-have. It is the immune system of every complex adaptive system, and without it, errors accumulate until the system fails catastrophically.

Stanley Milgram demonstrated something striking in his Experiment 17: when a single peer in the room visibly refused to comply with the authority's instructions, obedience collapsed from 65% to 10%.[^milgram] The immune function of a social system is not the majority. It is the visible dissenter. The person who says "no" first. Destroy that person and you don't just lose their contribution. You destroy the social proof that makes dissent possible for everyone else.

I documented the mechanism by which this destruction proceeds in a previous piece: isolate the dissenter, reframe their technical objection as a behavioral infraction, escalate through the behavioral governance process, remove them, then cite the removal as evidence that the system works.[^playbook] In open source, the pattern is documented and recurring. Governance bodies dominated by non-technical actors adopt behavioral codes that make "unwelcoming behavior" or "disruptive communication" sanctionable offenses. Technical dissent, because it inherently involves disagreement and sometimes emotional intensity, gets reclassified as a behavioral violation. The governance process becomes the weapon. The dissenter faces a double bind: participate and risk sanction, or withdraw and lose the ability to contest.[^personal-cost]

The vocabulary of weaponized inclusion ("safety," "welcoming," "community standards") is itself a case study in structural inversion. These words have structural meanings that matter. They've been hollowed and refilled with the precise opposite of their original content, used not to protect the vulnerable but to silence the inconvenient. The pernicious cruelty of this culture is that it demands the censoring of one's true thoughts at all times, forgoing curiosity altogether in one final surrender to the machine. Societies have always had an immune response to precisely this kind of rhetorical capture: ridicule, the correction that operates below the level of formal argument and cannot be suppressed by procedural intimidation.[^ridicule]

The Second Law of Thermodynamics doesn't care about your feelings. A system that suppresses its own error-correction function will degrade. That is not an opinion. It is a physical prediction, and the xz-utils backdoor is what it looks like when the prediction comes true.[^moral-failure]

> **Freedom 6 (The Freedom to Dissent):** The freedom to contest the commons' direction, governance, or architecture without structural retaliation.

The mechanism: mandatory separation of behavioral and technical governance. Technical dissent, the act of arguing that the project is going in the wrong direction, cannot trigger behavioral sanctions. Behavioral governance addresses conduct. Technical governance addresses direction. The two tracks do not cross. This is not a procedural nicety. It is the structural condition for the immune system to function.

### The Freedom to Exercise (Freedom 7)

A freedom whose exercise requires infrastructure controlled by another entity that can revoke access at will has been structurally inverted, whatever the license says.

This is Sen's capability approach applied to software.[^sen-cap] If your "freedom to fork" a project requires you to replicate infrastructure controlled by a single cloud provider, and that infrastructure has no interoperable alternative, your freedom is formally present and structurally empty. The freedom to leave a platform you depend on is the freedom to jump from a moving vehicle.

The specific mechanisms: cloud-only features that don't exist in the self-hosted version. Data formats that only work with one vendor's tooling. Package registries with no federated alternative. CI/CD pipelines that can only run on one provider's infrastructure. APIs with no interoperable specification. Each of these creates a dependency chain that terminates in a revocable resource, and a freedom that depends on a revocable resource is, in the structural sense defined by this entire piece, a counterfeit.[^substrate]

> **Freedom 7 (The Freedom to Exercise):** The meaningful exercise of Freedoms 0–3 shall not be structurally contingent on resources controlled by any entity capable of revoking access.

The mechanism: protocol interoperability requirements. Data portability mandates. Not "self-host everything." Meaningful alternatives. Fork must be _materially viable_, not just legally permitted. This freedom is the capability condition that makes all the others structurally operative.

### The Freedom to Observe (Freedom 8)

Capture proceeds undetected when governance is opaque. Proportional return cannot be enforced when financial flows are invisible. Retaliation against dissenters cannot be proven when sanction proceedings are hidden. Transparency is not a procedural convenience. It is the precondition for every other commons freedom to be verifiable.

Ostrom's fourth design principle states that monitors of a commons must be accountable to the community.[^ostrom-dp4] In software, monitoring is code review, CI pipelines, automated security audits, and these are generally functional for code quality. But governance transparency, the visibility of _who decides what_, of _where the money goes_, of _how sanctions are applied_, is far less robust. Many major open-source foundations operate with opaque financial structures, private governance deliberations, and sanction processes deliberately hidden from public scrutiny.

Without transparency, Freedom 5 (immunity from capture) becomes undetectable. Freedom 4 (sustenance) becomes unenforceable. Freedom 6 (dissent) becomes unprovable. Transparency is the enabling condition for the entire commons freedom set.

> **Freedom 8 (The Freedom to Observe):** The freedom to observe and audit the commons' governance, economics, and sanction proceedings.

The mechanism: all governance decisions, financial flows, and sanction proceedings must be observable by commons participants. Not "available upon request." Observable. The default is visibility. Opacity requires justification, and the justification itself must be visible.

[^formalism]: "Formalism denotes mechanism": when you formalize the constraints governing a system, the conditions for its persistence become derivable rather than debatable. This is why physics can predict bridge failures while committee opinions cannot. The same principle applies to institutional design. If the constraints are formalized, the failure modes are identifiable, and the necessary structural conditions can be stated with the same precision as engineering load requirements.

[^derivation]: Each freedom is derived from the same conditional chain: (1) entropy demands energy import for persistence, (2) structural inversion destroys the mechanisms of import, self-correction, and oversight, (3) therefore the conditions that prevent these destructions are not optional. These are not policy preferences. They are load-bearing requirements. See [_Axiosophy_, §I–III](/blog/axiosophy#part-i-foundations) for the formal derivation chain.

[^ridicule]: See [Twelve Years as a Digital Hermit, §"The Forgotten Utility of Ridicule"](/blog/12-years#the-forgotten-utility-of-ridicule) for my earlier treatment. The structural insight: ridicule is not cruelty. It is the social immune response that inoculates against ideas too absurd to be defeated by argument alone, because their defenders have already insulated them from argument. Comedians have understood this intuitively for millennia. Axiosophy now explains the mechanism: ridicule targets the rhetorical surface directly, bypassing the procedural capture that formal argument must navigate.

[^ostrom-dp2]: Ostrom, _Governing the Commons_, ch. 3. The proportionality principle was validated across the Zanjera irrigation communities of the Philippines, the Swiss alpine meadows of Törbel, and the Spanish huerta systems of Valencia. Centuries of evidence. Not theory.

[^george]: Henry George, [_Progress and Poverty_](https://www.henrygeorge.org/pchp.htm) (1879). George's key insight: land value is community-created. The tax targets the _unimproved value_ (positional rent), not improvements. Applied to software: the ecosystem value (community-created) is the "land"; the product built on top (company-created) is the "improvement." Tax the rent, not the improvement.

[^routing]: Revenue can be shifted between entities. Headcount can be obscured through contractors. But _commercial deployment_ is publicly visible (you can't secretly sell a product) and _the dependency relationship_ is structural (splitting into subsidiaries doesn't change what code your service runs on). The CVR follows the deployment, not the entity.

[^cvr]: The economic viability: Harvard estimated the demand-side value of OSS at $8.8 trillion. A CVR of 0.1% on commercial surplus would generate ~$8.8 billion annually. For context: the Linux Foundation's annual budget is ~$250M; lifetime GitHub Sponsors payouts total ~$50M. The sustainability crisis is not a scarcity problem. It's a plumbing problem.

[^pettit]: Philip Pettit, _Republicanism: A Theory of Freedom and Government_ (Oxford, 1997). Freedom from interference requires an _act_. Freedom from domination requires only the _structural capacity to act_. The distinction matters because a "kind master" who never interferes is still a master.

[^capture-distinction]: Legitimate influence vs. structural capture: contributing code through the governance process is influence. Having strong opinions that prevail on merit is influence. Funding 90% of a project and thereby acquiring the capacity to dictate its direction regardless of merit is capture. The test is structural, not quantitative.

[^naming]: This naming decision is itself an application of the diagnostic. "Non-domination" was the candidate from Pettit's framework. But we've seen how rhetorical precision can be weaponized: "DEI" was a structurally sound concept (structural diversity reduces fragility) that was hollowed into a rhetorical weapon and then collapsed under the weight of its own inversion. "Capture" is harder to weaponize because it has a precise, verifiable definition in institutional economics. Moral chemistry, not moral alchemy.

[^milgram]: Stanley Milgram, [_Obedience to Authority_](https://www.harpercollins.com/products/obedience-to-authority-stanley-milgram) (1974), Experiment 17 (Two Peers Rebel).

[^playbook]: The Silencing Playbook. See [_The Counterfeit_, §VIII](/blog/the-counterfeit) for the full treatment.

[^personal-cost]: I won't belabor this. The details are in other pieces, for anyone who wants them. The point here is structural, not personal: the cost of dissent in the current open-source governance landscape is designed to be prohibitive. That design is the problem.

[^moral-failure]: In the framework I've developed, this can be stated precisely: a system that suppresses its own self-correction function is increasing its internal entropy rate while reducing its capacity to import negentropy. This is not "problematic." It is thermodynamically suicidal. The formal derivation is in [_Axiosophy_, §III](/blog/axiosophy#iii-the-structure). The plain-language version: if you destroy the people who tell you the building is on fire, the building is still on fire. You just won't find out until it falls on you.

[^sen-cap]: Amartya Sen, _Development as Freedom_ (1999). The capability approach: the right to drive is meaningless without roads.

[^substrate]: The "exit cost" analysis: cloud providers charge zero for data _in_ and ~$0.09–$0.12/GB for data _out_. For large datasets, this makes migration economically infeasible and the "freedom to fork" structurally empty.

[^ostrom-dp4]: Ostrom, _Governing the Commons_, Design Principle 4: monitors who are accountable to the appropriators or are the appropriators themselves. Applied to software: governance must be auditable by participants, not hidden behind "confidentiality."

## VII. The Expanded Freedom Set

Nine freedoms. Two layers. The first four protect the artifact. The next five protect the commons. Together, they span the full stack from code to ecosystem.

### The Artifact Freedoms (Stallman's Originals, Re-derived)

The OSI rebranding dismissed Stallman's freedoms as ideological, a moralist's hobby horse that scared corporate adopters. For a quarter century, the consensus has been that these are ethical preferences, not structural requirements. The consensus is wrong.

Each of the original four freedoms maps to a specific thermodynamic condition for the persistence of a complex system. They are not moral sentiments. They are load-bearing requirements, derivable from the same entropic constraints that produce the commons freedoms below.[^artifact-derivation]

- **Freedom 0 (Use):** The freedom to run the program as you wish, for any purpose. A dissipative structure maintains itself by deploying its components where they are needed, when they are needed. A cell that cannot express a gene in response to environmental stress dies. A society that cannot deploy its own tools for its own purposes has surrendered its adaptive capacity to whoever controls the deployment conditions. Restricted execution is restricted adaptation. This is not a philosophical preference. It is the minimum condition for a complex system to respond to a changing environment.

- **Freedom 1 (Study):** The freedom to study how the program works, and change it so it does your computing as you wish. In a previous piece, I derived a structural requirement for civilizational persistence: _any system that wishes to persist must maintain a structural path from Slavery to Mastery for its members_ (∀c ∈ Citizens: ∃path(c, Slavery → Mastery)).[^bedrock-link] Without the ability to inspect the code that increasingly governs commerce, communication, infrastructure, and law, citizens cannot audit the systems shaping their lives. They cannot detect errors. They cannot identify capture. They cannot distinguish a tool from a cage. The path to mastery is destroyed, and the system loses the self-correcting agents it needs to survive. Opacity is not a business strategy. It is entropy's most reliable accelerant.

- **Freedom 2 (Share):** The freedom to redistribute copies so you can help others. Redundancy is the primary defense against catastrophic single-point failure. Every critical biological system is redundant: two kidneys, two lungs, distributed neural pathways. A commons that cannot replicate its critical components across independent actors is one compromised node from systemic collapse. The xz-utils backdoor succeeded because the maintenance of a critical compression library had been concentrated in a single, exhausted human being. Redistribution creates the structural redundancy that prevents this. It is not generosity. It is resilience.

- **Freedom 3 (Modify):** The freedom to distribute copies of your modified versions to others. Adaptation requires variation. This is not a metaphor drawn from biology; it is the same structural principle. Any system that persists in a changing environment does so by producing variants, testing them against reality, and propagating the ones that work. A commons that cannot produce and distribute modified versions of itself cannot adapt. It becomes brittle, increasingly mismatched with the environment it was built to serve, until the gap between its structure and its context produces catastrophic failure. Modification is the mechanism of adaptation. Lock it down and you lock down the system's capacity to survive.

Stallman got the freedoms right. He did not get the justification right, or rather, he grounded them in moral obligation when they could have been grounded in physics. The OSI stripped the moral obligation and left the freedoms floating as pragmatic conventions, easily dismissed when they became inconvenient. Grounding them in entropy makes them non-optional. You can argue with a philosopher. You cannot argue with the Second Law.

### The Commons Freedoms

- **Freedom 4 (Sustenance):** The freedom to sustain and be sustained by the commons you produce. Those who commercially deploy commons-produced resources owe a proportional return to the commons that created the value they capture.
- **Freedom 5 (Immunity):** The freedom from institutional capture. No entity shall acquire the structural capacity to dictate the commons through the scale of its investment, dependency, or infrastructure control alone.
- **Freedom 6 (Dissent):** The freedom to contest the commons' direction without structural retaliation. Technical dissent shall not be sanctionable through behavioral governance.
- **Freedom 7 (Substrate):** The freedom to exercise these freedoms without revocable dependency. Fork must be materially viable, not just legally permitted.
- **Freedom 8 (Transparency):** The freedom to observe and audit the commons' governance, economics, and sanction proceedings. The default is visibility.

The Artifact Freedoms protect what you can do with the code. The Commons Freedoms protect the structural conditions for the ecosystem to persist. The originals were never wrong, and they were never merely ideological. They were never enough.

This is not free software. Free software protects the artifact and leaves the commons to fend for itself. This is not open source. Open source redefined the marketing and left the structural gap untouched. This is _sovereign source_: software whose commons governs itself, sustains itself, and cannot be captured by external power.[^sovereign]

## VIII. What Comes Next

The freedoms are the _what_. They name the structural conditions that must hold. They do not specify _how_ those conditions are implemented or _who_ enforces them. That is by design. Freedoms are structural constraints. Mechanisms are derived from constraints, not the other way around.

What remains is to make them livable. The freedoms need an engineering ethic: a governance architecture that encodes the boundary conditions, collective-choice arrangements, graduated sanctions, and conflict-resolution mechanisms that Ostrom's work identifies as necessary for any commons to survive.[^next-ethic] Without this layer, the freedoms are structural truths with no institutional muscle. With it, they become functional institutions that a maintainer can actually rely on.

And the ethic needs teeth. Not a license in the traditional sense, because copyright law cannot do this work. Copyright governs the copying and distribution of a fixed expression. It has no vocabulary for governance concentration, proportional commercial return, or behavioral sanction tracks. The SSPL failed structurally for exactly this reason: it tried to enforce commons obligations through a legal mechanism designed exclusively for the artifact. What sovereign source requires is an institutional substrate: a legal vessel bound to the commons' survival, a protocol that shifts extractive deployers from permissive copyright into binding contract law, and enforcement mechanisms that follow the _deployment_, not the entity. The details of that architecture are coming.[^next-license]

Imagine open-source projects that are not merely surviving on the fumes of volunteer guilt, but structurally funded in proportion to the value they generate. Projects where maintainers are not begging for GitHub Sponsors donations while trillion-dollar companies build empires on their unpaid labor, but are compensated as a matter of structural obligation. Where the feedback loop works: deployment generates return, return sustains maintenance, maintenance sustains the commons, the commons sustains civilization. Imagine a world where the benefit of the commons is not abused but _embraced_, because the incentive structure rewards contribution as reliably as the current one rewards extraction.

Imagine AI systems that are not the property of a handful of corporations racing to construct the most comprehensive surveillance apparatus in human history, but a legally protected public commons. Not "open-source AI" in the current, structurally hollow sense, where "open weights" that cost billions to produce are published as marketing while the training data, the compute infrastructure, and the governance remain proprietary. _Sovereign source_ AI: systems whose training data, model weights, and deployment infrastructure are governed by commons freedoms, sustained by proportional return, transparent to their participants, and immune from capture. AI deployed not to maximize engagement, monetize attention, and map every human behavior for the benefit of entities accountable to no one, but to identify and uphold the complex structural constraints required to keep a civilization functioning. AI as public infrastructure, not private panopticon.

The stakes could not be higher, and the timing could not be more urgent. Right now, at this moment, the most powerful technology ever created is being enclosed at unprecedented speed by entities whose structural incentive is total informational control. The surveillance infrastructure being laid across the developed world is not a distant threat. It is being built on the back of the open-source commons, by companies that depend on the very ecosystem they are strip-mining. If the commons dies before these freedoms take hold, the most powerful instruments of human coordination ever devised will belong permanently to the smallest number of people in history.

Imagine instead: maintainers paid proportionally to the deployment of their work. The freedom to say "this architecture is wrong" without losing your career. Forking a project and having it actually mean something, because the substrate isn't captured and the network isn't locked. Seeing where every dollar goes and how every decision was made. Intelligence systems that serve the commons instead of surveilling it.

That is what these freedoms produce when they function. That is sovereign source.[^vision]

These are tools, not rules. They are offered freely, verifiable by anyone, owned by no one. If the framework has done its job, you should be able to verify every claim in this piece against your own experience, accept or reject every derivation on its structural merits, and apply the expanded freedoms to any project you care about without asking permission from me or anyone else.

I intend to fix this. But I can't do it alone, and I wouldn't want to. That would be its own form of capture. Everything I've described here, every mechanism of extraction, every structural inversion, every hollowed freedom, proceeds because good people remain silent while the loudest voices set the terms. The great irony is that all these machinations of institutional decay are fragile. They depend on silence. They collapse the moment enough people see the structure for what it is and refuse to comply. The tools exist. The diagnosis is structural. The fix is derivable. What remains is the will to do the work.

Not free software. Not open source. Sovereign source.

If any of this resonates, don't wait for permission. Verify the claims. Test the freedoms against your own experience. And if they hold up, help me build what comes next.

[^sovereign]: "Sovereign" in its original sense: possessing supreme authority over itself. A sovereign commons is one that governs itself (Freedom 6), sustains itself (Freedom 4), resists capture (Freedom 5), controls its own substrate (Freedom 7), and is transparent to its participants (Freedom 8). Every commons freedom maps to an attribute of sovereignty. The word is chosen deliberately: "free" describes the artifact. "Open" describes the visibility. "Sovereign" describes the structural self-governance of the commons itself.

[^artifact-derivation]: The derivation chain for each artifact freedom: (1) Freedom 0 (Use): a dissipative structure must be able to deploy its components in response to environmental conditions (Prigogine, _Order out of Chaos_). Restricting execution is restricting the system's capacity to adapt. (2) Freedom 1 (Study): self-correction requires error detection; error detection requires inspection of internal state (Ashby's Law of Requisite Variety). Opacity blocks the feedback loops that maintain structural integrity. (3) Freedom 2 (Share): redundancy is the primary defense against catastrophic single-point failure. Redistribution creates structural resilience. (4) Freedom 3 (Modify): adaptation requires variation (any evolutionary or adaptive system must produce modified variants to survive environmental change). See [_Axiosophy_, §III](/blog/axiosophy#iii-the-structure) for the formal apparatus.

[^bedrock-link]: The full derivation appears in [_The Counterfeit_, §VII](/blog/the-counterfeit). The formal statement: ∀c ∈ Citizens: ∃path(c, Slavery → Mastery). A system composed entirely of agents who cannot inspect, understand, or modify the structures governing their lives is a system that has lost its capacity for self-correction. The point is not moral. It is thermodynamic: such a system will degrade because it has destroyed the feedback loops through which errors are detected and corrected.

[^vision]: The full governance model for sovereign source AI, including CVR applied to model training, commons governance of training data, and the structural conditions for AI sovereignty, is a topic that deserves its own treatment. This series lays the structural foundation. The application to AI follows from the same principles.

[^next-ethic]: The ethic will formally address Ostrom's remaining design principles: clearly defined boundaries (DP1), collective-choice arrangements (DP3), graduated sanctions (DP5), conflict-resolution mechanisms (DP6), minimal recognition of rights to organize (DP7), and nested enterprises (DP8). DPs 2 and 4 are already encoded as Freedoms 4 (Sustenance) and 8 (Transparency).

[^next-license]: The working model is a Commons Value Return based on the Georgist insight: tax the positional rent, not the improvement. The CVR is continuous and proportional, follows the _deployment_ not the entity, and is unrouteable because commercial deployment is a publicly visible fact. But the enforcement mechanism cannot be pure copyright. Copyright governs the artifact; the commons freedoms govern the ecosystem. The legal architecture likely requires a Purpose Trust (a legal entity whose fiduciary duty is the commons itself, not shareholders), a dual-state licensing protocol (permissive for small deployers, contractual covenant for extractive ones), and protocol-level enforcement that routes returns directly to maintainers without a centralized treasury.
