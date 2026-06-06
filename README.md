# AI Engineer Portfolio

A dynamic, dark-themed portfolio for a fresher AI engineer built with React + Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed ([download here](https://nodejs.org))

### Run locally
```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Build for production
```bash
npm run build
# Output goes to /dist folder — deploy to Vercel, Netlify, GitHub Pages, etc.
```

## ✏️ How to Customize

Open `src/App.jsx` and edit the arrays at the **top of the file**:

| Variable | What it controls |
|---|---|
| `roles` | Typewriter text in hero section |
| `skills` | Skill bars with percentage levels |
| `projects` | Project cards (title, stack, metrics) |
| `timeline` | Education & experience entries |

Also update in the **Hero section**:
- Your name (`Arjun Kumar`)
- Bio paragraph text
- Stats strip numbers

And in the **Contact section**:
- Email, LinkedIn, GitHub, Hugging Face links

## 🛠️ Tech Stack
- React 18
- Vite 5
- Google Fonts (Syne, IBM Plex Mono, Inter)
- Pure CSS animations + IntersectionObserver
- No UI library dependencies
