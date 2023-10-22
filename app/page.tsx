import { Button } from "@nextui-org/button";
import Link from "next/link";
import dynamic from "next/dynamic";

// Fixes hydration error
const SolanaVideo = dynamic(() => import("@/components/SolanaVideo"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3">
      <div className="relative h-[60vh] w-full">
        <SolanaVideo />
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
