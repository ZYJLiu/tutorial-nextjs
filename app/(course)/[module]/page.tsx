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
    <div className="flex flex-col justify-center items-center space-y-2 h-[50vh]">
      {lessons.map((lesson, index) => (
        <Button key={index} href={`/${params.module}/${index + 1}`} as={Link}>
          {lesson}
        </Button>
      ))}
    </div>
  );
}
