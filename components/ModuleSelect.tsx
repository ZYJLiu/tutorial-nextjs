import { Card, CardBody } from "@nextui-org/card";

import { Image } from "@nextui-org/image";
import Link from "next/link";

// Links to each module page, placeholder description
const modules = [
  {
    href: "/1",
    label: "Client Module",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/icons/DeveloperPortal.png",
  },
  {
    href: "/2",
    label: "Anchor Module",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/icons/DeveloperToolkit.png",
  },
  {
    href: "/3",
    label: "Frontend Module",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/icons/SagaPhone.png",
  },
];

export default function ModuleSelect() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 ">
      {modules.map((module) => (
        <Link href={module.href} key={module.href}>
          <Card
            className="w-[40vw] border border-transparent hover:border-gray-400 "
            isPressable
            isHoverable
          >
            <CardBody className="grid grid-cols-6 items-center gap-6 md:grid-cols-12 md:gap-4">
              <div className="relative col-span-6 md:col-span-4">
                <Image src={module.image} />
              </div>
              <div className="col-span-6 flex flex-col md:col-span-8">
                <span className="mb-2 text-lg font-semibold">
                  {module.label}
                </span>
                <span>{module.description}</span>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
