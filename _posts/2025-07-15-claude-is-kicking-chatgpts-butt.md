---
layout: single
title:  Claude is kicking ChatGPT's butt (in one thing)
subtitle: A Pt.2 of Network Effects in Generative AI
date:   2025-07-15
---

Back in high school, I remember receiving an email for a study guide from a friend. Instead of the PDF coming attached, it was a link to a site called Dropbox. 

<img src="../assets/images/dropbox.png" alt="Arc 000610" style="zoom:30%;" />

Upon opening the file, you create an account. From there you're introduced to a feature stack that went well beyond any typical PDF: shared collaboration, comments, version history... the benefits of cloud computing- all within the familiarity of a PDF!

Dropbox achieved strong ***network effects*** in the 2010s due to generous free tiers, easy file sharing, and one-click account creation. Last year, I wrote [a blog post](https://ben-mini.com/2024/network-effects-in-generative-ai) on network effects, guessing if (and how) they would be brought into the AI market. In the post, I argued two points:

1. OpenAI began flirting with network-driven growth by introducing Custom GPTs in November 2023, and even more so when making them accessible to free users in May 2024.
2. AI companies might not *need* network effects to succeed, as user-generated content might not be what incrementally improves these tools (rather, artificial content, better memory, & great UX)

The rest of this post will be a follow-up of #1. In short, OpenAI appears to have [basically abandoned Custom GPTs](https://www.reddit.com/r/OpenAI/comments/1jt0bpl/please_stop_neglecting_custom_gpts_or_atleast/?utm_source=chatgpt.com) since their Spring '24 update, and I'm a bit stumped as to why. Sure, engagement might have been low, or a desire to shift the product team to other features like Canvas, improved memory, Deep Research, and Apple Intelligence integration. But, one would think that the allure of network effects would drive any consumer tech startup to continue toying with the idea!

Meanwhile, Anthropic's Claude has been quietly pursuing a more powerful way for users to build for other users. Two months after the Custom GPT release, [Claude announced Artifacts](https://arc.net/l/quote/vlgfaqcb), allowing users to create single-page HTML apps, among other things. Artifacts became a hit within the tech community, potentially mainstreaming "vibe coding" for the first time. Writer Simon Willison (or dare I say, **fellow** writer) [became quite obsessed with Artifacts](https://simonwillison.net/2024/Oct/21/claude-artifacts/) over the past year.

Unlike ChatGPT, Anthropic has doubled down on Artifacts, making it more reliable and accessible to users. And in June 2025, they went **big**. [Anthropic announced](https://www.anthropic.com/news/build-artifacts) that Artifacts can now become AI-powered:

> Today, we’re introducing [...] the ability to embed AI capabilities directly into your creations—transforming artifacts into interactive, AI-powered apps.
>
> Artifacts turn anyone into an app creator—no coding needed. Just tell Claude your idea to instantly create shareable apps, tools, and games.

Here's their announcement video of a drum-making kit. You'll see that users can "Describe [a] beat" in the Claude-powered search bar.

{% include video id="iSn77jvjojA" provider="youtube" %}

It's pretty cool! But, wouldn't the creator need to worry about API authentication? Then, users abusing their credits? Or entering abusive prompts that would flag their account? It appears not. [Here's](https://www.anthropic.com/news/claude-powered-artifacts) what makes this announcement newsworthy:

> Claude [turns] artifacts into AI-powered apps, where the economics actually work for sharing.
>
> When someone uses your Claude-powered app:
>
> - They authenticate with their existing Claude account
> - Their API usage counts against *their* subscription, not yours
> - You pay nothing for their usage
> - No one needs to manage API keys

While technically impressive, I find this to be an oddly brilliant business strategy for the prosperity of the Claude Chatbot- especially when Ben Thompson himself [categorized it as non-focus for Anthropic](https://arc.net/l/quote/lpprdifu). As an Artifact creator, I can infinitely extend the power of my Artifact at zero risk; all my users need is a Claude account.

**Claude is the Dropbox of the Gen AI era.** It's providing real value to the market for the return of user acquisition and CLV- something that its competitors are incapable or avoidant of doing.

### Coding is the easiest part

One week before this Artifacts update, the father of vibe coding himself, Andrej Karpathy, went on stage to deliver a talk about the continued shifts in software development. [At the end](https://youtu.be/LCEmiRjPEtQ?si=R4UGkDAxe1rNVJtz&t=1941), Andrej shared that while the "coding" step of app development is easier than ever, getting to that last mile of production deployment still exists:

<img src="../assets/images/andrej.png" alt="Andrej slide" style="zoom:33%;" />

While Claude Artifacts are still in this "toyish" phase of single-page web apps, you can't help but be in awe at all the things it solved on this slide: LLM API keys, Deployments, and Authentication. And no one needs to pay an Enterprise license to make it happen.

After Karpathy's talk, I spent most of my time thinking about "Payments". How hard would it be for a PayPal or Link to partner with a v0 or Lovable? I could see a future where vibe coded apps can be locked behind a paywall with one click- making apps as easy to monetize as a Gumroad product. I suppose pricing tiers would complicate things, but hey, there's nothing code can't solve!

Perhaps I'm romanticizing the tech ecosystem- Google can do everything on Andrej's slide. Maybe that's what [Sundar will task Varun and Douglas](https://techcrunch.com/2025/07/11/windsurfs-ceo-goes-to-google-openais-acquisition-falls-apart/) to do.
