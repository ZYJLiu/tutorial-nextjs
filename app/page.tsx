"use client";
import { Button, Spacer } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <Button href="/1/1" as={Link}>
        Start Course
      </Button>

      <Spacer y={1} />

      <Button href="/modules" as={Link}>
        View Course
      </Button>
    </div>
  );
}
