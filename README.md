# Nextra Documentation Site

Modern documentation site built with Nextra 4 and Next.js 15, featuring Obsidian integration for content management.

Write content in Obsidian, run `npm run build` and your Nextra Project output is ready to be uploaded to any static Site.

## Features

- **Nextra 4** with Next.js 15 App Router
- **Obsidian Integration** - Author content in Obsidian, auto-sync to Nextra
- **Auto-generated Navigation** - `_meta.js` files generated from file metadata
- **Search with Pagefind** - Full-text search capability
- **TypeScript Support** - Type-safe development

## Content Workflow

1. **Author in Obsidian**: Write content in `obsidian/` directory using markdown files
2. **Add Metadata**: Use mini blocks at the top of each file:

   ```markdown
   <!-- meta:page-key -->
   <!-- meta:Page Title for Navigation -->

   # Your Content Here
   ```

3. **Auto-sync**: Run build to copy content and generate navigation## Commands

```bash
# Development
npm run dev                 # Start Nextra dev server
npm run dev:obsidian       # Copy content and start dev server

# Building
npm run build              # Copy content and build for production
npm run copy-obsidian      # Manual content sync from obsidian/

# Search
npm run build:search       # Build Pagefind search index
```

## Project Structure

```
obsidian/          # Source content (author here)
├── index.mdx      # Homepage
├── getting-started.mdx
└── configuration.mdx

content/           # Auto-generated (don't edit directly)
├── _meta.js       # Generated navigation
├── index.mdx      # Copied from obsidian/
└── ...

app/               # Next.js App Router
├── layout.tsx     # Root layout
└── [[...mdxPath]]/
    └── page.jsx   # Dynamic MDX page renderer
```

## Metadata Format

Each Obsidian file should start with metadata comments:

```markdown
<!-- meta:getting-started -->
<!-- meta:Getting Started -->

# Getting Started

Your content here...
```

- **Line 1**: Page key (used in URLs and `_meta.js`)
- **Line 2**: Display title (shown in navigation)

Files without metadata will use filename-based defaults.
