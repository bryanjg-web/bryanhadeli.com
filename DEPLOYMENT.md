# Deploy bryangunawan.com

Step-by-step guide to buy the domain, host your site, and connect them.

---

## Step 1: Buy the domain (bryangunawan.com)

**Option A: Cloudflare (recommended – at-cost pricing, no markup)**

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up/login
2. Click **Domain Registration** in the sidebar
3. Search for `bryangunawan.com`
4. Add to cart and checkout (typically ~$10–12/year for .com)

**Option B: Porkbun** – [porkbun.com](https://porkbun.com) – often cheap, simple checkout

**Option C: Namecheap** – [namecheap.com](https://namecheap.com) – popular, frequent discounts

---

## Step 2: Host the site (Cloudflare Pages – free, fast, global CDN)

### 2a. Push your code to GitHub

If you haven’t already:

```bash
cd "/Users/bryangunawan/Bryanhadeli.com"
git add -A
git commit -m "Ready for deployment"
git push origin main
```

If the repo doesn’t exist yet, run `./scripts/setup-github.sh` first (see SETUP-GITHUB.md).

### 2b. Deploy to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
2. Click **Create** → **Pages** → **Connect to Git**
3. Connect your GitHub account and select your repository
4. Configure the build:
   - **Build command:** leave empty (static site)
   - **Build output directory:** `/` (root)
   - **Root directory:** `/` (or leave blank)
5. Click **Save and Deploy**

Your site will be live at `https://your-project.pages.dev` in about a minute.

---

## Step 3: Connect your domain

### If you bought the domain on Cloudflare

1. In **Workers & Pages** → your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `bryangunawan.com` and `www.bryangunawan.com`
4. Cloudflare will add the DNS records automatically
5. SSL is enabled by default

### If you bought the domain elsewhere (Porkbun, Namecheap, etc.)

**Option 1: Use Cloudflare for DNS (recommended)**

1. Create a free Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Add your site → enter `bryangunawan.com`
3. Cloudflare will show two nameservers (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`)
4. At your domain registrar, update the nameservers to those two
5. In Cloudflare Pages → your project → **Custom domains** → add `bryangunawan.com` and `www.bryangunawan.com`
6. Cloudflare will create the required CNAME records

**Option 2: Keep DNS at your registrar**

1. Add a **CNAME** record:
   - Name: `@` (or `bryangunawan.com`) – some registrars use `@` for root
   - Target: `your-project.pages.dev` (from your Cloudflare Pages project)
2. Add another **CNAME** for `www`:
   - Name: `www`
   - Target: `your-project.pages.dev`

> **Note:** Some registrars don’t support CNAME on the root domain. In that case, use Cloudflare for DNS (Option 1) or add A/AAAA records if your host provides them.

---

## Step 4: Verify

1. Visit `https://bryangunawan.com` – it should load your site
2. Visit `https://www.bryangunawan.com` – it should redirect or load the same site
3. Run a quick check: [PageSpeed Insights](https://pagespeed.web.dev/) – your static site should score well

---

## Performance notes

- **Cloudflare Pages** serves your site from a global CDN
- **Cache headers** (`_headers` file) cache CSS, JS, and images for a year; HTML for 1 hour with stale-while-revalidate
- **Font preload** and **defer** on scripts reduce render-blocking
- **Profile image** uses `fetchpriority="high"` and `loading="eager"` for faster LCP

---

## Updating the site

After you change content:

```bash
git add -A
git commit -m "Update content"
git push origin main
```

Cloudflare Pages will redeploy automatically (usually within 1–2 minutes).
