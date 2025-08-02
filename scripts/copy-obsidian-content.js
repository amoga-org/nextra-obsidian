#!/usr/bin/env node
// scripts/copy-obsidian-content.js - Copy content from Obsidian vault to Nextra content folder

const fs = require("fs").promises;
const path = require("path");

const OBSIDIAN_PATH = path.join(process.cwd(), "obsidian");
const CONTENT_PATH = path.join(process.cwd(), "content");

/**
 * Extract metadata from the first two lines of a markdown file
 * Format:
 * Line 1: <!-- meta:key -->
 * Line 2: <!-- meta:Title for Navigation -->
 */
function extractMetadata(content, fileName) {
  const lines = content.split("\n");
  const firstLine = lines[0]?.trim() || "";
  const secondLine = lines[1]?.trim() || "";

  // Check if first two lines contain meta comments
  const keyMatch = firstLine.match(/^<!--\s*meta:(.+?)\s*-->$/);
  const titleMatch = secondLine.match(/^<!--\s*meta:(.+?)\s*-->$/);

  if (keyMatch && titleMatch) {
    const key = keyMatch[1].trim();
    const title = titleMatch[1].trim();
    return { key, title, hasMetadata: true };
  }

  // Fallback to filename
  const baseName = path.basename(fileName, path.extname(fileName));
  const key = baseName === "index" ? "index" : baseName;
  const title =
    baseName === "index"
      ? "Home"
      : baseName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  return { key, title, hasMetadata: false };
}

/**
 * Generate _meta.js content for a directory
 */
async function generateMetaFile(dirPath, entries) {
  const metaEntries = {};

  for (const entry of entries) {
    if (
      entry.isFile() &&
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
    ) {
      const filePath = path.join(dirPath, entry.name);
      const content = await fs.readFile(filePath, "utf8");
      const { key, title } = extractMetadata(content, entry.name);
      metaEntries[key] = title;
    }
  }

  // Sort entries to put 'index' first, then alphabetically
  const sortedEntries = Object.keys(metaEntries).sort((a, b) => {
    if (a === "index") return -1;
    if (b === "index") return 1;
    return a.localeCompare(b);
  });

  const metaObject = {};
  sortedEntries.forEach((key) => {
    metaObject[key] = metaEntries[key];
  });

  const metaContent = `// Auto-generated _meta.js from Obsidian files
export default ${JSON.stringify(metaObject, null, 2)}`;

  return metaContent;
}

/**
 * Recursively copy files from source to destination
 */
async function copyDirectory(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    // Process files first
    const files = entries.filter((entry) => entry.isFile());
    const directories = entries.filter((entry) => entry.isDirectory());

    // Generate _meta.js for this directory if it has markdown files
    const hasMarkdownFiles = files.some(
      (entry) => entry.name.endsWith(".md") || entry.name.endsWith(".mdx")
    );

    if (hasMarkdownFiles) {
      const metaContent = await generateMetaFile(src, files);
      const metaPath = path.join(dest, "_meta.js");
      await fs.writeFile(metaPath, metaContent);
      console.log(
        `📄 Generated _meta.js for ${
          path.relative(OBSIDIAN_PATH, src) || "root"
        }`
      );
    }

    // Copy markdown files
    for (const entry of files) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      const ext = path.extname(entry.name).toLowerCase();
      if ([".md", ".mdx"].includes(ext)) {
        console.log(`📄 Copying file: ${entry.name}`);
        await fs.copyFile(srcPath, destPath);
      } else {
        console.log(`⏭️  Skipping file: ${entry.name} (unsupported extension)`);
      }
    }

    // Process subdirectories
    for (const entry of directories) {
      if (entry.name.startsWith(".")) {
        console.log(`⏭️  Skipping hidden directory: ${entry.name}`);
        continue;
      }

      console.log(`📁 Copying directory: ${entry.name}`);
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      await copyDirectory(srcPath, destPath);
    }
  } catch (error) {
    console.error(`❌ Error copying directory ${src}:`, error.message);
    throw error;
  }
}

/**
 * Clean the content directory before copying
 */
async function cleanContentDirectory() {
  try {
    console.log("🧹 Cleaning content directory...");

    try {
      await fs.access(CONTENT_PATH);
      const entries = await fs.readdir(CONTENT_PATH);

      for (const entry of entries) {
        if (entry !== ".gitkeep") {
          const entryPath = path.join(CONTENT_PATH, entry);
          const stat = await fs.stat(entryPath);

          if (stat.isDirectory()) {
            await fs.rm(entryPath, { recursive: true, force: true });
          } else {
            await fs.unlink(entryPath);
          }
        }
      }
    } catch (error) {
      await fs.mkdir(CONTENT_PATH, { recursive: true });
    }

    console.log("✅ Content directory cleaned");
  } catch (error) {
    console.error("❌ Error cleaning content directory:", error.message);
    throw error;
  }
}

/**
 * Process markdown files to ensure they work with Nextra
 */
async function processMarkdownFile(filePath) {
  try {
    let content = await fs.readFile(filePath, "utf8");

    // Remove metadata comments from the content
    const lines = content.split("\n");
    if (
      lines[0]?.trim().startsWith("<!-- meta:") &&
      lines[1]?.trim().startsWith("<!-- meta:")
    ) {
      content = lines.slice(2).join("\n").trim();
    }

    // Convert .md files to .mdx
    if (path.extname(filePath) === ".md") {
      const mdxPath = filePath.replace(/\.md$/, ".mdx");
      await fs.writeFile(mdxPath, content);
      await fs.unlink(filePath);
      console.log(
        `🔄 Converted ${path.basename(filePath)} to ${path.basename(mdxPath)}`
      );
    } else {
      // Just update the content to remove metadata comments
      await fs.writeFile(filePath, content);
    }
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error.message);
  }
}

/**
 * Post-process copied files
 */
async function postProcessFiles() {
  try {
    console.log("🔧 Post-processing files...");

    const processDirectory = async (dirPath) => {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          await processDirectory(entryPath);
        } else if (
          entry.isFile() &&
          (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
        ) {
          await processMarkdownFile(entryPath);
        }
      }
    };

    await processDirectory(CONTENT_PATH);
    console.log("✅ Post-processing completed");
  } catch (error) {
    console.error("❌ Error during post-processing:", error.message);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 Starting Obsidian to Nextra content sync...");
  console.log(`📂 Source: ${OBSIDIAN_PATH}`);
  console.log(`📂 Destination: ${CONTENT_PATH}`);

  try {
    // Check if obsidian directory exists
    try {
      await fs.access(OBSIDIAN_PATH);
    } catch (error) {
      console.log("⚠️  Obsidian directory not found. Creating it...");
      await fs.mkdir(OBSIDIAN_PATH, { recursive: true });
      console.log(
        "📁 Created obsidian directory. Please add your markdown files there."
      );
      return;
    }

    // Clean content directory
    await cleanContentDirectory();

    // Copy files from obsidian to content (this now includes auto-generating _meta.js)
    await copyDirectory(OBSIDIAN_PATH, CONTENT_PATH);

    // Post-process files
    await postProcessFiles();

    console.log("✅ Obsidian content sync completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, copyDirectory, processMarkdownFile };
