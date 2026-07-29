# Jaswant Jayacumaar — Portfolio

**Live site:** [jaswantj-portfolio.vercel.app](https://jaswantj-portfolio.vercel.app)

Personal portfolio of Jaswant Jayacumaar — Data Analyst in London, building
analytics platforms, marketing automation and production LLM tooling for
global e-commerce.

## What's on it

- **Hero** — with an animated, simulated run of an SEM bidding console:
  pull → classify → decide → preview → approve → apply
- **Stat band** — count-up figures for markets, automation tools and
  monthly campaign-change volume
- **Selected work** — eight case studies (contribution-margin reporting
  platform, SEM automation console, retrieval-grounded analytics agent,
  bidding decision systems, MCP toolchain, pricing intelligence, GA4
  tracking forensics, pulsar-timing research), each with a "proves:" line
- **Engineering standards** — the three questions every system has to
  answer: trustworthy, safe, unattended
- **Tooling, about & contact**

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- Fully static output — no server, no database, no client dependencies
  beyond React
- Animations are hand-rolled (IntersectionObserver scroll-reveal,
  requestAnimationFrame count-ups) and respect `prefers-reduced-motion`
- Open Graph image generated at build time via `next/og`
- Hosted on Vercel
