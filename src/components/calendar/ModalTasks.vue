<script setup lang="ts">

import type { Task } from '../types/TaskInterface';
import TaskList from "../TaskList.vue";

export interface Props {
    getFullDate: string | number;
    getDateLocal: string
    listTasks: Task[];
    listTaskGetDataInDate?: Task[];
    lostModalTask: () => void;
}

const props = defineProps<Props>()

const checkStatusTask = (item: Task) => {
    if (item.status === false) {
        item.status = true;
    } else {
        item.status = false;
    }

    for (const task of props.listTasks) {
        if (task.id === item.id) {
            task.status = item.status
        }
    }

    localStorage.setItem("Task", JSON.stringify(props.listTasks))
}

const eventChangeClickTask = (item: Task) => {
    checkStatusTask(item);
}

</script>

<template>
    <div
        class="absolute text-center p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-zinc-200 rounded-3xl">
        <div class="relative font-bold border-b-2 border-slate-400 pb-4 mb-8">
            <h2 class="text-2xl">CÁC TASK CỦA NGÀY</h2>
            <h3 class="text-orange-500">{{ props.getFullDate }}</h3>
            <span
                class="absolute top-2 right-5 cursor-pointer text-xl ease-in duration-200 hover:text-red-500 hover:text-2xl "
                @click="props.lostModalTask()">
                &times;
            </span>
        </div>

        <section class="item-scroll max-h-[70vh] overflow-y-scroll">
            <TaskList @changeClickTask="eventChangeClickTask" :getDateTimeLocal="getDateLocal"
                :listTasks="listTaskGetDataInDate">
            </TaskList>
        </section>
    </div>
</template>

<style scoped>
.item-scroll::-webkit-scrollbar {
    width: 0px;
}
</style>