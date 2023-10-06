import LessonContent from "@/components/LessonContent";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";

// placeholder
export function generateStaticParams() {
  return [
    { module: "1", lesson: "1" },
    { module: "1", lesson: "2" },
    { module: "1", lesson: "3" },
    { module: "1", lesson: "4" },
    { module: "1", lesson: "5" },
    { module: "2", lesson: "1" },
    { module: "2", lesson: "2" },
    { module: "2", lesson: "2" },
  ];
}

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
}

async function Lesson({ params }: LessonProps) {
  const [filesContent, solutionFileContent, mdxContent] = await Promise.all([
    getFilesFromDirectory(params, "code"),
    getFilesFromDirectory(params, "solution"),
    getMdxContentByPath(params),
  ]);

  return (
    <main className="h-[90vh] p-1">
      <LessonContent
        params={params}
        files={filesContent}
        solutions={solutionFileContent}
        mdxDoc={mdxContent}
      />
    </main>
  );
}

export default Lesson;

function constructPath(
  params: { module: string; lesson: string },
  subfolder: string,
): string {
  return path.join(
    process.cwd(),
    "content",
    "course",
    `${params.module}-module`,
    `${params.lesson}-lesson`,
    subfolder,
  );
}

async function getFilesFromDirectory(
  params: { module: string; lesson: string },
  subfolder: string,
) {
  const directoryPath = constructPath(params, subfolder);

  try {
    const fileNames = await fs.promises.readdir(directoryPath);

    const files = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(directoryPath, fileName);
        const content = await fs.promises.readFile(filePath, "utf-8");
        return {
          name: fileName,
          content,
        };
      }),
    );

    return files;
  } catch (error) {
    console.error(`Error reading files from ${subfolder}:`, error);
    throw error;
  }
}

async function getMdxContentByPath(params: { module: string; lesson: string }) {
  const relativePath = constructPath(params, "README.mdx");
  const fileContent = fs.readFileSync(relativePath, { encoding: "utf8" });
  return serialize(fileContent, {
    // @ts-ignore
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });
}
