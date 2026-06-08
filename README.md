# Legendary Club Owner — Landing Page

A concept landing page that introduces **Legendary Club Owner** (a mobile football
management game by No Surrender Studio) to an English-speaking audience, built for
the Management Associate case study.

**Live page:** https://tygurlesin.github.io/lco-landing/

The whole experience is a single, mobile-responsive `index.html` file. It is built
around one target persona — *Alex, 24, a London football fan who plays mobile games
casually* — and one core idea: in this game your football knowledge wins, not your
wallet. No packs, no luck, no pay-to-win.

The interactive element is a 3-question quiz, **"What kind of manager are you?"**,
that sorts the player into one of four manager archetypes and ends on a shareable
result card.

## Files

| File | What it is |
|------|------------|
| `index.html` | The landing page (HTML/CSS/JS, hero image embedded). |
| `quiz.spec.js` | Playwright test that drives the live page. |
| `playwright.config.js` | Test config (runs on a desktop and a mobile viewport). |
| `package.json` | Dependencies and the `npm test` script. |

## The quiz logic

Each question offers three answers mapping to **Tactician (T)**, **Scout (S)** or
**Architect (A)**. The result is decided by how the three answers fall:

- **Same answer all three times** (e.g. T,T,T) → that pure archetype.
- **Two of one, one of another** (e.g. T,T,S) → the archetype you picked twice.
- **One of each** (T,S,A) → the hidden fourth result, **The Mentality Monster** —
  the rare "complete manager" who refuses to be just one type.

## Running the Playwright test

The test opens the **live** landing page and verifies the interactive element
actually works: it clicks through the quiz, checks that all three questions load,
confirms the result appears, checks two specific outcomes (The Tactician and the
hidden Mentality Monster), verifies the progress bar advances, and confirms the
"Take it again" button resets the quiz.

```bash
# 1. install dependencies
npm install

# 2. download the browser Playwright needs (Chromium is enough here)
npx playwright install chromium

# 3. run the tests
npm test
```

Expected output: all tests pass on both the `desktop` and `mobile` projects.

> Note: the test targets the deployed URL, so the site needs to be live (it is, at
> the link above). To test a local copy instead, change the `URL` constant at the
> top of `quiz.spec.js`.
