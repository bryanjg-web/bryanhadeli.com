# Bryan Hadeli - Personal Website

A minimal personal website inspired by [Shaan Puri's site](https://www.shaanpuri.com/) and [Max's Musings](https://maxsmusings.com/). Typography uses Lora. All content is driven by a single config file for easy updates.

## Updating content (modular workflow)

Everything is editable in **`site-config.json`**:

### Global
```json
{
  "siteName": "Bryan Hadeli",
  "pageTitle": "Bryan Hadeli",
  "bio": "Your one-line intro goes here.",
  "profileImage": "images/profile.jpg"
}
```

### Sections (Life Principles, Work and business, My Swipe File)

Each section has its own config block under `sections`:

```json
"sections": {
  "lifePrinciples": {
    "title": "Life Principles",
    "blurb": "The beliefs and values that guide how I live.",
    "posts": [
      { "title": "Principle 1", "slug": "principle-1", "date": "2025-02-15" },
      { "title": "Principle 2", "slug": "principle-2", "date": "2025-02-01" }
    ]
  },
  "workAndBusiness": {
    "title": "Work and business",
    "blurb": "Ideas and lessons from building and running businesses.",
    "posts": [
      { "title": "Post 1", "slug": "post-1", "date": "2025-02-10" },
      { "title": "Post 2", "slug": "post-2", "date": "2025-01-20" }
    ]
  },
  "swipeFile": {
    "title": "My Swipe File",
    "blurb": "Things that inspire me.",
    "viewAllLabel": "View all",
    "hideLabel": "Hide",
    "items": [
      { "type": "youtube", "url": "https://...", "title": "Video title" },
      { "type": "x", "url": "https://x.com/...", "title": "X post" }
    ]
  }
}
```

- **title**: Section heading (editable per section)
- **blurb**: One-sentence description under the heading
- **posts**: For lifePrinciples and workAndBusiness – title, slug, date (YYYY-MM-DD)
- **items**: For swipeFile – type (youtube, x, instagram, blog, quote, highlight), url, title; add `image` for custom preview; for quote/highlight use `text` instead of url
- **viewAllLabel** / **hideLabel**: Button text for the swipe file "View all" panel

### Adding a new blog post

1. Create the HTML file: copy `life-principles/_template.html` to `life-principles/my-post.html` (or under `work-and-business/`)
2. Add to config in the correct section's `posts` array:
   ```json
   { "title": "My New Post", "slug": "my-post", "date": "2025-02-22" }
   ```

## Local preview

Serve the site (required for config loading):

```bash
cd "/Users/bryangunawan/Bryanhadeli.com"
python3 -m http.server 8080
```

Then open http://localhost:8080

## Deploy (Free)

### GitHub Pages

1. Push to GitHub.
2. **Settings → Pages** → Source: **Deploy from a branch**, Branch: **main**, folder: **/ (root)**.

### Custom domain (bryanhadeli.com)

1. Buy the domain.
2. Add A records for GitHub Pages IPs and CNAME for www.
3. In GitHub Pages settings, set Custom domain to `bryanhadeli.com`.

## Project structure

```
├── index.html           # Homepage (renders from config)
├── site-config.json     # ← Edit everything here
├── js/site.js           # Loads config and renders
├── css/style.css        # Styles (Lora font)
├── images/
├── life-principles/     # Blog posts
└── work-and-business/   # Blog posts
```
