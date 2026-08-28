import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const clipmakerPath = `${root}/src/pages/clipmaker/isolated-studio.css`;
const clipmaker = readFileSync(clipmakerPath, "utf8");
const sourceBoundaries = [
  {
    file: "src/components/page/deployments/DeploymentsPage.tsx",
    forbidden: ["OrdersPage.css"],
  },
  {
    file: "src/components/user/UserUploads.tsx",
    forbidden: ["DirectoryLayout.css", "UserProfile.css"],
  },
  {
    file: "src/components/ui/RichTextEditor.tsx",
    forbidden: ["../forum/Editor.css"],
  },
  {
    file: "src/components/forum/ThreadMediaViewer.tsx",
    forbidden: ["../user/UserProfile.css"],
  },
  {
    file: "src/components/user/settings/ProfileSettings.tsx",
    forbidden: ["../UserProfile.css"],
  },
  {
    file: "src/components/page/PageBuilder.tsx",
    forbidden: ["../ui/FeatureCard.css"],
  },
  {
    file: "src/components/forum/Forum.tsx",
    forbidden: ["../ui/FeatureCard.css"],
  },
  {
    file: "src/components/store/EditProductForm.tsx",
    forbidden: ["../forum/IconButton.css"],
  },
  {
    file: "src/components/store/NewProduct.tsx",
    forbidden: ["../forum/IconButton.css"],
  },
  {
    file: "src/components/store/NewStoreCategory.tsx",
    forbidden: ["../forum/IconButton.css"],
  },
  {
    file: "src/pages/documentation/DocumentationGuideEditorPage.tsx",
    forbidden: ["../../components/forum/IconButton.css"],
  },
];

const stylesheetBudgets = {
  "src/pages/clipmaker/isolated-studio.css": {
    maxLines: 3166,
    owner: "isolated clipmaker integration",
  },
  "src/components/page/page-builder-core.css": { maxLines: 2086, owner: "page builder engine" },
  "src/components/page/datasources/DataSources.css": { maxLines: 1534, owner: "datasource editor" },
  "src/components/page/layout/Header.css": { maxLines: 1356, owner: "application header and drawer" },
  "src/styles/Cart.css": { maxLines: 1306, owner: "cart and order workflow" },
  "src/components/store/Store.css": { maxLines: 1188, owner: "store directory" },
  "src/index.css": { maxLines: 1122, owner: "global tokens, reset, and legacy recipes" },
  "src/components/page/layout/PresencePanel.css": { maxLines: 1023, owner: "presence panel" },
  "src/components/inbox/InboxPage.css": { maxLines: 824, owner: "inbox workspace" },
  "src/components/documentation/DocumentationShell.css": {
    maxLines: 813,
    owner: "documentation route family",
  },
  "src/components/user/UserProfile.css": { maxLines: 692, owner: "profile route" },
  "src/components/page/CardDesigner.css": { maxLines: 672, owner: "card designer" },
  "src/components/page/layout/Footer.css": { maxLines: 588, owner: "application footer" },
  "src/components/page/layout/VoicePanel.css": { maxLines: 584, owner: "voice panel" },
  "src/pages/kjv/Bible.css": { maxLines: 535, owner: "Bible reader" },
  "src/components/page/CustomPages.css": { maxLines: 518, owner: "custom-page directory" },
};

