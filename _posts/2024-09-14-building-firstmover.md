---
layout: single
title:  "Building FirstMover"
subtitle: "FirstMover is an app that gets you StreetEasy notifications before anyone else."
date:   2024-09-14
---

I had one month to find a place to live in Manhattan. I reached out to friends for tips, and nearly all of them pointed me to [StreetEasy](https://streeteasy.com/), the Zillow-owned NYC real estate search platform. Some of my more Type-A friends gave me extra helpful advice:

- Narrow your search to 2-4 neighborhoods
- Understand brokerage fees and factor them into your rent budget
- Prepare recent pay stubs, bank statements, W2s, and rental history in advance
- Never turn down an opportunity to view an apartment
- *Download the StreetEasy app, turn on notifications, and check the site early and often. Dozens of listings appear hourly. **Every minute counts**.*

Every. Minute. Counts. A Redditor who recently leased their apartment reinforced this in [a recent post](https://arc.net/l/quote/jkdwghai):

> Be the first person to inquire. Yes, that sounds insane, because ultimately it's luck. But it's very important. The chances of you scheduling a showing or being taken seriously if you're anyone beyond the 10th person to inquire is extremely unlikely. Which means for the 240 other inquiries I received today, there was no point. Feel free to ask how many other people have inquired. If they tell you "many", or "we've had a lot of response" and they don't offer a showing time, then just move on. It's not going to happen. Be that first person for someone else's listing. The first person to inquire to my listing just happened to be really prepared, very eager and an awesome guy and got the apartment immediately.

Another commenter [echoed the sentiment](https://arc.net/l/quote/ohyvhlto):

> For me, the number one thing is being the first or one of the first to reach out. Last year my wife and I had Streeteasy and Zillow up day and night and would contact via text, phone, and email immediately (though email rarely worked).

Let’s call this [the First Mover Advantage](https://corporatefinanceinstitute.com/resources/management/first-mover-advantage/). Not only is it an established economic term, but it’s also a clever pun on "moving." And hey, I’m just a wild and funny guy 😜.

The problem with StreetEasy's phone notifications is that they simply don't give you a First Mover Advantage. They suck. Either I'd see a listing with 40 saves already, or I’d get hit with ones I’d seen multiple times (which I later learned were [sponsored content](https://streeteasy.com/business/)).

I wanted a notification tool that could alert me to new listings faster than StreetEasy itself. A bot that could monitor StreetEasy 24/7 and make it stupid-easy for me to inquire.

So, I built [FirstMover](https://www.firstmovernyc.com/).

FirstMover is a pretty simple app. [Here's the code for it](https://github.com/benfwalla/firstmover-api), if you're a programmer. Every 10 minutes, it scrapes StreetEasy for new listings. When it finds one, it sends a push notification to any user whose search criteria on FirstMover matches the listing. I built the v1 in a day, thanks to ChatGPT and some prior web scraping experience. For phone notifications, I used [Pushover](https://pushover.net/), a low-cost solution.

Within a week, FirstMover found us an apartment. I connected instantly, booked a next-day tour, submitted my application, and got the place. When I asked the broker why we were chosen, he said, "Well, you had good credit, but ***honestly, you were the first to respond***." That’s market validation, baby!

My co-founder Clayton and I are planning to productize FirstMover and offer it for $25/month.

### Why $25/month?

We think $25/month is a fair price to cover our costs (web hosting, DB hosting, [ScraperAPI](https://www.scraperapi.com/)) and make a little pocket change. Since our service is built for high-churn - helping you find an apartment, then moving on - we think $25/month (~86¢/day) is a reasonable value for a 24/7 assistant to help you land your next $3k apartment.

If you’re technical, you can always [clone my repo](https://github.com/benfwalla/firstmover-api) and set it up yourself. All I ask is that you reach out so we can collaborate on a future project 😄! ([LinkedIn](https://www.linkedin.com/in/benfwall/), [X](https://x.com/DJbennybuff))

### How will you find customers?

Not sure. We definitely don't want to buy any Google or Facebook ads. We don't have much of a social media following, let alone a network of NYC apartment hunters. Our plan is to start grassroots by joining relevant Subreddits and Facebook groups to build a waitlist. Maybe brands and influencers in complimentary markets, like [Kiki Club](https://kiki.club/), could spread the word in exchange for a revenue split. 

### Is this legal?

Great question! I *think* we're good. While Zillow and StreetEasy's Terms of Use prohibit scraping, it’s worth noting that *I never agreed to those terms*. All the data we’re collecting is publicly available, without a paywall or login. A guy who scraped Crunchbase [used a similar argument](https://x.com/adrian_horning_/status/1831396619184697789), which is pretty cool. He even cited two court cases, including [Meta v. Bright Data](https://arc.net/l/quote/lwotjipf), where the court explicitly ruled that "the Facebook and Instagram Terms do not bar logged-off scraping of public data; perforce it does not prohibit the sale of such public data."

This ruling sets a precedent that logged-off scraping of public data is fair game. It’s actually really interesting - especially when you consider its implications for both AI models and small projects like FirstMover.

### Final Thoughts

I'm excited for this. Not just because I think it's a great project that people will like, but that it aligns with business strategies that I've been thinking about for a long time. The Internet has greatly diminished the information gap between buyer and seller, and FirstMover is a service that gives buyers one small leg-up. 

It's funny that [I admired Zillow for doing exactly this 2004](https://ben-mini.com/2024/old-school-business#the-market-for-lemons), and now I'm contemplating if they'll sue me for doing that exact thing, lol. We'll see!