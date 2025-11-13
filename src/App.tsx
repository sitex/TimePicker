import React from "react";
import TimePicker from "./components/TimePicker";
import { handleInsertionError } from "./utils/errorHandler";

interface AppProps {
  onClose: () => void;
}

function App({ onClose }: AppProps) {
  const handleTimeSelect = async (time: string) => {
    try {
      // Check if editor is in editing mode
      const isEditing = await logseq.Editor.checkEditing();

      if (isEditing) {
        // Insert at cursor if in editing mode
        await logseq.Editor.insertAtEditingCursor(time);
      } else {
        // Fallback: get current block and append
        const currentBlock = await logseq.Editor.getCurrentBlock();
        if (currentBlock) {
          const newContent = currentBlock.content
            ? `${currentBlock.content} ${time}`
            : time;
          await logseq.Editor.updateBlock(currentBlock.uuid, newContent);
        } else {
          throw new Error("No active block found");
        }
      }

      // Show success message
      logseq.UI.showMsg("Time inserted successfully", "success", {
        timeout: 2000,
      });

      onClose();
    } catch (error) {
      handleInsertionError(error);
      // Don't close on error, let user try again
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-0 flex items-start justify-start"
      onClick={handleOutsideClick}
    >
      <div className="timepicker-modal rounded-lg shadow-xl p-4 min-w-[280px]">
        <h3 className="text-lg font-semibold mb-4">Select Time</h3>
        <TimePicker onTimeSelect={handleTimeSelect} onCancel={onClose} />
      </div>
    </div>
  );
}

export default App;
