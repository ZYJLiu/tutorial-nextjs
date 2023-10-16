"use client";

import { DiffEditor, Editor } from "@monaco-editor/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Tab, Tabs } from "@nextui-org/tabs";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import CopyToClipboard from "./CopyToClipboard";
import CustomCard from "./CustomCard";
import Panels from "@/components/Panels";
import { Progress } from "@nextui-org/progress";
import SendTransaction from "./SendTransaction";
import { compareSolution } from "@/utils/LessonContent";
import { useRouter } from "next/navigation";

interface LessonContentProps {
  routes: { module: string; lesson: string }[];
  route: { module: string; lesson: string };
  lessonData: {
    code: FilesContent;
    solution: FilesContent;
    mdx: MDXRemoteSerializeResult;
  }[];
}

type FilesContent = { name: string; content: string }[];
type Key = string | number | bigint;

export default function LessonContent({
  routes,
  route,
  lessonData,
}: LessonContentProps) {
  const getInitialLessonIndex = () => {
    if (typeof window !== "undefined") {
      const lessonKey = `lessonIndex_${route.module}_${route.lesson}`;
      const storedIndex = sessionStorage.getItem(lessonKey);
      return storedIndex ? Number(storedIndex) : 0;
    }
    return 0;
  };

  const [currentLessonIndex, setCurrentLessonIndex] = useState(
    getInitialLessonIndex,
  );

  const { code, solution, mdx } = lessonData[currentLessonIndex];

  const [fileContents, setFileContents] = useState(code);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [showDiff, setShowDiff] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const router = useRouter();

  const [rightTopPanelHeight, setRightTopPanelHeight] = useState<
    number | string
  >("50vh");
  const [rightBottomPanelHeight, setRightBottomPanelHeight] = useState<
    number | string
  >("25vh");

  const components = { CustomCard, SendTransaction, pre: CopyToClipboard };

  useEffect(() => {
    setFileContents(code);
    toast.dismiss();
  }, [currentLessonIndex]);

  const handleTabSelection = (name: Key): void => {
    const newIndex = fileContents.findIndex((file) => file.name === name);
    setCurrentFileIndex(newIndex);
    setShowDiff(false);
  };

  const handleEditorChange = (newValue: string | undefined): void => {
    if (newValue) {
      setFileContents((files) => {
        files[currentFileIndex].content = newValue;
        return [...files];
      });
    }
  };

  const toggleShowDiff = () => {
    setShowDiff((prevState) => !prevState);
  };

  const hasSolution = () => {
    const currentFileName = fileContents[currentFileIndex].name;
    return solution.some((solution) => solution.name === currentFileName);
  };

  const findCurrentRouteIndex = () => {
    return routes.findIndex(
      (r) => r.module === route.module && r.lesson === route.lesson,
    );
  };

  const navigateToRoute = (index: number) => {
    const targetRoute = routes[index];
    router.push(`/${targetRoute.module}/${targetRoute.lesson}`);
  };

  const handleLessonChange = (increment: number) => {
    const newIndex = currentLessonIndex + increment;
    const lessonKey = `lessonIndex_${route.module}_${route.lesson}`;
    sessionStorage.setItem(lessonKey, newIndex.toString());

    setCurrentLessonIndex((prevIndex) => prevIndex + increment);
    setCurrentFileIndex(0);
    setShowDiff(false);
    setIsCorrect(false);
    if (increment < 0) setIsNextDisabled(false);
  };

  const onNextHandler = () => {
    setIsPrevDisabled(false);
    const isLastLesson = currentLessonIndex + 1 >= lessonData.length;

    if (isLastLesson) {
      const currentRouteIndex = findCurrentRouteIndex();

      const hasNextRoute =
        currentRouteIndex >= 0 && currentRouteIndex + 1 < routes.length;
      if (hasNextRoute) {
        navigateToRoute(currentRouteIndex + 1);
      } else {
        setIsNextDisabled(true);
      }
    } else {
      handleLessonChange(1);
    }
  };

  const onPrevHandler = () => {
    const isFirstLesson = currentLessonIndex === 0;

    if (isFirstLesson) {
      const currentRouteIndex = findCurrentRouteIndex();

      const hasPrevRoute = currentRouteIndex > 0;
      if (hasPrevRoute) {
        navigateToRoute(currentRouteIndex - 1);
      } else {
        setIsPrevDisabled(true);
      }
    } else {
      handleLessonChange(-1);
    }
  };

  const getLanguageFromFilename = (filename: string) => {
    const extension = filename.split(".").pop();

    switch (extension) {
      case "js":
        return "javascript";
      case "ts":
        return "javascript"; // use js otherwise warnings in editor
      case "rs":
        return "rust";
      default:
        return "plaintext";
    }
  };

  return (
    <>
      <Panels
        LeftPanel={
          <div className="dark:prose-dark prose w-full max-w-none">
            <MDXRemote {...mdx} components={components} />
          </div>
        }
        RightTopPanel={
          <div className="space-y-2">
            <Tabs
              variant={"bordered"}
              selectedKey={fileContents[currentFileIndex].name}
              onSelectionChange={handleTabSelection}
            >
              {fileContents.map((file) => (
                <Tab key={file.name} title={file.name} />
              ))}
            </Tabs>
            <Editor
              height={rightTopPanelHeight}
              // defaultLanguage="javascript"
              language={getLanguageFromFilename(
                fileContents[currentFileIndex].name,
              )}
              theme="vs-dark"
              value={fileContents[currentFileIndex].content}
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
              <Button
                color="primary"
                isDisabled={!hasSolution()}
                onClick={() =>
                  compareSolution(
                    fileContents[currentFileIndex].content,
                    solution[currentFileIndex].content,
                    setIsCorrect,
                  )
                }
              >
                Check
              </Button>
              <Button isDisabled={!hasSolution()} onClick={toggleShowDiff}>
                Hint
              </Button>
              <Button
                isDisabled={!hasSolution()}
                onClick={() =>
                  handleEditorChange(solution[currentFileIndex].content)
                }
              >
                Answer
              </Button>
              <div className="w-10"></div>
              <div className="flex space-x-2">
                <Button isDisabled={isPrevDisabled} onClick={onPrevHandler}>
                  Previous
                </Button>
                <Button
                  color={isCorrect ? "primary" : "default"}
                  isDisabled={isNextDisabled}
                  onClick={onNextHandler}
                >
                  Next
                </Button>
              </div>
            </div>
            {showDiff && solution[currentFileIndex] && (
              <DiffEditor
                original={fileContents[currentFileIndex].content}
                modified={solution[currentFileIndex].content}
                height={rightBottomPanelHeight}
                language={getLanguageFromFilename(
                  fileContents[currentFileIndex].name,
                )}
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
      <Progress
        size="sm"
        value={(currentLessonIndex / (lessonData.length - 1)) * 100}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
