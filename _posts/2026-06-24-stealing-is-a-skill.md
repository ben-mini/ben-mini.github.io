---
layout: single
title: Stealing is a Skill
subtitle:
date: 2026-06-24
---
I'm slowly developing my own list of advice: have [a creative mindset](https://ben-mini.com/2023/the-meaning-of-life), embrace [radical transparency](https://ben-mini.com/2024/the-browser-company-and-radical-transparency), and write down [what makes you happy](https://ben-mini.com/2026/the-happiest-ive-ever-been). I'd like to add one more to the list: stealing is a skill!

Stealing is good for the soul. If done well, you will be able to build value at lightning pace and learn about yourself along the way.

But what is "stealing"? Is reading from a textbook considered stealing? Adopting an open-source library into your codebase? No- that's not radical enough... I'm talking about *literally copying another person's creation.* 

My coworker Justin taught me about "[the 3% approach](https://youtu.be/qie5VITX6eQ?si=zVY-UXrfYDf-kuf5&t=717)", coined by the late creative, Virgil Abloh. When designing his version of Air Force 1s, Abloh disciplined himself to only edit 3% of the original design, so as not to dilute the original work perfected by visionaries before him.

Abloh never went into much detail beyond that, but Justin and I began to make it our own at Kibu. I love the 3% approach¹, particularly when engaging in a project unfamiliar to you. When asked to alter 3% of something, you are challenged to determine *which 3% you ought to alter*. This forces you to inspect all 100% of that thing: every stitch and seam of the original. To us, the best way to get to 3% was to *rebuild something we loved, stitch by stitch.* We had to steal to succeed.

Justin and I wanted to rebuild [our marketing site](https://www.kibu.com), but we lacked a solid vision. We knew we wanted a beautiful [top-fold](https://www.shopify.com/blog/above-the-fold) and a modern, minimal component library that could be reused across pages. We came across [Mintlify's 2025 marketing site](https://web.archive.org/web/20250901075903/https://mintlify.com/) and fell in love: an eye-grabbing top-fold, decisive use of colors, and a "show, don't tell" ethos revealed all we wanted to create. The fact that Mintlify and Kibu are both documentation tools (albeit *very* different definitions of the word) was an added bonus. So, **we literally rebuilt the Mintlify site, pixel-by-pixel.**

![[mintlify v kibu.png]]

When you recreate someone's creation, you learn their story: every piece of brilliance, tradeoff, and imperfection. *Why add a hover effect here and not there? What does three consecutive black and white sections do to the mind? Oh wow, look how all components' widths fall perfectly flush with the floating, bg-blurred navbar:*

![[mintlify-zoom.gif]]

Mintlify's site wasn't perfect by any stretch: yet stealing it proved to be an efficient way to achieve our goals. And as we stole, our intuitions brought us to that 3%. *Our nav popover can be much more minimal. Our team is our brand- let's add their pictures to the CTA buttons. Part of our product is videos- let's have more videos than screenshots.* These little "side quests" taught us more about our brand than any 3-day workshop could have. In less than a month of weekend work, we had a deployed site in Framer². 

Coming out of this project, I had a newfound perspective of stealing. While I've always admired certain people's crafts, I now prioritize it in my ideation process. No matter the project, I always ask myself and my team, "has anyone done something similar before us?" There's thousands of free blogs, podcasts, and videos on problems you're actively solving. It's never been easier to prompt AI with your use case and ask who's come across this issue before you. However, it's your job to go down the rabbit hole, learn the 100%, and sprinkle in your 3%.

At the beginning of my career, I believed I'd be rewarded for the originality of my ideas. The truth is that you're rewarded for identifying and solving problems efficiently. And odds are, smarter people before you have already done both. So, turn stealing into a skill: spend your days identifying *what* you ought to steal, *why* you ought to steal it, and *how much* you'll steal of it. 

>“Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn’t really do it, they just saw something.” - Steve Jobs

Blech. So cliche to end on a Jobs quote. One more:

>Everything I do references something that influenced me." - Virgil Abloh

---
¹ Abloh's "3% approach" is an *approach*, not a *rule*. If you Google this term, you'll find a lot of blogs fetishizing this as a sacred *rule*. I'd guess Abloh himself would dissuade you from that line of thinking. Abloh developed this concept in context to his work in a new Air Force 1 series: the fundamental task to mimic an existing design- a distinguished design that I'm sure Abloh heavily revered. You are allowed to be original! There is a spectrum to creative originality. This post is about one end of the spectrum.

² In March 2026, we migrated off Framer and into a full codebase. We bet that vibecoding would allow us to move faster than a drag-and-drop builder with ancillary AI tools and lock-in. We think it's paying off!