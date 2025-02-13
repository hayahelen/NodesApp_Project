import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { EditIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import React from "react";

interface NodeHeaderProps {
  taskType: string;
  nodeId: string;
  onEditClick: (nodeId: string) => void;
  setIsEditing: (editing: boolean) => void; 
}

function NodeHeader({ taskType, nodeId, onEditClick, setIsEditing }: NodeHeaderProps) {
    const { deleteElements, getNode, setCenter } = useReactFlow();
  
    return (
      <div className="flex items-center justify-between p-2">
        <p className="text-xs font-bold uppercase text-muted-foreground flex-1">{taskType}</p>
  
        <div className="flex gap-1 items-center">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              deleteElements({ nodes: [{ id: nodeId }] });
            }}
          >
            <TrashIcon size={12} />
          </Button>
          <Button 
            variant={"ghost"} 
            size={"icon"} 
            onClick={() => {
              const node = getNode(nodeId);
              if (!node) return;
              const { position, measured } = node;
              if (!position || !measured) return;
              const { width, height } = measured;
              const x = position.x + width! / 2;
              const y = position.y + height! / 2;
              if (x === undefined || y === undefined) return;
              setCenter(x, y, {
                zoom: 1,
                duration: 500,
              });
  
              onEditClick(nodeId);
              setIsEditing(true); 
            }}
          >
            <EditIcon size={12} />
          </Button>
          <Button variant={"ghost"} size={"icon"} className="drag-handle cursor-grab">
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    );
  }
  
export default NodeHeader;
