---
layout: single
title:  One-click Feedback
date:   2025-07-20
---

It should be easy for app users to give feedback. Like, *really* easy. A couple clicks- boom boom. But in order for it to be most valuable for Product, that feedback must come stapled with awesome context and data.

**Duolingo** seems to nail feedback- at least for internal testing. In [How dogfooding helps us build a better Duolingo](https://blog.duolingo.com/dogfooding-app/), employees at the company get a special beta version of the app that features Shake-to-Report:

> Shake-to-Report works pretty much exactly how it sounds: if an employee encounters a bug while using the app, they can shake the device (or on Web clients, click a button), which pulls up an internal bug report form...
>
> To help diagnose bugs, reports automatically contain a screenshot and a host of metadata, including the experiments in which the user is currently treated, the user’s device and app version, and the user’s specific course and lesson data. We include a unique [Fullstory](https://www.fullstory.com/?ref=blog.duolingo.com) recording in every bug report that shows what a user was doing in the app before they experienced a bug. Shake-to-Report bugs also contain a log file, which is particularly useful as engineering teams often add log statements at different points to help debug issues.

Duolingo hits the trifecta: Shake-to-Report is fast, valuable, and *delightful*. Imagine being a Duolingo employee, identifying a bug, and getting giddy at the idea of sharing it with your team...

I believe dogfooding is a critical part of every well-crafted product. In fact, I believe a lack of it is [an existential risk to my startup](https://ben-mini.com/2025/whats-preventing-us-from-building-a-beautiful-product). Nevertheless, my team does periodically use the product. Our Sales team demos it, Customer Success trains new customers on it, and Engineering continuously tinkers in it (albeit in dev branches). So, it got me thinking... how do we make feedback easy, fun, and valuable for our team?

Right now, we're likely doing what most startups do: we have #feedback and #bugs Slack channels. We encourage all team members to share their thoughts in those. However, I noticed something alarming: **in the past two months, 79% of our feedback came from only three of our twenty employees.**

I find this problematic, because it's unlikely that our smart, talented workforce does not have an opinion of their company's output. There's a multitude of reasons why this imbalance exists:

- **Cultural:** Those top three employees likely have more intense ownership of the product and a personal incentive of fixing it. The rest of the team might not think it's part of their job or fear their feedback is "bad" or "a waste of time".
- **Exposure:** Certain team members simply don't use the product enough to develop thoughtful, pointed feedback (i.e. the no-dogfood conundrum)
- **Operational:** Sharing feedback can be too time-consuming or difficult to express, causing people to give up. And when they *do* submit feedback but nothing changes, it creates apathy toward the process.

Leadership can do a better job with the cultural issue. I'm still a bit stumped on how exposure can be reckoned. This leads me to the rest of my thoughts on making feedback operationally better.

There is so much that we (and all startups) can do to make feedback-sharing better than a Slack channel. We should go as far as to *productize internal feedback: consider and engineer the best damn internal feedback experience*. Great internal feedback is a privilege. Unlike outside customers, communication and privacy barriers are significantly diminished. You all use the same apps. Decorum and polish can be kept to a minimum. And, feedback systems perfected internally could very well transcend into a customer-facing solution

This week, [I vibe-coded a Google Chrome Extension](https://github.com/benfwalla/kibu-feedback-chrome-extension) only meant for my team. Now, during demos and prep calls, our team will be one click away from submitting feedback:

<img src="https://github.com/benfwalla/kibu-feedback-chrome-extension/raw/master/preview.png" alt="Extension Preview" style="zoom:50%;" />

In addition to a textbox, the submission captures your URL, triages it as a bug or feedback, and shares a screenshot upon request (the extension automatically captures your screen, saving you that extra step).

In the future, I would love to attach each submission to a [RUM log](https://docs.datadoghq.com/real_user_monitoring/)- exactly what Duolingo does with Fullstory. It would also be cool to remove the "Bug or Feedback" selector and just let AI triage it thanks to the added context. Hey, maybe even the textbox could be optional.

I'm obsessed with making feedback submission *as fast and low-calorie as possible*. I want five seconds to become two seconds. I want AI to do as much training as possible. I want [Devin](https://devin.ai/) to solve the simple stuff. I want to create a magical feeling to our non-technical team that not only does their feedback matter, but it might be able to be resolved in the middle of the freakin' demo.
