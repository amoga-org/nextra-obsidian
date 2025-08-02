<!-- meta:configuration -->
<!-- meta:Configuration Guide -->

# Configuration

This page shows how to configure your Nextra site.

## Basic Configuration

The site configuration is stored in `next.config.mjs`:

```javascript
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

export default withNextra({
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
});
```

## Theme Configuration

Customize your theme in `app/layout.tsx` by modifying the Nextra provider configuration.
