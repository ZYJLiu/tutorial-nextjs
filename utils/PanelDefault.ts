import { cookies } from "next/headers";

// Unused currently due to client / server component mismatch
export default function getDefaultLayout() {
  const layout = cookies().get("react-resizable-panels:layout");
  if (layout) {
    return JSON.parse(layout.value);
  }
  return [100, 33, 67];
}
