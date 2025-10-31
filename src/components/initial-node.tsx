"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import {memo} from "react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { WorkflowNode } from "./workflow-node";

export const InitalNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode showToolbar={false} >
    <PlaceholderNode
    {...props}
    
    >
      <div className="cursor-pointer flex items-center justify-center">
        <PlusIcon className="h-6 w-6 text-gray-400" />
      </div>
    </PlaceholderNode>
    </WorkflowNode>
  )
});