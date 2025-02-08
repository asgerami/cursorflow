"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import { Id } from "@/convex/_generated/dataModel";
import Canvas from "../_components/Canvas";

function Workspace() {
  const params = useParams();
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | null>(null);
  const [fileId, setFileId] = useState<Id<"files"> | undefined>(undefined);

  useEffect(() => {
    if (typeof params.fileId === "string") {
      const typedFileId = params.fileId as Id<"files">;
      setFileId(typedFileId);
      getFileData(params.fileId);
    }
  }, [params.fileId, convex]);

  const getFileData = async (fileId: string) => {
    try {
      const result = await convex.query(api.files.getFileById, {
        _id: fileId as Id<"files">,
      });
      console.log(result);
      setFileData(result);
    } catch (error) {
      console.error("Error fetching file data:", error);
      setFileData(null);
    }
  };

  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* Workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className="h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            fileId={fileId}
            fileData={fileData}
          />
        </div>
        {/* Whiteboard/canvas */}
        <div className="h-screen">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
