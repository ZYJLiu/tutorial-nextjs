// Test panel for misc testing
// Currently testing CodeMirror editor
"use client";

import * as parser from "@babel/parser";

import { DiffEditor, Editor } from "@monaco-editor/react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@nextui-org/button";
import CodeMirror from "@uiw/react-codemirror";
import CodeViewer from "@/components/CodeViewer";
import Doc from "./doc.mdx";
import { ImperativePanelHandle } from "react-resizable-panels";
import Panels from "@/components/Panels";
import ReactDiffViewer from "react-diff-viewer-continued";
import { createTheme } from "@uiw/codemirror-themes";
import generate from "@babel/generator";
import getDefaultLayout from "@/utils/PanelDefault";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import traverse from "@babel/traverse";
import { useLineHighlight } from "@/context/LineHighlight";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

type Key = string | number | bigint;

// Placeholder
const initialFiles = [
  {
    name: "file1",
    content: `function HelloWorld() {
    console.log('Hello, World!');
    console.log('Hello, World!');
  }`,
  },
  {
    name: "file2",
    content: `function HelloWorld() {
    console.log('Hello, World!');
    console.log('Hello, World!');
  }`,
  },
  {
    name: "file3",
    content: `function HelloWorld() {
    console.log('Hello, World!');
  }`,
  },
];

// Placeholder
const solutions = {
  file1: `function HelloWorld() {
    console.log('Solution for File 2');
  }`,
  file2: `function HelloWorld() {
    console.log('Solution for File 2');
  }`,
  file3: `function HelloWorld() {
    console.log('Solution for File 3');
  }`,
};

export default function TestPanel() {
  const [files, setFiles] = useState(initialFiles);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [showDiff, setShowDiff] = useState(false);

  const [rightTopPanelHeight, setRightTopPanelHeight] = useState("50vh");
  const [rightBottomPanelHeight, setRightBottomPanelHeight] = useState("25vh");

  const handleTabSelection = (name: Key): void => {
    const newFileIndex = files.findIndex((file) => file.name === name);
    if (newFileIndex !== -1) {
      setCurrentFileIndex(newFileIndex);
    }
  };

  const normalizeCode = (code: string) => {
    const ast = parser.parse(code, {
      sourceType: "script",
      plugins: ["typescript"],
    });

    traverse(ast, {
      enter(path) {
        path.node.leadingComments = [];
        path.node.innerComments = [];
        path.node.trailingComments = [];
      },
    });

    return generate(ast).code;
  };
  const compareSolution = () => {
    const currentFile = files[currentFileIndex];
    const solution = solutions[currentFile.name as keyof typeof solutions];

    // // Remove all whitespace characters from both strings
    // const normalizedContent = currentFile.content.replace(/\s+/g, "");
    // const normalizedSolution = solution.replace(/\s+/g, "");

    try {
      const normalizedContent = normalizeCode(currentFile.content);
      const normalizedSolution = normalizeCode(solution);
      if (normalizedContent === normalizedSolution) {
        alert("The content matches the solution!");
      } else {
        alert("The content does not match the solution.");
      }
    } catch (e) {
      alert("The content does not match the solution.");
    }
  };

  const showSolution = () => {
    const currentFileName = files[currentFileIndex].name;
    const solution = solutions[currentFileName as keyof typeof solutions];

    // Create a copy of files array and update the content of the current file with its solution
    const updatedFiles = [...files];
    updatedFiles[currentFileIndex] = {
      ...files[currentFileIndex],
      content: solution,
    };

    setFiles(updatedFiles);
  };

  const toggleShowDiff = () => {
    setShowDiff((prevState) => !prevState);
  };

  // monaco editor
  function handleEditorChange(value: string | undefined) {
    if (value === undefined) return;
    const updatedFiles = files.slice();
    updatedFiles[currentFileIndex] = {
      ...files[currentFileIndex],
      content: value,
    };
    setFiles(updatedFiles);
  }

  console.log(rightBottomPanelHeight);
  // console.log(rightTopPanelHeight);

  return (
    <main className="h-[90vh] p-1">
      <Panels
        // defaultLayout={defaultLayout}
        setRightTopPanelHeight={setRightTopPanelHeight}
        setRightBottomPanelHeight={setRightBottomPanelHeight}
        LeftPanel={<Doc />}
        RightTopPanel={
          <Tabs
            variant={"bordered"}
            selectedKey={files[currentFileIndex].name}
            onSelectionChange={handleTabSelection}
          >
            {files.map((file, index) => (
              <Tab key={file.name} title={file.name}>
                <Editor
                  height={rightTopPanelHeight}
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  defaultValue={index === currentFileIndex ? file.content : ""}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                  }}
                />
              </Tab>
            ))}
          </Tabs>
        }
        RightBottomPanel={
          <>
            {showDiff && (
              <DiffEditor
                original={files[currentFileIndex].content}
                modified={
                  solutions[
                    files[currentFileIndex].name as keyof typeof solutions
                  ]
                }
                height={rightBottomPanelHeight}
                language="javascript"
                theme="vs-dark"
                options={{
                  renderSideBySide: false,
                  minimap: { enabled: false },
                  readOnly: true,
                  scrollbar: { verticalScrollbarSize: 0 },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                }}
              />
            )}

            <div className="mt-2 flex w-full justify-center space-x-2">
              <Button onClick={toggleShowDiff}>Hint</Button>
              <Button onClick={compareSolution}>Check</Button>
              <Button onClick={showSolution}>Answer</Button>
            </div>
          </>
        }
      />
    </main>
  );
}
