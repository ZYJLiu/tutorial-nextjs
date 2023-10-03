// Test panel for misc testing
// Currently testing CodeMirror editor
"use client";

import * as parser from "@babel/parser";

import { Tab, Tabs } from "@nextui-org/tabs";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import CodeMirror from "@uiw/react-codemirror";
import CodeViewer from "@/components/CodeViewer";
import Doc from "./doc.mdx";
import Panels from "@/components/Panels";
import { createTheme } from "@uiw/codemirror-themes";
import generate from "@babel/generator";
import getDefaultLayout from "@/utils/PanelDefault";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import traverse from "@babel/traverse";
import { useLineHighlight } from "@/context/LineHighlight";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

type Key = string | number | bigint;

export default function Home() {
  const initialFiles = [
    {
      name: "file1",
      content: `const onChange = useCallback(
      (val: string) => {
        const updatedFiles = files.slice();
        updatedFiles[currentFileIndex] = {
          ...files[currentFileIndex],
          content: val,
        };
        setFiles(updatedFiles);
      },
      [currentFileIndex, files],
    );`,
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

  const solutions = {
    file1: `const onChange = useCallback(
      (val: string) => {
        const updatedFiles = files.slice();
        updatedFiles[currentFileIndex] = {
          ...files[currentFileIndex],
          content: val,
        };
        setFiles(updatedFiles);
      },
      [currentFileIndex, files],
    );`,
    file2: `function HelloWorld() {
        console.log('Solution for File 2');
    }`,
    file3: `function HelloWorld() {
        console.log('Solution for File 3');
    }`,
  };

  // const language = "javascript";

  // const { linesToHighlight, fileToHighlight } = useLineHighlight();

  // useEffect(() => {
  //   if (fileToHighlight != null && fileToHighlight < initialFiles.length) {
  //     setCurrentFile(initialFiles[fileToHighlight]);
  //   }
  // }, [fileToHighlight]);

  const [files, setFiles] = useState(initialFiles);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const onChange = useCallback(
    (val: string) => {
      const updatedFiles = files.slice();
      updatedFiles[currentFileIndex] = {
        ...files[currentFileIndex],
        content: val,
      };
      setFiles(updatedFiles);
    },
    [currentFileIndex, files],
  );

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

  return (
    <main className="h-[90vh] p-1">
      <Panels
        // defaultLayout={defaultLayout}
        LeftPanel={<Doc />}
        RightTopPanel={
          <Tabs
            variant={"bordered"}
            selectedKey={files[currentFileIndex].name}
            onSelectionChange={handleTabSelection}
          >
            {files.map((file, index) => (
              <Tab key={file.name} title={file.name}>
                <CodeMirror
                  value={index === currentFileIndex ? file.content : ""}
                  extensions={[javascript({ jsx: true })]}
                  theme={myTheme}
                  onChange={onChange}
                />
                {/* <CodeViewer
                  language={language}
                  code={currentFile.content}
                  linesToHighlight={linesToHighlight}
                /> */}
              </Tab>
            ))}
          </Tabs>
        }
        RightBottomPanel={
          <>
            <Button onClick={compareSolution}>Compare to Solution</Button>
            <Button onClick={showSolution}>Show Solution</Button>
          </>
        }
      />
    </main>
  );
}

const myTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#000000",
    foreground: "#9cdcfe",
    caret: "#c6c6c6",
    selection: "#6199ff2f",
    selectionMatch: "#72a1ff59",
    lineHighlight: "#ffffff0f",
    gutterBackground: "#000000",
    gutterForeground: "#838383",
    gutterActiveForeground: "#fff",
    fontFamily:
      'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
  },
  styles: [
    {
      tag: [
        t.keyword,
        t.operatorKeyword,
        t.modifier,
        t.color,
        t.constant(t.name),
        t.standard(t.name),
        t.standard(t.tagName),
        t.special(t.brace),
        t.atom,
        t.bool,
        t.special(t.variableName),
      ],
      color: "#569cd6",
    },
    {
      tag: [t.controlKeyword, t.moduleKeyword],
      color: "#c586c0",
    },
    {
      tag: [
        t.name,
        t.deleted,
        t.character,
        t.macroName,
        t.propertyName,
        t.variableName,
        t.labelName,
        t.definition(t.name),
      ],
      color: "#9cdcfe",
    },
    { tag: t.heading, fontWeight: "bold", color: "#9cdcfe" },
    {
      tag: [
        t.typeName,
        t.className,
        t.tagName,
        t.number,
        t.changed,
        t.annotation,
        t.self,
        t.namespace,
      ],
      color: "#4ec9b0",
    },
    {
      tag: [t.function(t.variableName), t.function(t.propertyName)],
      color: "#dcdcaa",
    },
    { tag: [t.number], color: "#b5cea8" },
    {
      tag: [t.operator, t.punctuation, t.separator, t.url, t.escape, t.regexp],
      color: "#d4d4d4",
    },
    {
      tag: [t.regexp],
      color: "#d16969",
    },
    {
      tag: [t.special(t.string), t.processingInstruction, t.string, t.inserted],
      color: "#ce9178",
    },
    { tag: [t.angleBracket], color: "#808080" },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: [t.meta, t.comment], color: "#6a9955" },
    { tag: t.link, color: "#6a9955", textDecoration: "underline" },
    { tag: t.invalid, color: "#ff0000" },
  ],
});
