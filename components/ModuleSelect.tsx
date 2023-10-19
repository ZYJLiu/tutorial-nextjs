"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";

interface Lesson {
  name: string;
  subtitle: string;
  description: string;
}

interface Module {
  number: string;
  label: string;
  description: string;
  image: string;
  lessons: Lesson[];
}

const modulesData: Module[] = [
  {
    number: "1",
    label: "Client Module",
    description:
      "Learn the basics of interacting with the Solana blockchain using only client-side libraries.",
    image: "/icons/DeveloperPortal.png",
    lessons: [
      {
        name: "Lesson 1",
        subtitle: "Airdrop SOL",
        description: "Learn how to airdrop Devnet SOL",
      },
      {
        name: "Lesson 2",
        subtitle: "Subtitle",
        description: "Description for Lesson 2...",
      },
      {
        name: "Lesson 3",
        subtitle: "Subtitle",
        description: "Description for Lesson 3...",
      },
    ],
  },
  {
    number: "2",
    label: "Anchor Module",
    description:
      "Learn the basics of writing Solana programs using the Anchor Framework.",
    image: "/icons/DeveloperToolkit.png",
    lessons: [
      {
        name: "Lesson 1",
        subtitle: "Subtitle",
        description: "Description for Lesson 1...",
      },
      {
        name: "Lesson 2",
        subtitle: "Subtitle",
        description: "Description for Lesson 2...",
      },
    ],
  },
  {
    number: "3",
    label: "Frontend Module",
    description:
      "Learn how to build a frontend to interact with your Solana program.",
    image: "/icons/SagaPhone.png",
    lessons: [],
  },
];

export default function ModuleSelect() {
  sessionStorage.clear();

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-2 px-10">
      {modulesData.map((module) => (
        <Card
          className="sm:w-3/4 md:w-3/4 md:p-4 lg:w-2/5"
          isHoverable
          key={module.label}
        >
          <CardBody className="grid grid-cols-6 items-center gap-6 md:grid-cols-12 md:gap-4">
            <div className="relative col-span-6 justify-self-center md:col-span-4">
              <img
                src={module.image}
                alt={module.label}
                className="h-auto w-full max-w-[200px]"
              />
            </div>
            <div className="col-span-6 flex flex-col md:col-span-8">
              <span className="mb-2 text-lg font-semibold">{module.label}</span>
              <span>{module.description}</span>
            </div>
            <Accordion
              className="col-span-6 md:col-span-12"
              variant="splitted"
              fullWidth
            >
              {module.lessons.map((lesson, index) => (
                <AccordionItem
                  key={index}
                  aria-label={lesson.name}
                  title={lesson.name}
                  subtitle={lesson.subtitle}
                  className="border border-transparent p-2 hover:border-gray-400"
                >
                  <div className="mb-2 flex flex-col items-center justify-center">
                    <div className="mb-2">{lesson.description}</div>
                    <Button
                      key={index}
                      href={`/${module.number}/${index + 1}`}
                      as={Link}
                    >
                      Start
                    </Button>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
