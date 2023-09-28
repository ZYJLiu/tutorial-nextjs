"use client";
import ClientComponent from "@/components/ClientComponent";
import CodeViewer from "@/components/Codeviewer";
import getDefaultLayout from "@/utils/PanelDefault";
import Doc from "./doc.mdx";
import { useLineHighlight } from "@/context/LineHighlight";

export default function Home() {
  const codeString = `function HelloWorld() {
    console.log('Hello, World!');
    console.log('Hello, World!');
    console.log('Hello, World!');
  }`;
  const language = "javascript";

  const { linesToHighlight } = useLineHighlight();

  // const defaultLayout = [100, 33, 67];

  // const defaultLayout = getDefaultLayout();
  return (
    <main className="h-[90vh] p-1">
      <ClientComponent
        // defaultLayout={defaultLayout}
        LeftPanel={<Doc />}
        RightTopPanel={
          <CodeViewer
            language={language}
            code={codeString}
            linesToHighlight={linesToHighlight}
          />
        }
        RightBottomPanel={<div>Custom Content for Right Bottom Panel</div>}
      />
    </main>
  );
}
