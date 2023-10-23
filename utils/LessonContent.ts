import * as parser from "@babel/parser";

import generate from "@babel/generator";
import toast from "react-hot-toast";
import traverse from "@babel/traverse";
import confettiCannon from "./ConfettiEffect";

// Get the language from the file name for syntax highlighting
export const getLanguageFromFilename = (filename: string) => {
  const extension = filename.split(".").pop();

  switch (extension) {
    case "ts":
      return "typescript";
    case "js":
      return "javascript";
    case "rs":
      return "rust";
    default:
      return "plaintext";
  }
};

// Compare the current editor content with the solution file content
export const compareSolution = (
  currentFileContent: string,
  solutionFileContent: string,
  setIsCorrect: (isCorrect: boolean) => void,
  language: string,
) => {
  try {
    const current = normalizeContent(currentFileContent, language);
    const solution = normalizeContent(solutionFileContent, language);

    if (current === solution) {
      confettiCannon();
      setIsCorrect(true);
      notify("Correct! The content matches the solution.");
    } else {
      setIsCorrect(false);
      notify("The content does not match the solution. Try again!", "error");
    }
  } catch (e) {
    setIsCorrect(false);
    notify("An error occurred while comparing the solution.", "error");
  }
};

const normalizeContent = (content: string, language: string) => {
  return language === "typescript"
    ? normalizeCode(content)
    : normalizeString(content);
};

// For rust file, haven't found Rust lang parser in JS to use
const normalizeString = (str: string): string => {
  const noComments = str.replace(/\/\/.*|\/\*[^]*?\*\//gm, "");

  // Convert all white spaces (space, tabs, new lines) to a single space
  const normalized = noComments.replace(/\s+/g, " ").trim();
  return normalized;
};

// For TS
const normalizeCode = (code: string) => {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript"],
  });
  traverse(ast, {
    enter(path) {
      path.node.leadingComments = [];
      path.node.innerComments = [];
      path.node.trailingComments = [];
    },
  });
  return generate(ast).code;
};

const notify = (message: string, type: "success" | "error" = "success") => {
  const styles = {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  };
  type === "success"
    ? toast.success(message, { style: styles, duration: 2000 })
    : toast.error(message, { style: styles, duration: 1000 });
};
