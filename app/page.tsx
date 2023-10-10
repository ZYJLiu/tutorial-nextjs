import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-2">
      <video className="h-[60vh] " src="/opos.mp4" autoPlay muted loop></video>

      <Button href="/1/1" color="primary" as={Link}>
        Start Course
      </Button>

      <Button href="/modules" as={Link}>
        View Course
      </Button>
    </div>
  );
}
