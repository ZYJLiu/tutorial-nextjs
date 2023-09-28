"use client";
import React, { ReactNode } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useLineHighlight } from "@/context/LineHighlight";
import { parseHighlightString } from "@/utils/ParseHighlightString";

interface CustomCardProps {
  children: ReactNode;
  linesToHighlight?: string;
}

export default function CustomCard({
  children,
  linesToHighlight,
}: CustomCardProps) {
  const { setLinesToHighlight } = useLineHighlight();
  const lines = parseHighlightString(linesToHighlight || "");
  return (
    <Card
      className="mb-2 w-full"
      isPressable
      isHoverable
      onPress={() => setLinesToHighlight(lines || [])}
    >
      <CardBody>{children}</CardBody>
    </Card>
  );
}
