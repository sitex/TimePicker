import React, { useState } from "react";
import { validateTime } from "../utils/errorHandler";

interface TimePickerProps {
  onTimeSelect: (time: string) => void;
  onCancel: () => void;
}

function TimePicker({ onTimeSelect, onCancel }: TimePickerProps) {
  const [hour, setHour] = useState<string>("12");
  const [minute, setMinute] = useState<string>("00");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleInsert = () => {
    if (!validateTime(hour, minute)) {
      logseq.UI.showMsg("Invalid time selected", "error", { timeout: 2000 });
      return;
    }

    const timeString = `${hour}:${minute}`;
    onTimeSelect(timeString);
  };

  const handleNow = () => {
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, "0");
    const currentMinute = now.getMinutes().toString().padStart(2, "0");
    setHour(currentHour);
    setMinute(currentMinute);
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInsert();
    }
  };

  return (
    <div className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
      <div className="flex gap-4 items-center justify-center">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium opacity-70">Hour</label>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="timepicker-select px-3 py-2 rounded-md"
            autoFocus
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <span className="text-2xl font-bold mt-6">:</span>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium opacity-70">Minute</label>
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="timepicker-select px-3 py-2 rounded-md"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center">
        <span className="text-sm opacity-70">Selected: </span>
        <span className="text-lg font-mono font-semibold">
          {hour}:{minute}
        </span>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={handleNow}
          className="timepicker-button-secondary px-3 py-1.5 text-sm rounded"
          type="button"
        >
          Now
        </button>
        <button
          onClick={onCancel}
          className="timepicker-button-secondary px-3 py-1.5 text-sm rounded"
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={handleInsert}
          className="timepicker-button-primary px-3 py-1.5 text-sm rounded"
          type="button"
        >
          Insert
        </button>
      </div>
    </div>
  );
}

export default TimePicker;
