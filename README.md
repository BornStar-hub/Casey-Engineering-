# Casey Engineered Maintenance Systems — Website

Static one-page site (plain HTML/CSS/JS, no build step) for caseyengineering.co.za.

## Structure
```
index.html
css/style.css
js/script.js
assets/        (empty — drop the logo here once received)
```

## Outstanding before launch
- [ ] Add real logo (currently a typographic wordmark placeholder in the header/footer)
- [ ] Confirm domain nameserver/DNS target once hosting is finalised
- [ ] Point `caseyengineering.co.za` DNS at whichever host is chosen

## Deploying

### Option A — GitHub + Vercel (free, git-based)
1. Push this folder to a new GitHub repo.
2. Import the repo in Vercel, framework preset: "Other" (static site).
3. Add `caseyengineering.co.za` as a custom domain in Vercel, then update the domain's nameservers/DNS records as Vercel instructs.

### Option B — Sive.Host (R10/pm, includes unlimited email)
1. Set up hosting on Sive.Host and upload these files via their file manager/FTP to the public web root.
2. Point the domain's nameservers to Sive.Host (or update DNS A/CNAME records per their instructions).
3. Set up SPF/DKIM records for the email accounts before using them for outbound mail, so mail doesn't land in spam.
4. Create the client's email accounts (e.g. info@caseyengineering.co.za) — this is also the upsell opportunity for BornStar.

Either way, no build tools or frameworks are involved — it's plain static files.
