export interface Task {
    id: number,
    nameTask: string,
    startDay: string,
    dateTaskDone?: string,
    endDay: string,
    fullName: string,
    status: boolean
}