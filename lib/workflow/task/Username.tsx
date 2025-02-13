import { TaskParamType, TaskType } from "@/types/task";
import { GlobeIcon, LucideProps } from "lucide-react";

export const UsernameTask = {
    type: TaskType.USERNAME,
    label: "USERNAME",
    icon: (props:LucideProps) => (<GlobeIcon className="stroke-pink-400" {...props} />),

    isEntryPoint: false,
    inputs: [
        {
            name: "Username",
            type: TaskParamType.STRING,
            required: true,
            variant: "input",
        },
    ],
    outputs: [
        {
            name: "Username",
            type: TaskParamType.STRING
        },
        

    ]
}