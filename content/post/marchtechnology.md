---
title: 'The March of Technology'
category: 'Other'
date: 'June 12, 2026 18:00:00'
author: 'Vertette'
thumbnail: '/img/web_dev.jpg'
---
Technology is a fascinating industry to work in. New tools, frameworks and software are coming out all the time, and as a (web) developer it's part of the job to keep your skills honed. That's not to say all of the coworkers I've had bothered, but that's how you end up stagnating and becoming unemployable. As for me, I'm always looking for new toys to experiment with and love coming up with solutions how to automate more of my processes.

![A screenshot of my IDE while I'm working on the new version of this blog](/img/web_dev.jpg)
*I once appeared in the background of a documentary about web development. The director admitted he didn't understand anything on my screen, but thought it looked cool all the same.*

Part of the reason why it was such a pain to update this blog was because it was a locally run Node app that would generate static HTML files for GitHub Pages using Playwright. This worked well for a while but ended up breaking a lot, which is mighty inconvenient when you just want to put up an article or fix some typos. All of this is a lengthy prelude to the fact that I've updated the blog to make use of Tailwind and Nuxt instead of Bootstrap built on top of my own mess. This is the same stack that I've used on the [Cliax Games website](https://cliax-games.com/) for some years now, although the source code for that is (obviously) not publicly accessible and the generated pages are stored on an external server. Speaking of, the source code for this blog is fully [accessible on GitHub now](https://github.com/vertette/vertette.github.io) in case you're just dying to know how much of this blog was vibed (none of it).

Some web developers might ask at this point why I would ever use Vue/Nuxt over React, the most popular SPA JavaScript framework right now. Now I _have_ tried it, but I genuinely cannot stand using React. It's a mess of a framework, filled with problems that are exclusive to its own ecosystem which cause a lot of debates over what the "best solution" is to fix all the crap you have to deal with. I can just end most of those debates by using Nuxt. Vue files also keep their HTML and JavaScript completely separate instead of having you write HTML in your JavaScript, which is how JSX files do it (which is what most React projects use and I hate it), and Vue/Nuxt is less bloated and slow on top. If you don't know what any of that means, trust me, don't worry about it. In another ten years, we will all be using [completely different stacks anyway](https://www.youtube.com/watch?v=aWfYxg-Ypm4).

![A screenshot of Pokémon Yellow where Red talks to the TECHNOLOGY IS INCREDIBLE man](/img/pokemon_tech.jpg)
*"I can load in a JavaScript bundle that's 500mb big to generate a site in 5 seconds just so I can avoid using PHP!"*

Now that updating this blog is much less of a hassle, I hope to put up some more articles soonish. I've missed writing.