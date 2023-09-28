"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface LessonProps {
  params: {
    module: string;
    lesson: string;
  };
}

export default function Lesson({ params }: LessonProps) {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 h-[50vh]">
      <span>Module {params.module}</span>
      <span>Lesson {params.lesson}</span>
      <Button href={`/`} as={Link}>
        Home
      </Button>
    </div>
  );
}
