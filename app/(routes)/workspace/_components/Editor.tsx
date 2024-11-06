"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};
function Editor() {
  const ref = useRef<EditorJS>();
  const [document, setDocument] = useState(rawDocument);
  useEffect(() => {
    initEditor();
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
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
    });
    ref.current = editor;
  };
  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
}

export default Editor;
