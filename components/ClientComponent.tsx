"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResizeHandle from "./ResizeHandle";

export default function ClientComponent({
  //   defaultLayout,
  LeftPanel,
  RightTopPanel,
  RightBottomPanel,
}: {
  //   defaultLayout: number[];
  LeftPanel: React.ReactNode;
  RightTopPanel: React.ReactNode;
  RightBottomPanel: React.ReactNode;
}) {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  return (
    <PanelGroup direction="horizontal" onLayout={onLayout}>
      <Panel
        className="rounded-lg flex justify-center text-center p-2"
        // defaultSize={defaultLayout[0]}
        // minSize={20}
      >
        <div className="overflow-auto w-full pl-5 pr-5">{LeftPanel}</div>
      </Panel>
      {/* <PanelResizeHandle className="mx-1 w-2 bg-slate-300" /> */}
      <ResizeHandle />
      <Panel>
        <PanelGroup direction="vertical" onLayout={onLayout}>
          <Panel
            className="rounded-lg flex items-center justify-center text-center p-2"
            // defaultSize={defaultLayout[1]}
          >
            {RightTopPanel}
          </Panel>
          {/* <PanelResizeHandle className="my-1 h-2 bg-slate-300" /> */}
          <ResizeHandle />
          <Panel
            className="rounded-lg flex items-center justify-center text-center p-2"
            // defaultSize={defaultLayout[2]}
          >
            {RightBottomPanel}
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}