const importantBudgets = {
  "src/components/page/page-builder-core.css": { max: 38, reason: "page-builder inline presentation overrides" },
  "src/components/flow/Flow.css": { max: 25, reason: "XYFlow third-party overrides" },
  "src/components/page/layout/VoicePanel.css": { max: 18, reason: "media controls and mobile overlay geometry" },
  "src/components/ui/RichTextEditor.css": { max: 17, reason: "TipTap third-party overrides" },
  "src/components/page/blocks/RichTextBlock.css": { max: 8, reason: "TipTap editor overrides" },
  "src/components/page/layout/Header.css": { max: 6, reason: "reduced-motion reset and mobile collapse" },
  "src/utilities.css": { max: 5, reason: "intentional utility declarations" },
  "src/styles/Cart.css": { max: 5, reason: "mobile order layout overrides" },
  "src/pages/LoadingPage.css": { max: 5, reason: "skeleton geometry overrides" },
  "src/index.css": { max: 5, reason: "global resets" },
  "src/components/documentation/DocumentationShell.css": { max: 5, reason: "editor and mobile shell overrides" },
  "src/components/ui/Console.css": { max: 4, reason: "semantic ANSI output overrides" },
  "src/components/forum/ViewThreadMeta.css": { max: 4, reason: "embedded heading reset" },
  "src/components/page/blocks/StatCardsBlock.css": { max: 3, reason: "embedded surface reset" },
  "src/components/forum/thread-view/ViewThreadPage.css": { max: 3, reason: "responsive visibility switches" },
  "src/components/forum/ThreadsFeed.css": { max: 3, reason: "mobile grid collapse" },
  "src/components/ui/Button.css": { max: 2, reason: "reduced-motion reset" },
  "src/components/forum/Forum.css": { max: 2, reason: "mobile grid collapse" },
  "src/components/analytics/AnalyticsSkeleton.css": { max: 2, reason: "fixed chart skeleton geometry" },
  "src/pages/Layout.css": { max: 1, reason: "application shell reset" },
  "src/components/user/UserProfile.css": { max: 1, reason: "profile overflow composition" },
  "src/components/page/layout/PresencePanel.css": { max: 1, reason: "embedded store sticky reset" },
  "src/components/page/layout/CursorOverlay.css": { max: 1, reason: "portal visibility override" },
  "src/components/page/blocks/SocialLinksBlock.css": { max: 1, reason: "authored-link color override" },
  "src/components/page/blocks/InteractiveSectionBlock.css": { max: 1, reason: "mobile grid collapse" },
  "src/components/page/blocks/DerivedSectionBlock.css": { max: 1, reason: "mobile grid collapse" },
  "src/components/page/blocks/CustomSectionBlock.css": { max: 1, reason: "mobile grid collapse" },
  "src/components/page/CustomPages.css": { max: 1, reason: "preview interaction reset" },
  "src/components/forum/ViewThreadComments.css": { max: 1, reason: "editor focus reset" },
  "src/components/flow/styles.css": { max: 1, reason: "XYFlow third-party override" },
};

function collectCSS(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) return collectCSS(path);
    return entry.name.endsWith(".css") ? [path] : [];
  });
}

const cssFiles = collectCSS(`${root}/src`);
const relativePath = path => path.slice(root.length + 1);

const uniqueClipmakerSelectors = [
  ".grid-auto-fit",
  ".backdrop-blur-sm",
  ".custom-scrollbar {",
  ".glow-purple",
  ".btn {",
  ".input-dark {",
  ".card {",
];

const repeated = uniqueClipmakerSelectors.filter(selector => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (clipmaker.match(new RegExp(escaped, "g")) ?? []).length !== 1;
});

if (repeated.length > 0) {
  console.error(
    `Clipmaker utility authority must contain each signature selector exactly once: ${repeated.join(", ")}`
  );
  process.exitCode = 1;
}

for (const boundary of sourceBoundaries) {
  const source = readFileSync(`${root}/${boundary.file}`, "utf8");
  const leaked = boundary.forbidden.filter(imported => source.includes(imported));
  if (leaked.length > 0) {
    console.error(`${boundary.file} imports cross-domain CSS: ${leaked.join(", ")}`);
    process.exitCode = 1;
  }
}

for (const path of cssFiles) {
  const relative = relativePath(path);
  const source = readFileSync(path, "utf8");
  const lineCount = source.split("\n").length - 1;
  const budget = stylesheetBudgets[relative];

  if (lineCount > 500 && !budget) {
    console.error(`${relative} has ${lineCount} lines without a reviewed stylesheet owner`);
    process.exitCode = 1;
  } else if (budget && lineCount > budget.maxLines) {
    console.error(
      `${relative} exceeds its ${budget.owner} budget: ${lineCount} > ${budget.maxLines} lines`
    );
    process.exitCode = 1;
  }

  if (relative !== "src/index.css" && relative !== "src/pages/clipmaker/isolated-studio.css") {
    const hardColors =
      source.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(|:\s*(?:white|black|red)\s*(?:!important\s*)?;/g) ?? [];
    if (hardColors.length > 0) {
      console.error(`${relative} contains ${hardColors.length} hard-coded color expression(s)`);
      process.exitCode = 1;
    }

    const fallbacks = source.match(/var\([^)]*,/g) ?? [];
    if (fallbacks.length > 0) {
      console.error(`${relative} contains ${fallbacks.length} var() fallback(s)`);
      process.exitCode = 1;
    }
  }

  if (relative === "src/pages/clipmaker/isolated-studio.css") continue;
  const importantCount = source.match(/!important/g)?.length ?? 0;
  const importantBudget = importantBudgets[relative];
  if (importantCount > 0 && !importantBudget) {
    console.error(`${relative} contains unreviewed !important declarations`);
    process.exitCode = 1;
  } else if (importantBudget && importantCount > importantBudget.max) {
    console.error(
      `${relative} exceeds its reviewed !important budget (${importantBudget.reason}): ${importantCount} > ${importantBudget.max}`
    );
    process.exitCode = 1;
  }
}
