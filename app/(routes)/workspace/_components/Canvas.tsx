"use client";
import React from "react";
import dynamic from "next/dynamic";

// Import Excalidraw dynamically with SSR disabled
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

function Canvas() {
  return (
    <div>
      <div style={{ height: "500px" }}>
        <Excalidraw />
      </div>
    </div>
  );
}

export default Canvas;
