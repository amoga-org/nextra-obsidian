# Welcome to Your Obsidian Vault

This is your **Obsidian vault** for the Nextra documentation site!

Write your documentation here in Obsidian with all its powerful features:

- 📝 Rich markdown editing
- 🔗 Internal linking with `[[double brackets]]`
- 📊 Graph view of your content
- 🎨 Beautiful themes and plugins
- 📱 Mobile app support

## How It Works

1. **Write** your documentation in this `obsidian/` folder using Obsidian
2. **Build** your site with `npm run build` - it automatically copies content
3. **Preview** with `npm run dev:obsidian` for development with Obsidian sync

## Features

> [!NOTE]
> This vault integrates seamlessly with your Nextra site!

### Automatic Processing

- ✅ Converts `.md` files to `.mdx` automatically
- ✅ Preserves folder structure
- ✅ Skips hidden Obsidian files (`.obsidian/`)
- ✅ Only copies supported file types

### Obsidian Features Supported

- **Internal links**: `[[Page Name]]`
- **Tags**: #documentation #nextra
- **Callouts**: `> [!NOTE]`, `> [!WARNING]`, etc.
- **Code blocks**: Triple backticks with syntax highlighting
- **Math**: LaTeX math expressions
- **Images**: Local image attachments

## File Structure

Your Obsidian vault can have any structure you want:

```
obsidian/
├── index.md          # Homepage
├── guides/
│   ├── getting-started.md
│   └── advanced.md
├── api/
│   └── reference.md
└── _meta.js          # Navigation config
```

This will be copied to:

```
content/
├── index.mdx         # Converted to MDX
├── guides/
│   ├── getting-started.mdx
│   └── advanced.mdx
├── api/
│   └── reference.mdx
└── _meta.js          # Navigation config
```

## Getting Started

1. Open this folder in Obsidian
2. Start writing your documentation
3. Run `npm run build` to sync and build
4. Your Nextra site will be updated!

---

_Happy writing! 📝_
