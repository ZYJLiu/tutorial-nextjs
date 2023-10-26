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
  LeftPanel,
  RightTopPanel,
  RightBottomPanel,
  setRightTopPanelHeight,
  setRightBottomPanelHeight,
}: {
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
    <PanelGroup direction="horizontal" autoSaveId="persistence">
      <Panel className="flex" defaultSize={50} collapsible>
        <div className="mb-2 w-full overflow-auto px-5">{LeftPanel}</div>
      </Panel>
      <ResizeHandle />
      <Panel collapsible defaultSize={50}>
        <PanelGroup direction="vertical">
          <Panel
            defaultSize={70}
            ref={rightTopPanelRef}
            onResize={handleRightTopPanelResize}
            collapsible
          >
            <div className="h-full w-full overflow-auto">{RightTopPanel}</div>
          </Panel>
          <ResizeHandle />
          <Panel
            defaultSize={30}
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
