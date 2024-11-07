---
title: "Building Parakeet: My First SaaS at 18"
excerpt: "A journey through creating a Twitter automation tool"
coverImage: "/parakeet/cover.jpg"
date: 2024-11-06
ogImage:
  url: "/parakeet/cover.jpg"
---

## The Genesis

My journey with Twitter started when I was 17. It was during the COVID lockdown and I was doing my first experiences as a freelancer on Fiverr. I was doing mostly small script and python projects

One day, a client wanted a script to automate some Twitter accounts. At first, it was for his personal usage. But then he made me make a small UI to make it easier to use. And he started to sell it to some friends. So the company [SeigRobotics](https://x.com/seigrobotics) started. The company was profitable but we were selling lifetime licenses, so we had trouble finding new customers every month. So the development stopped and the company ended.

Few months later, I still had contacts with old [SeigRobotics](https://x.com/seigrobotics) customers and with their feedback, I decided to create Parakeet - a tool for power-users of Twitter automation, with many more features. And I decided to go with a subscription business model.

https://thibault.sh/assets/parakeet/Parakeet_IO_Promo_Video.m4v


## The Market 

At this time, [shoes reselling](https://www.apetogentleman.com/sneaker-reselling-guide/) was a very profitable and popular business. People made "bots" to be faster at securing limited items. 

These bots could be worth more than $4,000+, and the bot companies would promote them by doing giveaways on Twitter where they gave away free licenses to lucky users. 

Parakeet was initially targeting users in that niche, helping them win licenses for sneaker reselling tools. In the last year of Parakeet's life, most users pivoted to crypto giveaways or online casino giveaways (still on Twitter).


## Building Phase

### Building the Software

I was starting from scratch. I ended up using Electron with React to make the UI and the [mantine.dev](https://mantine.dev/) component kit for the interface. 

I also had to learn Node.js development and TypeScript. 

### Avoiding Bot Detection 

The biggest issue with working with Twitter was avoiding account bans. For this, I used multiple approaches. 

#### Proxies 
At first, I was using rotating proxies, but it ended up not being the best solution. I had to come up with a system that kept the same proxy with a small account group (3-4 accounts per proxy maximum).

#### Browser Automation 
In the beginning, we were using the public API before switching to "Browser mode". The software started headless browser windows and executed tasks on the accounts. This approach worked well initially, but users kept complaining about the resource usage of such a solution (CPU and proxy data usage). 
I had to adapt and reverse engineer the Twitter website to find the private endpoints. 

#### Captchas and Twitter "Challenges" 
Sometimes when Twitter found an account suspicious, it would "lock" it until you performed a task (captcha/phone verification/temporary bans) to unlock it. I had to find a way to detect and notify customers when one of their accounts was locked. 
I also ended up integrating with the [2captcha](https://2captcha.com/) API.


## Business Growth & Challenges

The project started with a small group of users very close to me, who were highly involved in the product development, providing feedback and bug reports.
I also did some marketing on Twitter, but I soon started to get stuck growing the user base. I also struggled with confidence when it came to pushing heavy marketing or hiring someone to help me.

Someone contacted me and proposed to do marketing for Parakeet in exchange for equity, and I agreed. I think it was a mistake, because it didn't yield good results and I lost equity in the process.

I was still a student at that time, so I was working on it when I had time after classes. When I graduated and started working as a freelancer full-time, the time investment was no longer worth the revenue, so I ended up dropping the project.

Elon bought Twitter and made some changes, so Parakeet started to become obsolete in many features and users began to gradually unsubscribe.

## Reflection

Even if Parakeet didn't become as successful as I wanted it was an invaluable experience.
I did learn so much on programming, business, and "taxes". It also helped me selling myself when I started my fulltime freelance career. 

Since Parakeet, I'm eager to start another successful project. 


## Bonus : 
Here you can find how much revenue Parakeet made me during my college years : 

![Parakeet revenue pt1](/assets/parakeet/dashboard-results.png)
![Parakeet revenue pt2](/assets/parakeet/dashboard-results2.png)


The user documentation (with some screenshots of the app): 
[Parakeet User docs](https://parakeet-bots.notion.site/Parakeet-docs-v2-e261515e7e254900a53b5b90b94ff9bb) 