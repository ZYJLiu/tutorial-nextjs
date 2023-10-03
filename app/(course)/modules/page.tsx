import { Button } from "@nextui-org/button";
import Link from "next/link";

// Page to display the list of modules in the course
export default function Modules() {
  // Links to each module page
  const modules = [
    { href: "/1", label: "Module 1" },
    { href: "/2", label: "Module 2" },
  ];

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center space-y-2">
      {modules.map((module) => (
        <Button key={module.href} href={module.href} as={Link}>
          {module.label}
        </Button>
      ))}
    </div>
  );
}
