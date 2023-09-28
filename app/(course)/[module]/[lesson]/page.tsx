"use client";
import dynamic from "next/dynamic";
import ClientComponent from "@/components/ClientComponent";
import CodeViewer from "@/components/Codeviewer";
import { useLineHighlight } from "@/context/LineHighlight";
import { useEffect, useMemo, useState } from "react";

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
}
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

  const [codeString, setCodeString] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/readfile`, {
          method: "POST",
          body: JSON.stringify(params),
        });

        const data = await response.json();
        console.log("data", data.message);
        setCodeString(data.codeString);
      } catch (error) {
        console.error("Failed to fetch the data", error);
      }
    };

    fetchData();
  }, [params]);

  const language = "javascript";
  const { linesToHighlight } = useLineHighlight();

  return (
    <main className="h-[90vh] p-1">
      <ClientComponent
        LeftPanel={<DynamicDoc />}
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

export default Lesson;

// interface LessonProps {
//   params: {
//     module: string;
//     lesson: string;
//   };
// }

// export default function Lesson({ params }: LessonProps) {
//   return (
//     <div className="flex flex-col justify-center items-center space-y-2 h-[50vh]">
//       <span>Module {params.module}</span>
//       <span>Lesson {params.lesson}</span>
//       <Button href={`/`} as={Link}>
//         Home
//       </Button>
//     </div>
//   );
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { params } = context;

//   const lessonDirPath = path.join(
//     process.cwd(),
//     "content",
//     "course",
//     params!.module as string,
//     `${params!.lesson}-lesson`
//   );

//   // // Importing README.mdx content
//   // const readmePath = path.join(lessonDirPath, "README.mdx");
//   // const docContent = fs.readFileSync(readmePath, "utf-8");

//   // Importing file.ts content
//   const filePath = path.join(lessonDirPath, "file.ts");
//   const codeString = fs.existsSync(filePath)
//     ? fs.readFileSync(filePath, "utf-8")
//     : ""; // Check if file exists

//   return {
//     props: {
//       module: params!.module,
//       lesson: params!.lesson,
//       // docContent,
//       codeString,
//     },
//   };
// };
