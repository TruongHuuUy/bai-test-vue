<script setup lang="ts">
import { type CheckedTask } from '@/components/types/CheckedTaskInterface';
import { type Day } from '@/components/types/DayInterface';
import type { Task } from '../types/TaskInterface';

const styleBtnTasks = 'hidden w-7 h-7 rounded-full cursor-pointer ease-in text-base duration-300 hover:rounded-xl hover:bg-emerald-400'

export interface Props {
    isCheckedSortTask: CheckedTask;
    getDateLocal: string;
    dateOfMonth: Day[];
}

const emit = defineEmits<{
    changeClickOpenTask: [key: boolean, fullDate: string | number]
    changeGetDataTaskInDate: [key: Task[]]
}>()

const props = defineProps<Props>()

console.log(props.isCheckedSortTask);

const days: string[] = [
    'CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'
]

const filterTimeLimitTask = (listTasks: Task[]): Task[] => {
    return listTasks = listTasks.filter(item => {
        return item.endDay < props.getDateLocal && !item.status
    })
}

const filterDoNotTask = (listTasks: Task[]): Task[] => {
    return listTasks = listTasks.filter(item => {
        return item.status === false
    })
}

const filterDoneTask = (listTasks: Task[]): Task[] => {
    return listTasks = listTasks.filter(item => {
        return item.status === true
    })
}

const onclickTaskLimit = (task: Task[], fullDate: string | number) => {
    emit('changeClickOpenTask', true, fullDate);
    emit('changeGetDataTaskInDate', filterTimeLimitTask(task));
}

const onclickTaskDoNot = (task: Task[], fullDate: string | number) => {
    emit('changeClickOpenTask', true, fullDate);
    emit('changeGetDataTaskInDate', filterDoNotTask(task));
}

const onclickTaskDone = (task: Task[], fullDate: string | number) => {
    emit('changeClickOpenTask', true, fullDate);
    emit('changeGetDataTaskInDate', filterDoneTask(task));
}

</script>

<template>
    <div class="flex content-between mb-3">
        <div class="w-24 font-bold" v-for="item in days">{{ item }}</div>
    </div>
    <section class="flex flex-wrap content-between mb-4">
        <div class="non-active relative w-24 h-24 border-[1px] border-solid ease-in duration-300 z-10 hover:border-red-400 hover:bg-orange-100"
            v-for="(item, index) in dateOfMonth" :class="{ 'font-bold border-orange-200': item.status }">
            {{ item.date }}
            <div
                :class="{ 'active absolute w-full h-full top-0 pt-5 border-[2px] border-orange-400 z-0': item.fullDate === props.getDateLocal }">
                <div class="flex justify-around items-center h-[70px] text-white font-bold">
                    <button @click="onclickTaskLimit(item.task, item.fullDate)"
                        :class="[{ 'show-task-in-date bg-red-400': item.checkTaskLimit && item.checkTaskDoNot && item.status && props.isCheckedSortTask.isCheckSortTaskLimit }, styleBtnTasks]">
                        <span>{{ item.countTaskLimit }}</span>
                    </button>
                    <button @click="onclickTaskDoNot(item.task, item.fullDate)"
                        :class="[{ 'show-task-in-date bg-sky-400': item.checkTaskDoNot && !item.checkTaskLimit && item.status && props.isCheckedSortTask.isCheckSortTaskDoNot }, styleBtnTasks]">
                        <span>{{ item.countTaskDoNot }}</span>
                    </button>
                    <button @click="onclickTaskDone(item.task, item.fullDate)"
                        :class="[{ 'show-task-in-date bg-lime-500': item.checkTaskDone && item.status && props.isCheckedSortTask.isCheckSortTaskDone }, styleBtnTasks]">
                        <span>{{ item.countTaskDone }}</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.show-task-in-date {
    display: block;
}

.active,
.non-active:hover {
    box-shadow: 2px 2px 8px #fcbe6c;
}
</style>