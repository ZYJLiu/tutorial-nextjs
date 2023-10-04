"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useMemo, useState } from "react";

import CodeViewer from "@/components/CodeViewer";
import PageNav from "@/components/PageNav";
import Panels from "@/components/Panels";
import dynamic from "next/dynamic";
import { useLineHighlight } from "@/context/LineHighlight";

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
}

type FilesContent = { name: string; content: string }[];

// Placeholder for total lessons per module
const totalLessons: Record<string, number> = {
  "1": 3,
  "2": 2,
  "3": 1,
};

// Dynamic route to display the module lesson page
function Lesson({ params }: LessonProps) {
  // Get the MDX file for the lesson
  const DynamicDoc = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/content/course/${params.module}-module/${params.lesson}-lesson/README.mdx`
          ),
      ),
    [params.module, params.lesson],
  );

  // State to store the files content
  const [filesContent, setFilesContent] = useState<FilesContent>([]);

  // State to store the current file
  const [currentFile, setCurrentFile] = useState(filesContent[0]);

  // Lines to highlight, used for static code viewer
  const { linesToHighlight, fileToHighlight } = useLineHighlight();
  // language used for static code viewer, hardcoded for now
  const language = "typescript";

  // Fetch the files content using nextjs API route, because can't use fs in the browser
  // This fetches the files to display in the right panel
  // TODO: find a better way to do this
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the files content
        const response = await fetch(`${window.location.origin}/api/readfile`, {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("data", data);

        // Set the files content
        setFilesContent(data.filesContent);
      } catch (error) {
        console.error("Failed to fetch the data", error);
      }
    };

    fetchData();
  }, []);

  // Select the file to display in the right panel
  useEffect(() => {
    if (fileToHighlight != null && fileToHighlight < filesContent.length) {
      setCurrentFile(filesContent[fileToHighlight]);
    }
  }, [fileToHighlight]);

  return (
    <main className="h-[90vh] p-1">
      <Panels
        LeftPanel={<DynamicDoc />}
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
    </main>
  );
}

export default Lesson;
