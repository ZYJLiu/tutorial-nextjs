"use client";
import React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export type CodeViewerProps = {
  language: string;
  code: string;
  linesToHighlight?: number[];
  startingLineNumber?: number;
};

export default function CodeViewer({
  language,
  code,
  linesToHighlight = [],
  startingLineNumber = 1,
}: CodeViewerProps) {
  return (
    <SyntaxHighlighter
      startingLineNumber={startingLineNumber}
      language={language}
      style={vscDarkPlus}
      customStyle={{ background: "#000000" }}
      showLineNumbers
      wrapLines
      lineProps={(lineNumber) => {
        const style = !linesToHighlight.includes(lineNumber)
          ? { filter: "contrast(0.3)" }
          : {};
        const className = "block";
        return { style, className };
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
