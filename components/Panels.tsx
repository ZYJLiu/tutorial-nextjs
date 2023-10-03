"use client";

import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import ResizeHandle from "./ResizeHandle";
import { useRef } from "react";

// Layout for the panels for the lesson pages
export default function Panels({
  //   defaultLayout,
  LeftPanel,
  RightTopPanel,
  RightBottomPanel,
  setRightTopPanelHeight,
  setRightBottomPanelHeight,
}: {
  //   defaultLayout: number[];
  LeftPanel: React.ReactNode;
  RightTopPanel: React.ReactNode;
  RightBottomPanel: React.ReactNode;
  setRightTopPanelHeight?: any;
  setRightBottomPanelHeight?: any;
}) {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  const rightTopPanelRef = useRef<ImperativePanelHandle>(null);
  const rightBottomPanelRef = useRef<ImperativePanelHandle>(null);

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
            defaultSize={60}
            ref={rightTopPanelRef}
            onResize={() =>
              setRightTopPanelHeight(
                rightTopPanelRef.current?.getSize("pixels")! - 50,
              )
            }
          >
            <div className="h-full w-full overflow-auto">{RightTopPanel}</div>
          </Panel>
          {/* <PanelResizeHandle className="my-1 h-2 bg-slate-300" /> */}
          <ResizeHandle />
          <Panel
            defaultSize={40}
            ref={rightBottomPanelRef}
            onResize={() =>
              setRightBottomPanelHeight(
                rightBottomPanelRef.current?.getSize("pixels")! - 50,
              )
            }
          >
            <div className="h-full w-full overflow-auto">
              {RightBottomPanel}
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}
