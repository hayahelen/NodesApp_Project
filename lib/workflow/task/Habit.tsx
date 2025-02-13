import { TaskParamType, TaskType } from "@/types/task";
import { GlobeIcon, LucideProps } from "lucide-react";

export const HabitTask = {
    type: TaskType.HABIT,
    label: "HABIT",
    icon: (props:LucideProps) => (<GlobeIcon className="stroke-pink-400" {...props} />),

    isEntryPoint: false,
    inputs: [
        {
            name: "Habit",
            type: TaskParamType.DROP_DOWN,
            required: true,
            
        },
    ],
    outputs: [
        {
            name: "Habit",
            type: TaskParamType.STRING,
            hideHandle: true,

        },
        

    ]
}