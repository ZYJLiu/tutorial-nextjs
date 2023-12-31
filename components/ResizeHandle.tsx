import Icon from "./Icon";
import { PanelResizeHandle } from "react-resizable-panels";
import styles from "./ResizeHandle.module.css";

// Copied from "react-resizable-panels" demo to apply custom styles to the resize handle for the panels
export default function ResizeHandle({
  className = "",
  collapsed = false,
  id,
}: {
  className?: string;
  collapsed?: boolean;
  id?: string;
}) {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandleOuter, className].join(" ")}
      id={id}
    >
      <div
        className={styles.ResizeHandleInner}
        data-collapsed={collapsed || undefined}
      >
        <Icon className={styles.HorizontalIcon} type="resize-horizontal" />
        <Icon className={styles.VerticalIcon} type="resize-vertical" />
      </div>
    </PanelResizeHandle>
  );
}
