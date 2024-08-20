export interface UnitTask{
    id: number;
    name: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
}

export enum TaskStatus
{
    Default = -1, Active = 0, Completed = 1
}