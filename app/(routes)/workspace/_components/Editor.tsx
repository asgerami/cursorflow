"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";
import { Id } from "@/convex/_generated/dataModel";

const DEFAULT_INITIAL_DATA: OutputData = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "New Document",
        level: 2,
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Start Writing your document here...",
      },
    },
  ],
  version: "2.8.1",
};
function Editor({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: boolean;
  fileId: Id<"files"> | undefined;
  fileData: FILE | null;
}) {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);
  const [document, setDocument] = useState<OutputData>(DEFAULT_INITIAL_DATA);

  useEffect(() => {
    if (!ref.current) {
      initEditor();
    }
  }, []);

  useEffect(() => {
    if (fileData && ref.current) {
      try {
        const rawDocument = DEFAULT_INITIAL_DATA;
        const content = fileData.document
          ? (() => {
              try {
                return JSON.parse(fileData.document);
              } catch (error) {
                console.error("Error parsing document:", error);
                return rawDocument;
              }
            })()
          : rawDocument;
        ref.current.render(content);
        setDocument(content);
      } catch (error) {
        console.error("Error parsing document data:", error);
        toast.error("Error loading document. Using default content.");
        ref.current.render(DEFAULT_INITIAL_DATA);
        setDocument(DEFAULT_INITIAL_DATA);
      }
    }
  }, [fileData]);

  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument();
    }
  }, [onSaveTrigger]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ref.current = editor;
      },
      data: document,
      tools: {
        header: {
          class: Header as any,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a header",
          },
        },
        list: {
          class: List as any,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      onChange: (api, event) => {
        console.log("Editor content changed");
      },
    });
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          setDocument(outputData);
          if (fileId) {
            updateDocument({
              _id: fileId,
              document: JSON.stringify(outputData),
            }).then(
              (resp) => {
                toast("Document Updated");
              },
              (e) => {
                toast("Server Error");
              }
            );
          }
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };
  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
}

export default Editor;
