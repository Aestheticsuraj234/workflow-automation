
import { NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { memo } from "react";

export const ManualTriggerNode = memo((props:NodeProps)=>{
  return (
  <>
  <BaseTriggerNode
  {...props}
  Icon={MousePointerIcon}
  name="When clicking 'Execute Workflow' "
  // onSettings={handleOpenSettings}
  // onDoubleClick={handleOpenSettings}
  />
  
  </>
)
})