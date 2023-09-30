"use client";
import dynamic from "next/dynamic";
import ClientComponent from "@/components/ClientComponent";
import CodeViewer from "@/components/Codeviewer";
import { useLineHighlight } from "@/context/LineHighlight";
import { useEffect, useMemo, useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import PageNav from "@/components/PageNav";

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
}

type FilesContent = { name: string; content: string }[];

function Lesson({ params }: LessonProps) {
  const DynamicDoc = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/content/course/${params.module}-module/${params.lesson}-lesson/README.mdx`
          )
      ),
    [params.module, params.lesson]
  );

  const totalLessons: Record<string, number> = {
    "1": 3,
    "2": 2,
    "3": 1,
  };

  const [filesContent, setFilesContent] = useState<FilesContent>([]);
  const [currentFile, setCurrentFile] = useState(filesContent[0]);
  const { linesToHighlight, fileToHighlight } = useLineHighlight();
  const language = "typescript";

  useEffect(() => {
    if (fileToHighlight != null && fileToHighlight < filesContent.length) {
      setCurrentFile(filesContent[fileToHighlight]);
    }
  }, [fileToHighlight]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        setFilesContent(data.filesContent);
      } catch (error) {
        console.error("Failed to fetch the data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="h-[90vh] p-1">
      <ClientComponent
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
          <PageNav
            module={params.module}
            lesson={Number(params.lesson)}
            totalLessons={totalLessons[params.module]}
          />
        }
      />
    </main>
  );
}

export default Lesson;
