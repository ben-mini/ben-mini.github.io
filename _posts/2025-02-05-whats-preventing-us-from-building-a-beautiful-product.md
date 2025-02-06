---
layout: single
title:  "What's Preventing Us from Building a Beautiful Product?"
date:   2025-02-05
---

I just finished listening to [Lenny's conversation with Nan Yu](https://www.lennysnewsletter.com/p/linears-secret-to-building-beloved-b2b-products-nan-yu), Head of Product at Linear, about what it takes to build a great SaaS product.

Like many SaaS apps, the [Kibu](https://kibuhq.com/) team and I have taken inspiration from Linear. But as we plan our roadmap and implement new solutions, I ask myself: *What’s preventing us from building a product as beautiful as Linear, Slack, or Figma?* Sure, time and resources matter, but I sense deeper things at play.

Lenny and Nan's conversation shed light on Linear’s approach and helped me articulate some thoughts:

### No Dogfooding

Nan said that ideas for SaaS apps often start as useful products inside of larger companies. A typical story: a developer solves a personal problem, shares it with her coworkers, gets tons of praise, and considers if other companies have the same problem. I recall [the story of Slack going a lot like this](https://buildingslack.com/the-death-of-glitch-the-birth-of-slack/), and I suspect Linear is similar. The advantage of this approach is that *the founder is customer zero*. By building for yourself, user empathy has an instantaneous feedback loop, allowing you to rapidly build based off "vibe" alone. This is obvious advice, as the "built by X, for X" has been a marketing cliche for decades. It explains why the most lauded products in app design are almost always built by a team who can dogfood their own product.

Kibu cannot dogfood its own product. As a content provider and documentation platform built for disability providers, Kibu operates with no day-to-day usage of its own product, as one may see at Linear, Slack, or Figma. Without dogfooding, "vibe development" is overshadowed by the voice of the customer. Of course, there's nothing wrong with customer feedback, but Kibu's lack of dogfooding handicaps our ability to have that "spidey-sense" of our customers' needs. This could lead us down a complicated or unscalable path. I am particularly concerned with the latter, as our stellar dev team *always* ensures the UX passes user acceptability. 

I wonder how Kibu can mitigate our inability to dogfood:

1. *Try to dogfood*: We once tried dogfooding by documenting our company goals and providing weekly updates in Kibu (similar to how our customers provide daily updates to their special needs members' life plan goals). This was a positive step but still a square peg in a round hole. We simply do not operate with the same speed, setting, vocabulary, or consequences as our customers.
2. *Hire industry folks*: Wow, wouldn't it be nice to hire a former caretaker that turned into a valuable SaaS contributor! We're starting to find those on the business side, but we haven't found an engineer that fits that description. Regardless, by joining Kibu, the employee would have left the industry and no longer be engaging in Kibu. I assume that Strava developers still jog after getting hired lol...
3. *Ignore the issue and build*: This has been our status quo and likely will be for a while. Let’s double down on customer feedback by scheduling recurring meetings with diverse users. Maybe we even pay them!

Is there a company that we can take inspiration from that's been in our position? ***What’s the most beautiful app that can’t be dogfooded?*** My first thought is Shopify, as I'm guessing Tobi Lütke and the whole team don't personally maintain an e-commerce snowboard shop. Let me know if you can think of other companies.

### Saying No to "The Man"

On the topic of preventing bloat, Nan said Linear is hyper-focused on delivering an exceptional [IC](https://chatgpt.com/share/67a41418-9ea4-800e-908f-9f621ae85250) experience and is willing to turn down feature requests that don't align with that vision. For example, if Nan got a request from a middle manager to make end-of-month reporting slightly easier, Linear will deny that request if it means the IC's work is strained a bit. 

This "bottom-up" prioritization philosophy is downright enviable! Kibu is in the business of *compliance*, meaning that we are limited to the needs of our customers' regulators. If a government agency or grant provider wants our customer to complete a 3-page questionnaire for every member every day, then our customer has no choice but to pass that requirement down to us. Our ability to design a frictionless experience for ICs hits a ceiling when met with regulation, no matter how dumb.

This hindrance is particularly frustrating because *we recognize the economic value that an exceptional IC UX could bring to our customers*. If a low-level caretaker can take notes and track attendance on a tool that won't make them want to blow their brains out, then:

- The data will be better, incurring less failed audits and penalties.
- The data will be better, allowing management to better identify inefficiencies that lead to better resource allocation.
- The staff will spend less time record-keeping and more time caring, leading to better outcomes and success stories.

At the same time, regulation is why Kibu Documentation exists in the first place, so if we're sticking to a Linear-like "bottom-up" product strategy, then *it is our duty to make compliance painless, if not a little fun*. 

- *Reports Come Second:* While the economic buyer and regulators relentlessly emphasize the importance of reports, Kibu must remember that reporting is merely a representation of rows and columns. *What truly matters is the data inside*—which aligns with our philosophy of prioritizing the IC’s data input experience. Kibu has already done a great job delegating customers' reporting needs to the Customer Success team (hey, that’s me!) with custom [Looker](https://lookerstudio.google.com/) reports. Customers stay happy with white-glove reporting, while our product team remains focused on ICs.
- *No BS copy*: On the front page of every customer's Documentation homepage, we have large text that reads **"Your org is X% compliant. Found out why"** If the goal is compliance, then let's not blur anything. I'd rather sacrifice a little extra text on the page if it means our nontechnical users know exactly where to go and why. We should take this one step further and extend it to each entity in Kibu, like the member: ***"Here's what you need to do to be fully compliant with Athena..."***
- *More unicorns:* Whenever you complete a task in Asana, [a unicorn flies across your page](https://zapier.com/blog/asana-celebrations/)! So cool. Per my bullet points above, a fun Kibu experience will lead to better financial outcomes for our customers.

### Tiny Thoughts

Okay, the two sections above were the most provocative. Here are some more takeaways that Kibu is already doing. If we're not, I don't think it would be too controversial to implement:

**Y-combinatify Kibu:** Our marketing page should be fast, fun, minimal, with lots of polished-up screenshots of our product (like [Superhuman](https://superhuman.com/) or [Mintlify](https://mintlify.com/)). Our brand should be "the new kids on the block" or "finally... Silicon Valley's best are solving my disability provider problems"

**Say No to Enterprise:** Linear demonstrates great restraint in saying no to Enterprise-level requests that they believe will lead to poor long-term growth. My last company experienced this, and I’m wary of going through it again.

**The 11-star Experience:** The Linear team occasionally plays in a world where resources are unlimited and they are designing the best gosh-darn experience. The team is always surprised by the ideas that are actually viable! Kibu should do the same... a love one developer's idea of "Call Kibu", where an IC can simply call a phone number and log their notes for the day- having a back-and-forth conversation with a robot, that ensures compliance needs are met.
