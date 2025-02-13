import { NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState, useRef, useEffect } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { NodeInput, NodesInputs } from "./NodeInputs";
import { NodeOutput, NodesOutputs } from "./NodeOutputs";
import { TaskParam, TaskParamType } from "@/types/task";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import NodeTitle from "./NodeTitle";

const NodeComponent = memo((props: NodeProps) => {
  const { updateNodeData } = useReactFlow();
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  const [inputs, setInputs] = useState<TaskParam[]>(task.inputs);
  const [isInEditTask, setIsInEditTask] = useState(false);
  const inputsRef = useRef(inputs); 

  const handleAddField = () => {
    if (inputs.some((input) => input.type === TaskParamType.STRING)) {
      if (inputs.length < 20) {
        const updatedInputs = [
          ...inputs,
          {
            name: `Username ${inputs.length + 1}`,
            type: TaskParamType.STRING,
            required: false,
            variant: "input",
          },
        ];
        setInputs(updatedInputs);
        inputsRef.current = updatedInputs;
      }
    }
  };

  const handleRemoveField = (index: number) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
    inputsRef.current = updatedInputs;
  };

  const handleEditClick = () => {
    setIsInEditTask(!isInEditTask);
  };

  useEffect(() => {
    if (inputsRef.current !== inputs) {
      updateNodeData(props.id, { ...nodeData, inputs });
      inputsRef.current = inputs; 
    }
  }, [inputs, props.id, nodeData, updateNodeData]);

  return (
    <div>
      <NodeCard nodeId={props.id} isSelected={!!props.selected}>
        <NodeHeader
          taskType={nodeData.type}
          nodeId={props.id}
          onEditClick={handleEditClick}
          setIsEditing={setIsInEditTask}
        />
        <NodeTitle
          initialTitle={nodeData.title || nodeData.type}
          isEditing={isInEditTask}
          setIsEditing={setIsInEditTask}
          onTitleChange={(newTitle) => {
            updateNodeData(props.id, { ...nodeData, title: newTitle });
          }}
        />
        
        <NodesInputs>
          {inputs.map((input, index) => (
            <div key={input.name} className="flex items-center gap-2">
              {isInEditTask ? (
                <NodeInput input={input} nodeId={props.id} isDisabled={false} />
              ) : (
                <span>
                </span>
              )}

              {isInEditTask && inputs.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveField(index)}
                  className="text-red-500 hover:bg-red-100"
                >
                  <TrashIcon size={16} />
                </Button>
              )}
            </div>
          ))}
        </NodesInputs>

        <NodesOutputs>
          {task.outputs.map((output: TaskParam) => (
            <NodeOutput key={output.name} output={output} />
          ))}
        </NodesOutputs>

        {isInEditTask && inputs.some((input) => input.type === TaskParamType.STRING) && inputs.length < 20 && (
          <Button
            onClick={handleAddField}
            variant="outline"
            size="sm"
            className="mt-2 w-full flex items-center justify-center"
          >
            <PlusIcon size={16} className="mr-2" /> Add Username Field
          </Button>
        )}
      </NodeCard>
    </div>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
