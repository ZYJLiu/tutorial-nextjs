"use client";
import ClientComponent from "@/components/ClientComponent";
import CodeViewer from "@/components/Codeviewer";
import getDefaultLayout from "@/utils/PanelDefault";
import Doc from "./doc.mdx";
import { useLineHighlight } from "@/context/LineHighlight";
import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function Home() {
  const files = [
    {
      name: "file1",
      content: `function HelloWorld() {
      console.log('Hello, World!');
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

  const [currentFile, setCurrentFile] = useState(files[0]);

  const language = "javascript";

  const { linesToHighlight } = useLineHighlight();

  return (
    <main className="h-[90vh] p-1">
      <ClientComponent
        // defaultLayout={defaultLayout}
        LeftPanel={<Doc />}
        RightTopPanel={
          <Tabs
            variant={"bordered"}
            selectedKey={currentFile.name}
            onSelectionChange={(name) =>
              setCurrentFile(files.find((file) => file.name === name)!)
            }
          >
            {files.map((file) => (
              <Tab key={file.name} title={file.name}>
                <CodeViewer
                  language={language}
                  code={currentFile.content}
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
