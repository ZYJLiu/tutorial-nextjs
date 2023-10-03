import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

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

// Nextjs API route to return code files ./api/readfile
// Using API route to use "fs"
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { module, lesson } = await request.json();
  try {
    const filesContent = await getFiles({ module, lesson });
    return NextResponse.json({ filesContent }, { status: 200 });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
