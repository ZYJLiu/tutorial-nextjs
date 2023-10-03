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
