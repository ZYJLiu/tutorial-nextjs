// not working, maybe because content is client side rendered?
"use client";
import React from "react";

import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Spinner color="default" size="lg" />
    </div>
  );
}
