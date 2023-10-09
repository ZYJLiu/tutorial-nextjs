"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { Button } from "@nextui-org/button";
import Link from "next/link";

interface Modules {
  [key: string]: Lesson[];
}

interface Lesson {
  name: string;
  subtitle: string;
  description: string;
}

// Placeholder
const modules: Modules = {
  "1": [
    {
      name: "Lesson 1",
      subtitle: "Airdrop SOL",
      description: "Learn how to airdrop Devnet SOL to fund an account.",
    },
    {
      name: "Lesson 2",
      subtitle: "Subtitle",
      description: "Description for Lesson 2 in Module 1.",
    },
    {
      name: "Lesson 3",
      subtitle: "Subtitle",
      description: "Description for Lesson 3 in Module 1.",
    },
    {
      name: "Lesson 4",
      subtitle: "Subtitle",
      description: "Description for Lesson 4 in Module 1.",
    },
    {
      name: "Lesson 5",
      subtitle: "Subtitle",
      description: "Description for Lesson 5 in Module 1.",
    },
  ],
  "2": [
    {
      name: "Lesson 1",
      subtitle: "Subtitle",
      description: "Description for Lesson 1 in Module 2.",
    },
    {
      name: "Lesson 2",
      subtitle: "Subtitle",
      description: "Description for Lesson 2 in Module 2.",
    },
  ],
};

interface LessonSelectProps {
  module: string;
}

export default function LessonSelect({ module }: LessonSelectProps) {
  const lessons = modules[module] || [];

  return (
    <Accordion
      className="items-center justify-center"
      variant="splitted"
      fullWidth={false}
    >
      {lessons.map((lesson, index) => (
        <AccordionItem
          className="w-[30vw]"
          key={index}
          aria-label={lesson.name}
          title={lesson.name}
          subtitle={lesson.subtitle}
        >
          <div className="mb-2 flex flex-col items-center justify-center">
            <div className="mb-2">{lesson.description}</div>
            <Link href={`/${module}/${index + 1}`} key={index}>
              {/* // disable placeholders */}
              <Button isDisabled={index !== 0}>Start</Button>
            </Link>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
