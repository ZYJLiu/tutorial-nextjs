// Test panel for resetting
import Panels from "@/components/Panels";
import getDefaultLayout from "@/utils/PanelDefault";

export default function Home() {
  // const defaultLayout = getDefaultLayout();

  return (
    <main className="h-[90vh] p-1">
      <Panels
        // defaultLayout={defaultLayout}
        LeftPanel={<div>Custom Content for Left Panel</div>}
        RightTopPanel={<div>Custom Content for Right Top Panel</div>}
        RightBottomPanel={<div>Custom Content for Right Bottom Panel</div>}
      />
    </main>
  );
}
