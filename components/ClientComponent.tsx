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
        className="flex justify-center rounded-lg p-2 text-center"
        defaultSize={50}
      >
        <div className="w-full overflow-auto pl-5 pr-5">{LeftPanel}</div>
      </Panel>
      {/* <PanelResizeHandle className="mx-1 w-2 bg-slate-300" /> */}
      <ResizeHandle />
      <Panel>
        <PanelGroup direction="vertical" onLayout={onLayout}>
          <Panel
            className="flex items-center justify-center rounded-lg p-2 text-center"
            defaultSize={90}
          >
            <div className="h-full w-full overflow-auto">{RightTopPanel}</div>
          </Panel>
          {/* <PanelResizeHandle className="my-1 h-2 bg-slate-300" /> */}
          <ResizeHandle />
          <Panel
            className="flex items-center justify-center rounded-lg p-2 text-center"
            defaultSize={10}
          >
            {RightBottomPanel}
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}
