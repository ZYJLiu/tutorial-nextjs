import React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export type CodeViewerProps = {
  language: string;
  code: string;
  linesToHighlight?: number[];
  startingLineNumber?: number;
};

// Component for displaying static code snippets
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
        if (linesToHighlight.length === 0) return {};

        let style = {};
        let className = "block";

        // If the line is not in the list, dim the line.
        if (!linesToHighlight.includes(lineNumber)) {
          style = { filter: "contrast(0.3)" };
        } else {
          // If the line is in the list, highlight its background.
          style = { backgroundColor: "#4444" };
        }

        return { style, className };
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
