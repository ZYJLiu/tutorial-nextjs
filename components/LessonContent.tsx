"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useState } from "react";

import CodeViewer from "@/components/CodeViewer";
import CustomCard from "./CustomCard";
import { MDXRemote } from "next-mdx-remote";
import PageNav from "@/components/PageNav";
import Panels from "@/components/Panels";
import SendTransaction from "./SendTransaction";
import { useLineHighlight } from "@/context/LineHighlight";

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
  files: FilesContent;
  mdxDoc: any;
}

type FilesContent = { name: string; content: string }[];
type CurrentFilesContent = { name: string; content: string };

// Placeholder for total lessons per module
const totalLessons: Record<string, number> = {
  "1": 3,
  "2": 2,
  "3": 1,
};

export default function LessonContent({ params, files, mdxDoc }: LessonProps) {
  // State to store the files content
  const [filesContent, setFilesContent] = useState<FilesContent>([]);

  // State to store the current file
  const [currentFile, setCurrentFile] = useState<CurrentFilesContent>();

  // Lines to highlight, used for static code viewer
  const { linesToHighlight, fileToHighlight } = useLineHighlight();
  // language used for static code viewer, hardcoded for now
  const language = "typescript";

  const components = { CustomCard, SendTransaction };

  useEffect(() => {
    setFilesContent(files);
    setCurrentFile(files[0]);
  }, [files]);

  // Select the file to display in the right panel
  useEffect(() => {
    if (fileToHighlight != null && fileToHighlight < filesContent.length) {
      setCurrentFile(filesContent[fileToHighlight]);
    }
  }, [fileToHighlight]);
  return (
    <Panels
      LeftPanel={
        <div className="prose w-full max-w-none dark:prose-dark">
          <MDXRemote {...mdxDoc} components={components} />
        </div>
      }
      RightTopPanel={
        <Tabs
          variant={"bordered"}
          selectedKey={currentFile ? currentFile.name : ""}
          onSelectionChange={(name) =>
            setCurrentFile(filesContent.find((file) => file.name === name)!)
          }
        >
          {filesContent.map((file) => (
            <Tab key={file.name} title={file.name}>
              <CodeViewer
                language={language}
                code={currentFile ? currentFile.content : ""}
                linesToHighlight={linesToHighlight}
              />
            </Tab>
          ))}
        </Tabs>
      }
      RightBottomPanel={
        <div className="space-y-4">
          <div className="flex items-center justify-center ">
            <PageNav
              module={params.module}
              lesson={Number(params.lesson)}
              totalLessons={totalLessons[params.module]}
            />
          </div>
        </div>
      }
    />
  );
}
