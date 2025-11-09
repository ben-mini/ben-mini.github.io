---
layout: single
title:  Everything is a Spreadsheet
date:   2025-11-09
---

Revisiting an old [2020 Invest Like the Best podcast](https://open.spotify.com/episode/0Ok2HlpJ06C8c2Wrhm8Nkv) that interviews John Collision, co-founder of Stripe. When asked about his thoughts on no-code:

> I don't think no-code is fully a panacea. Even when you're doing no-code, you're still reasoning about the relations between different objects and data flows and things like that. When you're building an app with Zapier, you're still doing a form of engineering.
>
> If you're looking at Excel, I think it is one of the most underappreciated programming environments in the world. The number of Excel programmers versus people using what you’d probably think of as more traditional languages is really something to behold. I actually think there are lots of features of Excel that make it a really nice programming environment and really nice to learn in.
>
> The fact that it's continuously executed means that, unlike running your code and getting some error that's hard to comprehend, the code is just continuously executed in the form of the sheets you see in front of you. And the fact that it's individual cells and you lay out the program spatially, where the code and the data are interspersed and no one part gets too big, is really useful.
>
> There are all these ways in which anyone who's developing a no-code or new software paradigm should look at Excel, because so many people have managed to essentially learn how to do some light programming by looking at other people's models and workbooks and emulating what they see.

Yep- everything is a spreadsheet. If you're *okay* at Excel, you're in the 99% percentile of most "technical" people on Earth. 

This summer, I reflected on why [Google Sheets is the greatest application](https://x.com/DJbennyBuff/status/1950253676435583460?s=20) of all time: the ability to extend the Excel GUI into the cloud, introducing both APIs and multiplayer, is truly a marvel. But the core concepts of spreadsheet software have been so important to my development.

The building blocks of any modern application begin with **entities**, the core nouns of the system. These entities are described by **attributes**, the adjectives that give each proper noun expression. **Relationships** connect entities to one another, giving the system structure and identity. And **methods** introduce behavior, allowing the application to perform computations that change entities.

What is a spreadsheet but:

- A series of **tabs** (entities)
- **Columns** on each tab (attributes)
- `VLOOKUP` and `INDEX` **formulas** between tabs (relationships)
- A library of other formulas that creates or mutates data to the user's desire (methods)
- An approachable interface that allows users to present data however they wish

<img src="../assets/images/Arc 002222.png" alt="Google Sheet preview" style="zoom:20%;" />

If our goal as technologists is to put the *creative* power of computing into the hands of every human, I firmly believe that this understanding of data and applications is baseline knowledge for everyone. This is what Collison meant in the quote above about no-code builders still needing "reasoning about relationships and data flows".

*This* is a foundation of data literacy. There- if anyone ever told to become more data literate, I just gave you a crash course.

I've been thinking a lot about this concept for a few reasons:

- **Learning the basics.** It's not that deep. Every application is secretly a fancy Excel sheet. Whenever you're learning or communicating a new application, consider how you would rebuild it in a spreadsheet. The number of tabs relative to the number of formula is a good indicator of if their strategy is more breadth or depth. If the application asks you define your own tabs, it's [more of a platform](https://ben-mini.com/2024/what-is-a-platform).
- **10x'ing vibe coding**. I can guarantee non-technical vibe coders that if they communicate their application needs like they're building an Excel sheet, they will 10x their effectiveness. Tell the AI what your nouns are, the actions they ought to do, and their relationship with one another.
- **Building better product.** Whenever I'm met with a new product challenge, I use Excel as my mental model to figure out the data I'm working with and how it impacts the customer. How might this spreadsheet look to the customer, are we confident we know the right formulas, and how do we feel about how this spreadsheet might evolve?
