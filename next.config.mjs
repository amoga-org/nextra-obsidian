// content/index.mdx - Fresh Nextra 4 documentation homepage
import nextra from "nextra";

const withNextra = nextra({
  // Use content directory convention
});

export default withNextra({
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
});
