import * as parser from "@babel/parser";

import generate from "@babel/generator";
import toast from "react-hot-toast";
import traverse from "@babel/traverse";

export const compareSolution = (
  currentFileContent: string,
  solutionFileContent: string,
  setIsCorrect: (isCorrect: boolean) => void,
) => {
  try {
    if (
      // currentFileContent === solutionFileContent
      normalizeString(currentFileContent) ===
      normalizeString(solutionFileContent)
      // normalizeCode(currentFileContent) === normalizeCode(solutionFileContent)
    ) {
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

const normalizeString = (str: string): string => {
  const noComments = str.replace(/\/\/.*|\/\*[^]*?\*\//gm, "");

  // Convert all white spaces (space, tabs, new lines) to a single space
  const normalized = noComments.replace(/\s+/g, " ");
  return normalized;
};

// const normalizeCode = (code: string) => {
//   const ast = parser.parse(code, {
//     sourceType: "module",
//     plugins: ["typescript"],
//   });
//   traverse(ast, {
//     enter(path) {
//       path.node.leadingComments = [];
//       path.node.innerComments = [];
//       path.node.trailingComments = [];
//     },
//   });
//   return generate(ast).code;
// };

const notify = (message: string, type: "success" | "error" = "success") => {
  const styles = {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  };
  type === "success"
    ? toast.success(message, { style: styles, duration: 1500 })
    : toast.error(message, { style: styles, duration: 1000 });
};
