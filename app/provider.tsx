"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LineHighlightProvider } from "@/context/LineHighlight";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="dark">
        <LineHighlightProvider>{children}</LineHighlightProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
