"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import {memo, useState} from "react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { WorkflowNode } from "./workflow-node";
import { NodeSelector } from "./node-selector";

export const InitalNode = memo((props: NodeProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
    <WorkflowNode showToolbar={false} >
    <PlaceholderNode
    {...props}
    onClick={()=>setSelectorOpen(true)}
    >
      <div className="cursor-pointer flex items-center justify-center">
        <PlusIcon className="h-6 w-6 text-gray-400" />
      </div>
    </PlaceholderNode>
    </WorkflowNode>
    </NodeSelector>
  )
});