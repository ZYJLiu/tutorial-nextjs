// Used to get lines to highlight in code snippets for "CustomCard" component
// ex. <CustomCard linesToHighlight="15-19, 26-27, 30-37" file={1}>
export function parseHighlightString(str: string): number[] {
  const parts = str.split(",").map((s) => s.trim());
  let result: number[] = [];

  for (const part of parts) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      result = result.concat(
        Array.from({ length: end - start + 1 }, (_, i) => i + start),
      );
    } else {
      result.push(Number(part));
    }
  }

  return result;
}
