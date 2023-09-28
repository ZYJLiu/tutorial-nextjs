"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <Button href="/panel" as={Link}>
        Start Course
      </Button>
    </div>
  );
}
