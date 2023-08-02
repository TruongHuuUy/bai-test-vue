<script setup lang="ts">
import { type Task } from "./types/TaskInterface";

import { reactive, ref } from 'vue';

const currentDate = new Date();
const checkNameTask = ref(false);
const checkEndDay = ref(false);
const checkFullName = ref(false);
const formaHourstUTC = currentDate.getUTCHours() + 7;

const dateFormated =
    currentDate.getUTCFullYear() + "-" +
    ("" + (currentDate.getUTCMonth() + 1)).slice(-2) + "-" +
    ("" + currentDate.getUTCDate()).slice(-2) + " " +
    ("0" + formaHourstUTC).slice(-2) + ":" +
    ("0" + currentDate.getUTCMinutes()).slice(-2) + ":" +
    ("0" + currentDate.getUTCSeconds()).slice(-2);


export interface Props {
    getDateLocal: string;
    listTasks: Task[];
    lostModalAddTask: () => void;
    showMessageSusscessCreateTask: () => void;
}

const props = defineProps<Props>()

interface ListTextError {
    nameTask: string[];
    endDay: string[];
    fullName: string[];
}

const tasks = reactive<Task>({
    id: 0,
    nameTask: '',
    startDay: '',
    endDay: '',
    fullName: '',
    status: false
})

const listTextError: ListTextError = {
    nameTask: ['* Mời bạn nhập Tên TASK!', ''],
    endDay: ['* Mời bạn chọn Ngày Kết Thúc!', ''],
    fullName: ['* Mời bạn nhập Tên người tạo TASK!', ''],
};

const checkBigIdTask = (): number => {
    let count: number = 0;
    props.listTasks.forEach((element: Task) => {
        count = Math.max(element.id)
    });

    return count;
}

const resetItemInputTask = () => {
    tasks.nameTask = '';
    tasks.endDay = '';
    tasks.fullName = '';
}

const addNewTask = () => {
    if (!tasks.nameTask || !tasks.endDay || !tasks.fullName) {
        !tasks.nameTask ? checkNameTask.value = true : checkNameTask.value = false;
        !tasks.endDay ? checkEndDay.value = true : checkEndDay.value = false;
        !tasks.fullName ? checkFullName.value = true : checkFullName.value = false;
    } else {
        tasks.startDay = dateFormated;
        tasks.id = checkBigIdTask() + 1;
        props.listTasks.push(tasks);
        localStorage.setItem("Task", JSON.stringify(props.listTasks));
        resetItemInputTask();
        props.lostModalAddTask();
        props.showMessageSusscessCreateTask();
    }
}

</script>

<template>
    <div
        class="absolute text-center p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] bg-zinc-200 rounded-3xl mb-0">
        <div class="relative font-bold border-b-2 border-slate-400 pb-3 mb-6 pl-3.5">
            <h2 class="text-2xl">Thêm Task Mới</h2>
            <span
                class="absolute top-0 right-3 font-bold cursor-pointer text-xl hover:text-red-500 hover:text-2xl ease-in duration-200"
                @click="props.lostModalAddTask()">&times;</span>
        </div>

        <div class="content text-left flex mb-6 ml-2.5">
            <label class="mt-1 font-bold min-w-[120px]" for="nameTask">Tên Task:</label>
            <div class="relative w-full max-w-[230px] text-black">
                <input class="form-field" id="nameTask" type="text" placeholder="Tên Task" v-model="tasks.nameTask">
                <label for="name" class="form-label text-[18px]">Tên Task</label>
                <p class="text-red-500 text-sm" v-show="checkNameTask">{{ listTextError.nameTask[0] }}</p>
            </div>
        </div>

        <div class="content text-left flex mb-6 ml-2.5">
            <label class="mt-1 font-bold min-w-[120px]" for="fullName">Người tạo:</label>
            <div class="relative w-full max-w-[230px] text-black">
                <input class="form-field" id="fullName" type="text" placeholder="Người Tạo" v-model="tasks.fullName">
                <label for="name" class="form-label">Người tạo</label>
                <p class="text-red-500 text-sm" v-show="checkFullName">{{ listTextError.fullName[0] }}</p>
            </div>
        </div>

        <div class="content text-left flex mb-6 ml-2.5">
            <label class="mt-1 font-bold min-w-[120px]" for="endDay">Ngày kết thúc:</label>
            <div class="relative w-full max-w-[230px] text-black">
                <input class="form-field" id="endDay" type="date" v-model="tasks.endDay" :min="props.getDateLocal">
                <p class="text-red-500 text-sm" v-show="checkEndDay">{{ listTextError.endDay[0] }}</p>
            </div>
        </div>

        <div>
            <button class="btn" @click="addNewTask()">Thêm Mới</button>
        </div>
    </div>
</template>

<style scoped>
.form-field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    background: transparent;
    transition: border-color 0.5s;
}

.form-field::placeholder {
    color: transparent;
}

.form-field:placeholder-shown~.form-label {
    font-size: 17px;
    cursor: text;
    top: 0px;
}

.form-label {
    position: absolute;
    top: -20px;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
    font-weight: 500;
}

.form-field:focus {
    padding-bottom: 6px;
    font-weight: 500;
    border-width: 3px;
    /* border-image: linear-gradient(to right, #116399, #38caef); */
    border-image: linear-gradient(to right, #b66b15, #efb538);
    border-image-slice: 1;
}

.form-field:focus~.form-label {
    position: absolute;
    top: -20px;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #e69244;
    font-weight: 700;
}

.form-field:required,
.form-field:invalid {
    box-shadow: none;
}
</style>