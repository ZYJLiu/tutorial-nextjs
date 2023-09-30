import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Modules() {
  // Define an array of modules with href and label.
  const modules = [
    { href: "/1", label: "Module 1" },
    { href: "/2", label: "Module 2" },
    { href: "/3", label: "Module 3" },
  ];

  return (
    <div className="flex flex-col justify-center items-center space-y-2 h-[50vh]">
      {modules.map((module) => (
        <Button key={module.href} href={module.href} as={Link}>
          {module.label}
        </Button>
      ))}
    </div>
  );
}
