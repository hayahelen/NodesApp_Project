export enum TaskType {
    USERNAME = "USERNAME",
    HABIT = "HABIT",
}

export enum TaskParamType {
    STRING= "STRING",
    DROP_DOWN = "DROP_DOWN",
}

export interface TaskParam {
    name: string;
    type: TaskParamType;
    helperText?: string;
    required?: boolean;
    hideHandle?:boolean;
    value?: string;
    [key: string]: any;

}