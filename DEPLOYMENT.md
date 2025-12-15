# Deploying Biomining Wiki to Vercel

Follow these steps to deploy your biomining wiki site to Vercel and get a live URL.

## Prerequisites

- A GitHub account
- A Vercel account (free tier is fine - sign up at [vercel.com](https://vercel.com))
- Git installed on your computer

## Step 1: Initialize Git Repository

Open Terminal and navigate to your project directory:

```bash
cd "/Users/arianacaiati/Documents/Digestables for AI/biomining-site"
```

Initialize a git repository:

```bash
git init
git add .
git commit -m "Initial commit: Biomining Wiki"
```

## Step 2: Push to GitHub

1. Go to [github.com](https://github.com) and create a new repository
   - Name it `biomining-wiki` (or whatever you prefer)
   - Don't initialize with README, .gitignore, or license (we already have these)

2. Link your local repository to GitHub (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/biomining-wiki.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository (`biomining-wiki`)
4. Vercel will auto-detect Next.js - keep all default settings
5. Click "Deploy"

That's it! Vercel will:
- Install dependencies
- Build your site
- Deploy it to a live URL

You'll get a URL like: `https://biomining-wiki-username.vercel.app`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to your project and deploy:
```bash
cd "/Users/arianacaiati/Documents/Digestables for AI/biomining-site"
vercel
```

3. Follow the prompts:
   - Link to existing project? → No
   - What's your project name? → biomining-wiki
   - Which directory? → ./ (current directory)
   - Auto-detected settings? → Yes

4. Deploy to production:
```bash
vercel --prod
```

## Step 4: Get Your Live URL

After deployment completes, you'll receive a URL like:
```
https://biomining-wiki.vercel.app
```

Or with your username:
```
https://biomining-wiki-yourusername.vercel.app
```

## Step 5: (Optional) Custom Domain

If you have a custom domain:

1. Go to your project in Vercel dashboard
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Updating Your Site

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically rebuild and redeploy your site!

## Build Settings (Vercel Auto-Detects These)

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install`

## Troubleshooting

### Build Fails

If the build fails, check:
1. All dependencies are in package.json (they are!)
2. No syntax errors in your code
3. Check build logs in Vercel dashboard

### Pages Don't Load

Make sure all pages have:
- `'use client';` directive at the top
- Proper Next.js Link components (not regular `<a>` tags)

These are already set up correctly in your project!

### Styles Don't Load

Verify:
- `globals.css` is imported in `app/layout.js` ✓
- Tailwind config points to correct directories ✓

## Success!

Once deployed, you can share your live URL with biologists and mining professionals to help them learn about biomining!

Your site will be accessible at your Vercel URL, with:
- ✅ Fast global CDN
- ✅ Automatic HTTPS
- ✅ Auto-rebuilds on git push
- ✅ Free hosting (on Vercel's hobby plan)
