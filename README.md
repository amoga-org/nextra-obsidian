# Fresh Nextra 4 Documentation Site

A modern documentation site built with **Nextra 4** and **Next.js 15** from scratch.

## 🚀 Features

- ✅ **Nextra 4** - Latest version with App Router support
- ✅ **Next.js 15** - App Router with server components
- ✅ **Turbopack** - Faster development builds
- ✅ **Pagefind** - Rust-powered search engine
- ✅ **TypeScript** - Full type safety
- ✅ **GitHub Alerts** - Automatic callout conversion
- ✅ **No legacy code** - Fresh start, no backward compatibility

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Static Site Generator**: Nextra 4
- **Styling**: Tailwind CSS (via Nextra theme)
- **Search**: Pagefind
- **Development**: Turbopack
- **Language**: TypeScript

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with Nextra theme
│   └── [[...mdxPath]]/
│       └── page.jsx            # Catch-all route for MDX content
├── content/
│   ├── _meta.js               # Navigation configuration
│   ├── index.mdx              # Homepage
│   ├── installation.mdx       # Installation guide
│   ├── configuration.mdx      # Configuration guide
│   └── deployment.mdx         # Deployment guide
├── mdx-components.tsx         # Global MDX components
├── next.config.mjs           # Nextra configuration
└── package.json
```

## 🎯 Key Differences from Nextra 3

- **App Router**: Uses Next.js 15 App Router instead of Pages Router
- **No theme.config**: Configuration moved to layout components
- **Server Components**: Better performance with RSC
- **Pagefind Search**: Rust-powered search instead of FlexSearch
- **Turbopack Support**: Faster development experience
- **Modern Setup**: No legacy dependencies or configurations

## 📖 Documentation

- **Getting Started**: `/` - Introduction and overview
- **Installation**: `/installation` - Setup guide
- **Configuration**: `/configuration` - Customization options
- **Deployment**: `/deployment` - Production deployment

## 🔍 Search

This project includes Pagefind for powerful search functionality:

- Indexes all content automatically
- Works with dynamic content
- Fast Rust-powered search
- No client-side indexes needed

## 🚀 Deployment

### Static Export

```bash
npm run build
# Outputs to `out/` directory
```

### Vercel (Recommended)

```bash
npx vercel
```

### Other Platforms

The site can be deployed to any static hosting platform:

- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 📝 Development

### Add New Pages

1. Create a new `.mdx` file in the `content/` directory
2. Update `content/_meta.js` to include the new page
3. The page will automatically appear in navigation

### Customize Theme

Edit `app/layout.tsx` to customize:

- Colors and styling
- Navigation
- Footer
- Search configuration

### Add Components

Add custom MDX components in `mdx-components.tsx`.

## 🔧 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ using Nextra 4 and Next.js 15
