"use client";
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TaskType } from '@/types/task';
import { Button } from '@/components/ui/button';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { useReactFlow } from '@xyflow/react';
import { TrashIcon } from 'lucide-react';

export default function TaskMenu() {
  const [activeTask, setActiveTask] = React.useState<TaskType | null>(null);
  const [isInEditTask, setIsInEditTask] = React.useState(false);
  const [nodeId, setNodeId] = React.useState<string | null>(null); // Add this line

  const { deleteElements, getNode } = useReactFlow();

  const editTask = (taskType: TaskType, nodeId: string) => { 
    setActiveTask(taskType);
    setIsInEditTask(true); 
    setNodeId(nodeId); // Set the nodeId
    console.log("AAAAAAAA", nodeId)
  };

  return (
    <aside className='w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto'>
      <Accordion type="multiple" className='w-full' defaultValue={['extraction', 'edit']}>
        <AccordionItem value="extraction">
          <AccordionTrigger className='font-bold'>
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1'>
            <TaskMenuBtn taskType={TaskType.USERNAME}  />
            <TaskMenuBtn taskType={TaskType.HABIT}  />
          </AccordionContent>
        </AccordionItem>

 
      </Accordion>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
    
  const task = TaskRegistry[taskType];


  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className='flex justify-between items-center gap-2 border w-full'
      draggable
      onDragStart={event => onDragStart(event, taskType)}
    >
      <div className='flex gap-2'>
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
}

