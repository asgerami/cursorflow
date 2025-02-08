"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ExcalidrawWrapper = () => {
  const [Excalidraw, setExcalidraw] = useState<any>(null);

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => {
      setExcalidraw(comp.Excalidraw);
    });
  }, []);

  if (!Excalidraw) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading Excalidraw...
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Excalidraw />
    </div>
  );
};

const Canvas = () => {
  return (
    <div className="h-full w-full">
      <ExcalidrawWrapper />
    </div>
  );
};

export default Canvas;
