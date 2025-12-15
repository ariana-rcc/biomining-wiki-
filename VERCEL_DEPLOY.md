# Deploy to Vercel - Simple Steps

## 🚀 Fastest Path to Your Live URL

### Step 1: Push to GitHub

```bash
cd "/Users/arianacaiati/Documents/Digestables for AI/biomining-site"

# Initialize git (if not done)
git init
git add .
git commit -m "Biomining Wiki - ready for deployment"

# Create a new repository on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/biomining-wiki.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Visit **[vercel.com/new](https://vercel.com/new)**
2. Click **"Continue with GitHub"** (sign in if needed)
3. Click **"Import"** next to your `biomining-wiki` repository
4. Click **"Deploy"** (Vercel auto-detects Next.js settings)

### Step 3: Get Your URL! 🎉

Within 2-3 minutes, you'll have a live URL like:
```
https://biomining-wiki.vercel.app
```

That's it! Your site is live and accessible to anyone.

---

## Updating Your Site

After the initial deployment, updates are automatic:

```bash
# Make changes to your files
# Then commit and push:
git add .
git commit -m "Updated content"
git push
```

Vercel automatically rebuilds and redeploys within minutes!

---

## What Vercel Does Automatically

✅ Installs dependencies
✅ Builds your Next.js app
✅ Deploys to global CDN
✅ Provides HTTPS
✅ Auto-rebuilds on every push
✅ Free hosting (hobby tier)

---

## Alternative: Deploy Without GitHub

If you prefer not to use GitHub:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy directly
cd "/Users/arianacaiati/Documents/Digestables for AI/biomining-site"
vercel

# For production deployment
vercel --prod
```

You'll still get a live URL, but you'll need to run `vercel --prod` manually for updates.

---

## Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

Your site is ready to deploy right now - all configuration is complete! 🚀
