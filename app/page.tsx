import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center space-y-2">
      <Button href="/1/1" as={Link}>
        Start Course
      </Button>

      <Button href="/modules" as={Link}>
        View Course
      </Button>
    </div>
  );
}
