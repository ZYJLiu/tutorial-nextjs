// Test panel for resetting
import Panels from "@/components/Panels";

export default function Home() {
  return (
    <main className="h-[90vh] p-1">
      <Panels
        LeftPanel={<div>Custom Content for Left Panel</div>}
        RightTopPanel={<div>Custom Content for Right Top Panel</div>}
        RightBottomPanel={<div>Custom Content for Right Bottom Panel</div>}
      />
    </main>
  );
}
