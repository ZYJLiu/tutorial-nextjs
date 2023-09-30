"use client";
import dynamic from "next/dynamic";
import ClientComponent from "@/components/ClientComponent";
import CodeViewer from "@/components/Codeviewer";
import { useLineHighlight } from "@/context/LineHighlight";
import { useEffect, useMemo, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";

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

  const [filesContent, setFilesContent] = useState<FilesContent>([]);
  const [currentFile, setCurrentFile] = useState(filesContent[0]);

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

  const language = "typescript";
  const { linesToHighlight } = useLineHighlight();

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
        RightBottomPanel={<div>Custom Content for Right Bottom Panel</div>}
      />
    </main>
  );
}

export default Lesson;
