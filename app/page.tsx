import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3">
      <div className="relative h-[60vh] w-full">
        <video
          className="absolute top-0 h-full w-full px-5"
          src="/opos.mp4"
          autoPlay
          muted
          loop
        />
      </div>
      <Button href="/1/1" color="primary" size="lg" as={Link}>
        Start Course
      </Button>

      <Button href="/modules" size="lg" variant="bordered" as={Link}>
        View Course
      </Button>
    </div>
  );
}
