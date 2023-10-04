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
      setRightTopPanelHeight(size - 55);
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
        collapsible
      >
        <div className="w-full overflow-auto pl-5 pr-5">{LeftPanel}</div>
      </Panel>
      <ResizeHandle />
      <Panel collapsible>
        <PanelGroup direction="vertical">
          <Panel
            defaultSize={60}
            ref={rightTopPanelRef}
            onResize={handleRightTopPanelResize}
            collapsible
          >
            <div className="h-full w-full overflow-auto">{RightTopPanel}</div>
          </Panel>
          <ResizeHandle />
          <Panel
            defaultSize={40}
            ref={rightBottomPanelRef}
            onResize={handleRightBottomPanelResize}
            collapsible
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
