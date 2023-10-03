import { Button } from "@nextui-org/button";
import Link from "next/link";

interface ModuleProps {
  params: {
    module: string;
  };
}

interface Modules {
  [key: string]: string[];
}

const modules: Modules = {
  "1": ["Lesson 1", "Lesson 2"],
  "2": ["Lesson 1", "Lesson 2"],
  "3": ["Lesson 1", "Lesson 2", "Lesson 3"],
};

export default function Module({ params }: ModuleProps) {
  const lessons = modules[params.module] || [];

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center space-y-2">
      {lessons.map((lesson, index) => (
        <Button key={index} href={`/${params.module}/${index + 1}`} as={Link}>
          {lesson}
        </Button>
      ))}
    </div>
  );
}
