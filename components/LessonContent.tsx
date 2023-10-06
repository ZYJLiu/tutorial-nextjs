"use client";

import { DiffEditor, Editor } from "@monaco-editor/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Tab, Tabs } from "@nextui-org/tabs";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import CustomCard from "./CustomCard";
import Panels from "@/components/Panels";
import SectionNav from "@/components/SectionNav";
import SendTransaction from "./SendTransaction";
import { compareSolution } from "@/utils/LessonContent";

interface LessonContentProps {
  lessonData: {
    code: FilesContent;
    solution: FilesContent;
    mdx: MDXRemoteSerializeResult;
  }[];
}

type FilesContent = { name: string; content: string }[];
type Key = string | number | bigint;

export default function LessonContent({ lessonData }: LessonContentProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const currentLessonData = lessonData[currentLessonIndex];

  const [filesContent, setFilesContent] = useState<FilesContent>(
    currentLessonData.code,
  );
  const [solutions, setSolutions] = useState<FilesContent>(
    currentLessonData.solution,
  );
  const [mdxDoc, setMdxDoc] = useState<MDXRemoteSerializeResult>(
    currentLessonData.mdx,
  );

  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [showDiff, setShowDiff] = useState(false);
  const [rightTopPanelHeight, setRightTopPanelHeight] = useState<
    number | string
  >("50vh");
  const [rightBottomPanelHeight, setRightBottomPanelHeight] = useState<
    number | string
  >("25vh");

  const components = { CustomCard, SendTransaction };

  useEffect(() => {
    setFilesContent(currentLessonData.code);
    setSolutions(currentLessonData.solution);
    setMdxDoc(currentLessonData.mdx);
  }, [currentLessonIndex, currentLessonData]);

  useEffect(() => {
    toast.dismiss();
  }, [currentLessonIndex]);

  const handleTabSelection = (name: Key): void => {
    const newFileIndex = filesContent.findIndex((file) => file.name === name);
    if (newFileIndex !== -1) {
      setCurrentFileIndex(newFileIndex);
      setShowDiff(false);
    }
  };

  const handleEditorChange = (value: string | undefined): void => {
    if (value !== undefined) {
      setFilesContent((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[currentFileIndex].content = value;
        return updatedFiles;
      });
    }
  };

  const toggleShowDiff = () => {
    setShowDiff((prevState) => !prevState);
  };

  const showSolution = () => {
    const solution = solutions[currentFileIndex].content;
    setFilesContent((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[currentFileIndex].content = solution;
      return updatedFiles;
    });
  };

  const hasSolution = () => {
    const currentFileName = filesContent[currentFileIndex].name;
    return !!solutions.find((solution) => solution.name === currentFileName);
  };

  const onNextHandler = () => {
    setCurrentLessonIndex(currentLessonIndex + 1);
    setCurrentFileIndex(0);
    setShowDiff(false);
  };

  const onPrevHandler = () => {
    setCurrentLessonIndex(currentLessonIndex - 1);
    setCurrentFileIndex(0);
    setShowDiff(false);
  };

  return (
    <>
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
              selectedKey={filesContent[currentFileIndex].name}
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
          <>
            <div className="mb-2 flex justify-center space-x-2 ">
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
              <SectionNav
                currentSection={currentLessonIndex + 1}
                totalSections={lessonData.length}
                onNext={onNextHandler}
                onPrev={onPrevHandler}
              />
            </div>
            {showDiff && solutions[currentFileIndex] && (
              <DiffEditor
                original={filesContent[currentFileIndex].content}
                modified={solutions[currentFileIndex].content}
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
          </>
        }
        setRightTopPanelHeight={setRightTopPanelHeight}
        setRightBottomPanelHeight={setRightBottomPanelHeight}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
