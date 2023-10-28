import LessonContent from "@/components/LessonContent";
import fs from "fs";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import { serialize } from "next-mdx-remote/serialize";

const routes = [
  { module: "1", lesson: "1" },
  { module: "1", lesson: "2" },
  { module: "1", lesson: "3" },
  { module: "1", lesson: "4" },
  { module: "1", lesson: "5" },
  { module: "1", lesson: "6" },
  { module: "1", lesson: "7" },
  // { module: "2", lesson: "1" },
  // { module: "2", lesson: "2" },
];

export function generateStaticParams() {
  return routes;
}

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
}

async function Lesson({ params }: LessonProps) {
  const lessonData = await getLessonData(params);

  return (
    <main className="h-[90vh] p-1">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
      ></link>
      <LessonContent routes={routes} route={params} lessonData={lessonData} />
    </main>
  );
}

export default Lesson;

// Each object will have code, solution, and mdx data for a numbered directory.
async function getLessonData(params: { module: string; lesson: string }) {
  const lessonPath = constructPath(params, "");
  const numberedDirectories = await fs.promises
    .readdir(lessonPath, { withFileTypes: true })
    .then((entries) => {
      return entries.filter((entry) => {
        const isDir = entry.isDirectory();
        const matchesRegex = /^[1-9]\d*$/.test(entry.name);
        return isDir && matchesRegex;
      });
    })
    .then((entries) => entries.map((entry) => entry.name));

  const lessonDataPromises = numberedDirectories.map(async (numberedDir) => {
    const codeFiles = await getFilesFromDirectory(
      params,
      `${numberedDir}/code`,
    );
    const solutionFiles = await getFilesFromDirectory(
      params,
      `${numberedDir}/solution`,
    );
    const mdxContent = await getMdxContentByPath(
      params,
      `${numberedDir}/README.mdx`,
    );

    return {
      code: codeFiles,
      solution: solutionFiles,
      mdx: mdxContent,
    };
  });

  return await Promise.all(lessonDataPromises);
}

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

async function getMdxContentByPath(
  params: { module: string; lesson: string },
  subfolder: string,
) {
  const relativePath = constructPath(params, subfolder);
  const fileContent = fs.promises.readFile(relativePath, { encoding: "utf8" });
  return serialize(await fileContent, {
    // @ts-ignore
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });
}

async function getFilesFromDirectory(
  params: { module: string; lesson: string },
  subfolder: string,
) {
  const directoryPath = constructPath(params, subfolder);

  // Check if the directory exists
  const directoryExists = await fs.promises
    .access(directoryPath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!directoryExists) {
    // console.warn(`Directory ${directoryPath} does not exist.`);
    return [];
  }

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
