"use client";

// External
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DiffEditor, Editor, useMonaco } from "@monaco-editor/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import toast, { Toaster } from "react-hot-toast";

// UI Components
import { Tab, Tabs } from "@nextui-org/tabs";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Progress } from "@nextui-org/progress";

// Local
import CopyToClipboard from "./CopyToClipboard";
import StyledImage from "./StyledImage";
import Panels from "./Panels";
import {
  compareSolution,
  getLanguageFromFilename,
} from "@/utils/LessonContent";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  // Current page progress bar
  const [currentLessonIndex, setCurrentLessonIndex] = useSessionStorage(route);

  // Modules page progress bar
  const [_, setCurrentLessonProgress] = useLocalStorage(route);

  const { code, solution, mdx } = lessonData[currentLessonIndex];

  const [fileContents, setFileContents] = useState(code);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [showDiff, setShowDiff] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const router = useRouter();
  const monaco = useMonaco();

  const [rightTopPanelHeight, setRightTopPanelHeight] = useState<
    number | string
  >("50vh");
  const [rightBottomPanelHeight, setRightBottomPanelHeight] = useState<
    number | string
  >("25vh");

  const components = { pre: CopyToClipboard, img: StyledImage };

  useEffect(() => {
    if (monaco) {
      // Disable errors from showing up in the editor
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
      });
    }
  }, [monaco]);

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

  const handleCheckAnswer = () => {
    const currentFileContent = fileContents[currentFileIndex].content;
    const solutionContent = solution[currentFileIndex].content;
    const language = getLanguageFromFilename(
      fileContents[currentFileIndex].name,
    );

    compareSolution(
      currentFileContent,
      solutionContent,
      setIsCorrect,
      language,
    );
  };

  // Toggle show/hide diff editor
  const toggleShowDiff = () => {
    setShowDiff((prevState) => !prevState);
  };

  // Check if there is a solution for the current file
  const hasSolution = () => {
    const currentFileName = fileContents[currentFileIndex].name;
    return solution.some((solution) => solution.name === currentFileName);
  };

  // Find the index of the current route, to determine if there is a next/prev route
  const findCurrentRouteIndex = () => {
    return routes.findIndex(
      (r) => r.module === route.module && r.lesson === route.lesson,
    );
  };

  const resetLessonState = (index: number) => {
    setCurrentLessonIndex(index);
    setCurrentFileIndex(0);
    setShowDiff(false);
    setIsCorrect(false);
  };

  // Next Button Handler
  const onNextHandler = () => {
    setCurrentLessonProgress(
      ((currentLessonIndex + 1) / lessonData.length) * 100,
    );

    setIsPrevDisabled(false);
    const isLastLesson = currentLessonIndex + 1 >= lessonData.length;
    isLastLesson ? navigateToNextLesson() : handleNavigation(1);
  };

  // Previous Button Handler
  const onPrevHandler = () => {
    const isFirstLesson = currentLessonIndex === 0;
    isFirstLesson ? navigateToPrevLesson() : handleNavigation(-1);
  };

  // Navigate to next or previous section on current lesson page
  const handleNavigation = (increment: number) => {
    const newIndex = currentLessonIndex + increment;
    resetLessonState(newIndex);
    if (increment < 0) setIsNextDisabled(false);
  };

  // Navigate to next lesson page
  const navigateToNextLesson = () => {
    const currentRouteIndex = findCurrentRouteIndex();
    const hasNextRoute =
      currentRouteIndex >= 0 && currentRouteIndex + 1 < routes.length;

    if (hasNextRoute) {
      navigateToRoute(currentRouteIndex + 1);
    } else {
      setIsNextDisabled(true);
    }
  };

  // Navigate to previous lesson page
  const navigateToPrevLesson = () => {
    const currentRouteIndex = findCurrentRouteIndex();
    const hasPrevRoute = currentRouteIndex > 0;

    if (hasPrevRoute) {
      navigateToRoute(currentRouteIndex - 1);
    } else {
      setIsPrevDisabled(true);
    }
  };

  // Navigate to a new lesson page
  const navigateToRoute = (index: number) => {
    const targetRoute = routes[index];
    router.push(`/${targetRoute.module}/${targetRoute.lesson}`);
  };

  // Navigate to a specific lesson section using the nav popover
  const handleNavChange = (section: number) => {
    const newIndex = section - 1;
    resetLessonState(newIndex);
  };

  return (
    <>
      <Panels
        LeftPanel={
          <div className="dark:prose-dark prose relative w-full max-w-none">
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
            <div className="mb-2 flex justify-center space-x-1">
              <ButtonGroup isDisabled={!hasSolution()} size="sm">
                <Button color="primary" onClick={handleCheckAnswer}>
                  Check
                </Button>
                <Button onClick={toggleShowDiff}>Hint</Button>
                <Button
                  onClick={() =>
                    handleEditorChange(solution[currentFileIndex].content)
                  }
                >
                  Answer
                </Button>
              </ButtonGroup>
              <div className="w-10"></div>
              <ButtonGroup size="sm">
                <Button isDisabled={isPrevDisabled} onClick={onPrevHandler}>
                  Previous
                </Button>
                <Popover placement="bottom" className="bg-transparent p-0">
                  <PopoverTrigger>
                    <Button>Nav</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Pagination
                      isCompact
                      // showControls
                      // disableAnimation
                      total={lessonData.length}
                      page={currentLessonIndex + 1}
                      size="sm"
                      onChange={handleNavChange}
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  color={isCorrect ? "primary" : "default"}
                  isDisabled={isNextDisabled}
                  onClick={onNextHandler}
                >
                  Next
                </Button>
              </ButtonGroup>
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
