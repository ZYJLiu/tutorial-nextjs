"use client";

import { useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import Link from "next/link";
import Image from "next/image";

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

const modules: Module[] = [
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
        subtitle: "Transfer SOL",
        description: "Description for Lesson 2...",
      },
      {
        name: "Lesson 3",
        subtitle: "Create Mint Account",
        description: "Description for Lesson 3...",
      },
      {
        name: "Lesson 4",
        subtitle: "Create Token Account",
        description: "Description for Lesson 4...",
      },
      {
        name: "Lesson 5",
        subtitle: "Create Associated Token Account",
        description: "Description for Lesson 5...",
      },
      {
        name: "Lesson 6",
        subtitle: "Mint Tokens",
        description: "Description for Lesson 6...",
      },
      {
        name: "Lesson 7",
        subtitle: "Transfer Tokens",
        description: "Description for Lesson 7...",
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-2 px-2">
      {modules.map((module) => (
        <Card
          className="sm:w-3/4 md:w-3/4 md:p-4 lg:w-2/5"
          isHoverable
          key={module.label}
        >
          <CardBody>
            <Accordion hideIndicator={true}>
              <AccordionItem
                className="relative"
                startContent={
                  <Image
                    src={module.image}
                    alt=""
                    className="w-[10vw] min-w-[75px]"
                    width={300}
                    height={300}
                  />
                }
                aria-label={module.label}
                title={module.label}
                subtitle={module.description}
              >
                <Accordion variant="splitted">
                  {module.lessons.map((lesson, index) => (
                    <AccordionItem
                      key={index}
                      aria-label={lesson.name}
                      title={lesson.name}
                      subtitle={
                        <Progress
                          label={lesson.subtitle}
                          size="sm"
                          value={0}
                          showValueLabel={true}
                        />
                      }
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
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
