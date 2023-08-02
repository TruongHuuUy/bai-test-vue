import { type Task } from './TaskInterface';

export interface Day {
    date: string | number,
    month: string | number,
    year: number,
    fullDate: string,
    status: boolean,
    checkTaskDoNot: boolean,
    checkTaskDone: boolean,
    checkTaskLimit: boolean,
    countTaskDoNot: number,
    countTaskDone: number,
    countTaskLimit: number,
    task: Task[]
}