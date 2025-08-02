# Advanced Obsidian Integration

Learn advanced techniques for using Obsidian with Nextra.

## Custom Processing

The build script can be extended to handle Obsidian-specific features:

### Internal Links

Convert `[[Page Name]]` to proper Nextra links:

```javascript
// In copy-obsidian-content.js
function processObsidianLinks(content) {
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    const [page, section] = linkText.split("#");
    const slug = page.toLowerCase().replace(/\s+/g, "-");
    return section
      ? `[${linkText}](/${slug}#${section})`
      : `[${page}](/${slug})`;
  });
}
```

### Attachments

Handle image and file attachments:

```javascript
// Copy attachments to public folder
async function copyAttachments(src, dest) {
  const attachmentExts = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".pdf"];
  // Copy logic here
}
```

## Obsidian Plugins

### Recommended Plugins

1. **Templater**

   - Create consistent page templates
   - Auto-generate front matter
   - Dynamic content insertion

2. **Dataview**

   - Query your documentation
   - Generate index pages
   - Create content dashboards

3. **Tag Wrangler**

   - Manage documentation tags
   - Rename tags across vault
   - Tag hierarchy

4. **Advanced Tables**
   - Beautiful table editing
   - Table formatting
   - CSV import/export

## Automation Ideas

### Git Integration

```bash
# Add git hooks for auto-sync
# .git/hooks/pre-commit
#!/bin/bash
npm run copy-obsidian
git add content/
```

### Watch Mode

```javascript
// Watch obsidian folder for changes
const chokidar = require("chokidar");
chokidar.watch("obsidian/").on("change", () => {
  console.log("Obsidian file changed, syncing...");
  require("./copy-obsidian-content").main();
});
```

## Content Organization

### Folder Structure

```
obsidian/
├── 00-Meta/           # Site configuration
├── 01-Getting-Started/ # Onboarding content
├── 02-Guides/         # How-to guides
├── 03-Reference/      # API documentation
├── 04-Examples/       # Code examples
├── 99-Archive/        # Old content
└── templates/         # Obsidian templates
```

### Naming Conventions

- Use prefixes for ordering: `01-`, `02-`, etc.
- Descriptive names: `user-authentication.md`
- Consistent casing: `kebab-case` for files

## Deployment Workflow

### Local Development

1. Write in Obsidian
2. `npm run dev:obsidian` - Sync and start dev server
3. Preview changes at `localhost:3000`

### Production Build

1. `npm run build` - Full build with sync
2. Deploy `out/` folder to hosting platform

### CI/CD Integration

```yaml
# .github/workflows/deploy.yml
- name: Sync Obsidian Content
  run: npm run copy-obsidian

- name: Build Site
  run: npm run build

- name: Deploy
  uses: actions/upload-pages-artifact@v2
  with:
    path: out
```

## Tips & Tricks

### Performance

- Use `.obsidianignore` for large files
- Exclude non-content folders from sync
- Optimize images before adding to vault

### Collaboration

- Share vault via Git repository
- Use branch protection for main content
- Review changes before deployment

### Backup

- Regular vault backups
- Export important notes
- Version control integration

## Troubleshooting

### Common Issues

**Build fails with file conflicts**

```bash
# Clean content folder
rm -rf content/*
npm run copy-obsidian
```

**Links not working**

- Check internal link format: `[[Page Name]]`
- Ensure target pages exist
- Verify `_meta.js` configuration

**Images not displaying**

- Move images to `public/` folder
- Use relative paths: `![alt](/images/photo.jpg)`
- Update image references in markdown

---

_Master the Obsidian + Nextra workflow!_ 🚀
