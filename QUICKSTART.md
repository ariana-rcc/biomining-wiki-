# Quick Start Guide

## Test Locally First (Recommended)

Before deploying to Vercel, you can run the site locally to make sure everything works:

### 1. Install Dependencies

Open Terminal and navigate to your project:

```bash
cd "/Users/arianacaiati/Documents/Digestables for AI/biomining-site"
```

Install the required packages:

```bash
npm install
```

This will install Next.js, React, Tailwind CSS, and Lucide icons.

### 2. Run Development Server

```bash
npm run dev
```

### 3. View Your Site

Open your browser and go to:
```
http://localhost:3000
```

You should see your Biomining Wiki home page!

### 4. Test Navigation

Click through the different sections:
- For Biologists path
- For Mining Professionals path
- Glossary
- Complex Materials
- Flowsheets
- Research Frontiers

Make sure everything loads and looks good.

### 5. Stop the Server

When you're done testing, press `Ctrl+C` in Terminal to stop the server.

---

## Ready to Deploy?

Once you've tested locally and everything looks good, follow the [DEPLOYMENT.md](DEPLOYMENT.md) guide to deploy to Vercel and get your live URL!

---

## Quick Commands Reference

```bash
# Install dependencies (first time only)
npm install

# Run development server (for local testing)
npm run dev

# Build for production (Vercel does this automatically)
npm run build

# Start production server locally
npm run start
```
