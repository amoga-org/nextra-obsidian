# Getting Started with Obsidian + Nextra

Welcome to the most powerful documentation workflow! 🚀

## What You Get

Combining **Obsidian** with **Nextra** gives you:

### Obsidian Benefits

- 🧠 **Powerful writing environment** with live preview
- 🔗 **Bidirectional linking** between notes
- 📊 **Graph view** to visualize content relationships
- 🎨 **Beautiful themes** and extensive plugin ecosystem
- 📱 **Mobile apps** for writing on the go
- 🔍 **Advanced search** and content discovery

### Nextra Benefits

- ⚡ **Fast static site generation** with Next.js 15
- 🎯 **SEO optimized** with metadata API
- 🔍 **Powerful search** with Pagefind
- 📱 **Responsive design** out of the box
- 🚀 **Easy deployment** to Vercel, Netlify, etc.

## Workflow

### 1. Write in Obsidian

````markdown
# My New Page

This is a [[linked page]] that connects to other content.

> [!TIP]
> Use Obsidian callouts for beautiful notices!

```tsx
// Code blocks work perfectly
export function MyComponent() {
  return <div>Hello from Obsidian!</div>;
}
```
````

### 2. Build & Deploy

```bash
# Copy Obsidian content and build site
npm run build

# Development with auto-sync
npm run dev:obsidian
```

### 3. Enjoy the Results

Your Obsidian vault becomes a beautiful, searchable documentation site!

## File Organization

Organize your content however makes sense in Obsidian:

```
obsidian/
├── 📝 Daily Notes/
├── 📚 Documentation/
│   ├── User Guide.md
│   ├── API Reference.md
│   └── Tutorials/
├── 🎯 Projects/
└── 📎 Attachments/
```

The build script will copy everything to the `content/` folder for Nextra.

## Internal Linking

Create connections between your pages:

- `[[Page Name]]` - Link to another page
- `[[Page Name|Custom Text]]` - Link with custom text
- `[[Page Name#Section]]` - Link to specific section

## Obsidian Features

### Callouts

> [!NOTE]
> This is a note callout

> [!WARNING]
> This is a warning callout

> [!TIP]
> This is a tip callout

### Tags

Use tags to organize content: #documentation #guide #obsidian

### Templates

Create templates in Obsidian for consistent page structure.

### Plugins

Enhance your workflow with Obsidian plugins:

- **Templater** - Advanced templating
- **Dataview** - Query your notes
- **Calendar** - Daily notes integration
- **Mind Map** - Visual content organization

## Next Steps

1. **Install Obsidian** if you haven't already
2. **Open this vault** in Obsidian
3. **Start writing** your documentation
4. **Customize** the `_meta.js` files for navigation
5. **Build and deploy** your site

Happy documenting! 📖✨
