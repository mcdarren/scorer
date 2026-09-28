# 14.1 Scorebook: scorer.stingers.sg

A straight pool (14.1) scorer that runs on any phone. No sign-in: each player's match history stays on their own phone.

## One-time setup (about 20 minutes)

### 1. Put the files on GitHub
1. On github.com, click **New repository** and name it `scorer`. Private or public both work on your paid plan; the website itself is public either way.
2. In the new repository, click **Add file → Upload files**.
3. Drag in **everything in this folder**: `index.html`, `sw.js`, `store.js`, `manifest.webmanifest`, `jspdf.umd.min.js`, the four `.png` icons, `CNAME` and this README. (`.nojekyll` is hidden in Finder and optional; skip it if you can't see it.)
4. Click **Commit changes**.

### 2. Turn on GitHub Pages
1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to *Deploy from a branch*, **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
3. **Custom domain** should already show `scorer.stingers.sg` (it comes from the `CNAME` file). If it doesn't, type it in and click **Save**.

### 3. Point scorer.stingers.sg at GitHub (at Vodien)
Log in to Vodien and open the DNS settings for **stingers.sg**. Look for *DNS Management* on the domain, or *Zone Editor* if the domain sits on a Vodien cPanel hosting plan. Add one record:

| Type  | Name / Host | Value / Points to                | TTL     |
|-------|-------------|----------------------------------|---------|
| CNAME | `scorer`    | `YOUR-GITHUB-USERNAME.github.io` | default |

Replace `YOUR-GITHUB-USERNAME` with your GitHub username. Some panels want the full name `scorer.stingers.sg` in the Host field, and some want a trailing dot on the value (`…github.io.`). Follow what the form suggests.

### 4. Finish in GitHub
1. Back in **Settings → Pages**, wait for the DNS check to show a green tick. It usually takes minutes, occasionally a few hours.
2. Tick **Enforce HTTPS** once it becomes available. The app needs HTTPS to install and to work offline.
3. Recommended: in your **account** Settings → **Pages**, click **Add a domain** and verify `stingers.sg`. GitHub gives you one TXT record to add at Vodien. This stops anyone else from ever publishing a subdomain of stingers.sg on GitHub Pages.

Then open https://scorer.stingers.sg to check it works.

## Telling players how to install it
- **iPhone:** open https://scorer.stingers.sg in **Safari**, then tap **Share → Add to Home Screen**. Always open it from the home-screen icon: history saved there is protected, while Safari can clear a website's data after about a week unused.
- **Android:** open it in **Chrome**, then tap **⋮ → Install app** (or *Add to Home screen*).
- Back up now and then from **History → Back up (JSON)**. The app reminds you every 5 matches. **Restore backup** brings everything back on a new phone.

## Updating the app later
Upload the new files over the old ones (**Add file → Upload files**, then **Commit changes**). GitHub publishes within a minute or two, and each phone picks up the update the next time the app is opened with a connection. Players' match history isn't affected by updates.
