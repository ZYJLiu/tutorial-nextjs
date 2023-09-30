"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface PageNavProps {
  module: string;
  lesson: number;
  totalLessons: number;
}

export default function PageNav({
  module,
  lesson,
  totalLessons,
}: PageNavProps) {
  return (
    <div className="flex space-x-4">
      <Button
        isDisabled={lesson <= 1}
        href={`/${module}/${lesson - 1}`}
        as={Link}
      >
        Previous
      </Button>
      <Button
        isDisabled={lesson >= totalLessons}
        href={`/${module}/${lesson + 1}`}
        as={Link}
      >
        Next
      </Button>
    </div>
  );
}
