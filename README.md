# 14.1 Scorebook: scorer.stingers.sg

A straight pool (14.1) scorer that runs on any phone. No sign-in: each player's match history stays on their own phone.

**How it's hosted:** the files live in the GitHub repository `scorer`. Cloudflare Pages (free plan) reads them from there and serves the site at https://scorer.stingers.sg. The DNS for stingers.sg stays at Vodien.

## Updating the app
1. In the GitHub repository, click **Add file → Upload files** and drop in the new files (usually only `index.html` and `sw.js` change).
2. Click **Commit changes**.

Cloudflare publishes each commit automatically within a minute or two. Phones pick up the update the next time the app is opened with a connection, and an "App updated" message confirms it. Players' match history isn't affected by updates.

## How the setup fits together (for reference)
- **GitHub:** public repository `scorer`, branch `master`, holding the app files. GitHub Pages is turned off, and there's no `CNAME` file.
- **Cloudflare Pages:** a Pages project connected to that repository. Framework preset *None*, no build command, output directory `/`. Custom domain `scorer.stingers.sg`.
- **Vodien DNS for stingers.sg:**
  - CNAME `scorer` pointing to the project's `…pages.dev` address.
  - TXT `_github-pages-challenge-mcdarren` (GitHub domain verification; keep it, it stops anyone else publishing a stingers.sg subdomain on GitHub Pages).

## Telling players how to install it
- **iPhone:** open https://scorer.stingers.sg in **Safari**, then tap **Share → Add to Home Screen**. Always open it from the home-screen icon: history saved there is protected, while Safari can clear a website's data after about a week unused.
- **Android:** open it in **Chrome**, then tap **⋮ → Install app** (or *Add to Home screen*).
- Back up now and then from **History → Back up (JSON)**. The app reminds you every 5 matches. **Restore backup** brings everything back on a new phone.
