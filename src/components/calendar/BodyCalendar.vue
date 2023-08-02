<script setup lang="ts">
import { type Day } from '@/components/types/DayInterface';
import type { Task } from '../types/TaskInterface';

const styleBtnTasks = 'w-6 h-6 rounded-full cursor-pointer ease-in text-sm duration-300 hover:rounded-xl hover:bg-emerald-300 hover:w-8 hover:h-8'

export interface Props {
    getDateLocal: string;
    dateOfMonth: Day[];
}

const emit = defineEmits<{
    changeClickOpenTask: [key: boolean]
    changeGetDataTaskInDate: [key: Task[]]
}>()

const props = defineProps<Props>()

const days: string[] = [
    'CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'
]

const onclickTaskDoNot = (task: Task[], index: number) => {
    emit('changeClickOpenTask', true);
    emit('changeGetDataTaskInDate', task);
}

const onclickTaskDone = (task: Task[], index: number) => {
    emit('changeClickOpenTask', true);
    emit('changeGetDataTaskInDate', task);
}

const onclickTaskLimit = (task: Task[], index: number) => {
    emit('changeClickOpenTask', true);
    emit('changeGetDataTaskInDate', task);
}
</script>

<template>
    <div class="flex content-between mb-3">
        <div class="w-24 font-bold" v-for="item in days">{{ item }}</div>
    </div>
    <section class="flex flex-wrap content-between mb-4">
        <div class="non-active relative w-24 h-24 border-[1px] border-solid ease-in duration-300 z-10 hover:border-red-400 dark:md:hover:bg-red-100"
            v-for="(item, index) in dateOfMonth" :class="{ 'font-bold border-orange-200': item.status === true }">
            {{ item.date }}
            <div
                :class="{ 'active absolute w-full h-full top-0  pt-5 border-[2px] border-orange-400 z-0': item.fullDate === props.getDateLocal }">
                <div class="flex justify-around items-center h-[70px]">
                    <button @click="onclickTaskDoNot(item.task, index)" v-if="item.checkTaskDoNot === true"
                        :class="[{ 'bg-yellow-300': item.checkTaskDoNot === true }, styleBtnTasks]">
                        <span>{{ item.countTaskDoNot }}</span>
                    </button>
                    <button @click="onclickTaskLimit(item.task, index)" v-if="item.checkTaskLimit === true"
                        :class="[{ 'bg-red-400': item.checkTaskLimit === true }, styleBtnTasks]">
                        <span>{{ item.countTaskLimit }}</span>
                    </button>
                    <button @click="onclickTaskDone(item.task, index)" v-if="item.checkTaskDone === true"
                        :class="[{ 'bg-sky-400': item.checkTaskDone === true }, styleBtnTasks]">
                        <span>{{ item.countTaskDone }}</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.active,
.non-active:hover {
    box-shadow: 2px 2px 10px #6e6cfc;
}
</style>