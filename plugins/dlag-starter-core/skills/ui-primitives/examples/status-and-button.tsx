// Original illustrative React pattern. No library installation needed.
import { useState } from "react";

export function CopyReference({ reference }: { reference: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      // Browser API is read only after an actual click, never during SSR.
      await navigator.clipboard.writeText(reference);
      setMessage("Reference copied.");
    } catch {
      setMessage("Copy failed. Select and copy the visible reference.");
    }
  }
  return (
    <div>
      <p>{reference}</p>
      <button type="button" onClick={copy} aria-label="Copy reference">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20">
          <rect x="8" y="8" width="12" height="12" fill="none" stroke="currentColor" />
          <path d="M4 16V4h12" fill="none" stroke="currentColor" />
        </svg>
      </button>
      <p role="status">{message}</p>
    </div>
  );
}
