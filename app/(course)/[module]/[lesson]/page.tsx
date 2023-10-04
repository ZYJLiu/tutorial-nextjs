import LessonContent from "@/components/LessonContent";
import fs from "fs";
import path from "path";

// placeholder
export function generateStaticParams() {
  return [
    { module: "1", lesson: "1" },
    { module: "1", lesson: "2" },
    { module: "1", lesson: "3" },
    { module: "2", lesson: "1" },
    { module: "2", lesson: "2" },
  ];
}

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
}

// Dynamic route to display the module lesson page
async function Lesson({ params }: LessonProps) {
  const filesContent = await getFiles(params);

  return (
    <main className="h-[90vh] p-1">
      <LessonContent params={params} files={filesContent} />
    </main>
  );
}

export default Lesson;

// Get files in ./content/course/[module]-module/[lesson]-lesson/code
async function getFiles(params: { module: string; lesson: string }) {
  console.log("params", params);
  const lessonDirPath = path.join(
    process.cwd(),
    "content",
    "course",
    `${params!.module}-module`,
    `${params!.lesson}-lesson`,
    "code",
  );

  try {
    // Read the names of all files in the directory
    const fileNames = await fs.promises.readdir(lessonDirPath);

    const filesContent: { name: string; content: string }[] = [];

    // Loop over all files and read their content
    for (const fileName of fileNames) {
      const filePath = path.join(lessonDirPath, fileName);
      const fileContent = await fs.promises.readFile(filePath, "utf-8");
      filesContent.push({
        name: fileName,
        content: fileContent,
      });
    }

    return filesContent;
  } catch (error) {
    console.error("Error reading files:", error);
    throw error;
  }
}
