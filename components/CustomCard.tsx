"use client";

import { Card, CardBody } from "@nextui-org/card";
import React, { ReactNode } from "react";

import { parseHighlightString } from "@/utils/ParseHighlightString";
import { useLineHighlight } from "@/context/LineHighlight";

interface CustomCardProps {
  children: ReactNode;
  linesToHighlight?: string;
  file?: number;
}

export default function CustomCard({
  children,
  linesToHighlight,
  file,
}: CustomCardProps) {
  const { setLinesToHighlight, setFileToHighlight } = useLineHighlight();
  const lines = parseHighlightString(linesToHighlight || "");
  const fileToHighlight = file || 0;
  return (
    <Card
      className="mb-2 w-full"
      isPressable
      isHoverable
      onPress={() => {
        setLinesToHighlight(lines || []);
        setFileToHighlight(fileToHighlight);
      }}
    >
      <CardBody>{children}</CardBody>
    </Card>
  );
}
