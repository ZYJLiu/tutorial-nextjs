import { NextRequest, NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';

async function getFile(params: { module: string; lesson: string }) {
  console.log("params", params);
  const lessonDirPath = path.join(
    process.cwd(),
    "content",
    "course",
    `${params!.module}-module`,
    `${params!.lesson}-lesson`
  );

  const filePath = path.join(lessonDirPath, "file.ts");
  console.log("filePath", filePath);
  const codeString = fs.readFileSync(filePath, "utf-8");

  return codeString;
}


export async function POST(request: NextRequest): Promise<NextResponse> {
    const { module, lesson } = await request.json();
    try {
      const codeString =  await getFile({ module, lesson });
      return NextResponse.json({ codeString }, { status: 200 });
    } catch (error) {
      console.error('Error in POST function: ', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }