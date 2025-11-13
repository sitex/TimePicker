export function handleInsertionError(error: unknown): void {
  console.error("Time insertion error:", error);

  const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";

  logseq.UI.showMsg(
    `Failed to insert time: ${errorMessage}`,
    "error",
    { timeout: 3000 }
  );
}

export function validateTime(hour: string, minute: string): boolean {
  const h = parseInt(hour, 10);
  const m = parseInt(minute, 10);

  if (isNaN(h) || isNaN(m)) return false;
  if (h < 0 || h > 23) return false;
  if (m < 0 || m > 59) return false;

  return true;
}
