import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

let root: ReactDOM.Root | null = null;

async function main() {
  console.log("TimePicker plugin loaded");

  // Register slash command
  logseq.Editor.registerSlashCommand("time", async () => {
    await showTimePicker();
  });

  // Prepare React root
  const rootElement = document.getElementById("app");
  if (rootElement) {
    root = ReactDOM.createRoot(rootElement);
  }

  // Apply initial theme
  await updateTheme();

  // Listen for theme changes
  logseq.App.onThemeModeChanged(updateTheme);

  // Listen for UI visibility changes
  logseq.on("ui:visible:changed", ({ visible }) => {
    if (visible) {
      renderApp();
    }
  });
}

async function updateTheme() {
  try {
    const configs = await logseq.App.getUserConfigs();
    const theme = configs?.preferredThemeMode || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (error) {
    console.error("Failed to get theme:", error);
    // Default to light theme
    document.documentElement.classList.remove("dark");
  }
}

async function showTimePicker() {
  // Get cursor position for popup placement
  const cursorPos = await logseq.Editor.getEditingCursorPosition();

  if (cursorPos) {
    // Position popup near cursor
    logseq.setMainUIInlineStyle({
      position: "fixed",
      left: `${cursorPos.left}px`,
      top: `${cursorPos.top + 30}px`,
      zIndex: 11,
    });
  }

  // Show popup
  logseq.showMainUI({ autoFocus: true });
}

function renderApp() {
  if (root) {
    root.render(
      <React.StrictMode>
        <App onClose={() => logseq.hideMainUI()} />
      </React.StrictMode>
    );
  }
}

logseq.ready(main).catch(console.error);
