"use client";

import { DiffEditor, Editor } from "@monaco-editor/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Tab, Tabs } from "@nextui-org/tabs";

import { Button } from "@nextui-org/button";
import CustomCard from "./CustomCard";
import PageNav from "@/components/PageNav";
import Panels from "@/components/Panels";
import SendTransaction from "./SendTransaction";
import { compareSolution } from "@/utils/LessonContent";
import { useState } from "react";

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
  files: FilesContent;
  solutions: FilesContent;
  mdxDoc: MDXRemoteSerializeResult;
}

type FilesContent = { name: string; content: string }[];
type Key = string | number | bigint;

// Placeholder for total lessons per module
const totalLessons: Record<string, number> = {
  "1": 3,
  "2": 2,
  "3": 1,
};

export default function LessonContent({
  params,
  files,
  solutions,
  mdxDoc,
}: LessonProps) {
  const [filesContent, setFilesContent] = useState<FilesContent>(files);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [rightTopPanelHeight, setRightTopPanelHeight] = useState<
    number | string
  >("50vh");
  const [rightBottomPanelHeight, setRightBottomPanelHeight] = useState<
    number | string
  >("25vh");
  const [showDiff, setShowDiff] = useState(false);
  const components = { CustomCard, SendTransaction };

  const handleTabSelection = (name: Key): void => {
    const newFileIndex = files.findIndex((file) => file.name === name);
    if (newFileIndex !== -1) {
      setCurrentFileIndex(newFileIndex);
    }
  };

  const handleEditorChange = (value: string | undefined): void => {
    if (value === undefined) return;
    const updatedFiles = files.slice();
    updatedFiles[currentFileIndex] = {
      ...files[currentFileIndex],
      content: value,
    };
    setFilesContent(updatedFiles);
  };

  const toggleShowDiff = () => {
    setShowDiff((prevState) => !prevState);
  };

  const showSolution = () => {
    const solution = solutions[currentFileIndex];

    const updatedFiles = [...files];
    updatedFiles[currentFileIndex] = {
      ...filesContent[currentFileIndex],
      content: solution.content,
    };

    setFilesContent(updatedFiles);
  };

  const hasSolution = () => {
    const currentFileName = files[currentFileIndex].name;
    return !!solutions.find((solution) => solution.name === currentFileName);
  };

  return (
    <Panels
      LeftPanel={
        <div className="prose w-full max-w-none dark:prose-dark">
          <MDXRemote {...mdxDoc} components={components} />
        </div>
      }
      RightTopPanel={
        <div className="space-y-2">
          <Tabs
            variant={"bordered"}
            selectedKey={files[currentFileIndex].name}
            onSelectionChange={handleTabSelection}
          >
            {filesContent.map((file) => (
              <Tab key={file.name} title={file.name} />
            ))}
          </Tabs>
          <Editor
            height={rightTopPanelHeight}
            defaultLanguage="javascript"
            theme="vs-dark"
            value={filesContent ? filesContent[currentFileIndex].content : ""}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              quickSuggestions: false,
              wordWrap: "on",
            }}
          />
        </div>
      }
      RightBottomPanel={
        <div className="flex h-full flex-col">
          <div className="flex-grow">
            <DiffEditor
              original={
                showDiff &&
                solutions[currentFileIndex] &&
                filesContent[currentFileIndex]
                  ? filesContent[currentFileIndex].content
                  : "// Hint"
              }
              modified={
                showDiff && solutions[currentFileIndex]
                  ? solutions[currentFileIndex].content
                  : "// Hint"
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
          </div>

          <div className="mt-2 flex justify-center space-x-2 ">
            <Button isDisabled={!hasSolution()} onClick={toggleShowDiff}>
              Hint
            </Button>
            <Button
              isDisabled={!hasSolution()}
              onClick={() =>
                compareSolution(
                  filesContent[currentFileIndex].content,
                  solutions[currentFileIndex].content,
                )
              }
            >
              Check
            </Button>
            <Button isDisabled={!hasSolution()} onClick={showSolution}>
              Answer
            </Button>
            <PageNav
              module={params.module}
              lesson={Number(params.lesson)}
              totalLessons={totalLessons[params.module]}
            />
          </div>
        </div>
      }
      setRightTopPanelHeight={setRightTopPanelHeight}
      setRightBottomPanelHeight={setRightBottomPanelHeight}
    />
  );
}
