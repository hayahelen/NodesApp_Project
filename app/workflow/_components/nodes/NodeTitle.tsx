import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

interface NodeTitleProps {
  initialTitle: string;
  onTitleChange: (newTitle: string) => void;
  isEditing: boolean; // Controlled from the parent component (NodeHeader)
  setIsEditing: (editing: boolean) => void; // Function to update edit state
}

const NodeTitle: React.FC<NodeTitleProps> = ({ initialTitle, onTitleChange, isEditing, setIsEditing }) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    if (newTitle.length < 0 || newTitle.length > 20) return;
    setTitle(newTitle);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTitleChange(title);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      onTitleChange(title);
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-full p-2">
      <div className="flex items-center gap-2 w-full">
        <span className="font-semibold text-sm text-muted-foreground">Node Title:</span>
        <Input
          type="text"
          value={title}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm font-semibold uppercase text-muted-foreground border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 px-2 py-1 rounded-md"
          readOnly={!isEditing}
          placeholder="Enter node title here" 
        />
      </div>
      
    </div>
  );
};

export default NodeTitle;
