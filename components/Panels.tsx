"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
} from "react-resizable-panels";

import ResizeHandle from "./ResizeHandle";

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
  setRightTopPanelHeight?: Dispatch<SetStateAction<number | string>>;
  setRightBottomPanelHeight?: Dispatch<SetStateAction<number | string>>;
}) {
  const rightTopPanelRef = useRef<ImperativePanelHandle>(null);
  const rightBottomPanelRef = useRef<ImperativePanelHandle>(null);

  const handleRightTopPanelResize = () => {
    const size = rightTopPanelRef.current?.getSize("pixels");
    if (size !== undefined && setRightTopPanelHeight) {
      setRightTopPanelHeight(size - 70);
    }
  };

  const handleRightBottomPanelResize = () => {
    const size = rightBottomPanelRef.current?.getSize("pixels");
    if (size !== undefined && setRightBottomPanelHeight) {
      setRightBottomPanelHeight(size - 75);
    }
  };

  return (
    <PanelGroup direction="horizontal">
      <Panel
        className="flex justify-center rounded-lg p-2 text-center"
        defaultSize={50}
      >
        <div className="w-full overflow-auto pl-5 pr-5">{LeftPanel}</div>
      </Panel>
      {/* <PanelResizeHandle className="mx-1 w-2 bg-slate-300" /> */}
      <ResizeHandle />
      <Panel>
        <PanelGroup direction="vertical">
          <Panel
            defaultSize={60}
            ref={rightTopPanelRef}
            onResize={handleRightTopPanelResize}
          >
            <div className="h-full w-full overflow-auto">{RightTopPanel}</div>
          </Panel>
          {/* <PanelResizeHandle className="my-1 h-2 bg-slate-300" /> */}
          <ResizeHandle />
          <Panel
            defaultSize={40}
            ref={rightBottomPanelRef}
            onResize={handleRightBottomPanelResize}
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
