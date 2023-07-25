<script setup lang="ts">
import { reactive, ref } from 'vue';

const checkNameTask = ref(false);
const checkEndDay = ref(false);
const checkFullName = ref(false);

export interface Props {
    listTasks: Task[];
    lostModal: () => void;
    showMessageSusscessCreateTask: () => void;
}

const props = defineProps<Props>()

// const emit = defineEmits<{
//     reset: [Task]
// }>()

// const emitEvent = () => {
//     emit('reset', tasks);
// };

interface Task {
    id: number,
    nameTask: string,
    endDay: string,
    fullName: string,
    status: boolean
}

interface ListTextError {
    nameTask: string[];
    endDay: string[];
    fullName: string[];
}

const tasks = reactive<Task>({
    id: 0,
    nameTask: '',
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
        !tasks.nameTask ? checkNameTask.value = true : checkNameTask.value = false
        !tasks.endDay ? checkEndDay.value = true : checkEndDay.value = false
        !tasks.fullName ? checkFullName.value = true : checkFullName.value = false
    } else {
        tasks.id = checkBigIdTask() + 1;
        props.listTasks.push(tasks);
        localStorage.setItem("Task", JSON.stringify(props.listTasks));
        resetItemInputTask();
        props.lostModal();
        props.showMessageSusscessCreateTask();
    }
}
</script>

<template>
    <div class="modal-content">
        <div class="title">
            <h2>Thêm Task Mới</h2>
            <span class="close" @click="lostModal()">&times;</span>
        </div>
        <div class="content">
            <label for="nameTask">Tên Task:</label>
            <input id="nameTask" type="text" placeholder="Tên Task" v-model="tasks.nameTask">
            <p v-show="checkNameTask">{{ listTextError.nameTask[0] }}</p>
        </div>
        <div class="content">
            <label for="endDay">Ngày kết thúc:</label>
            <input id="endDay" type="date" v-model="tasks.endDay">
            <p v-show="checkEndDay">{{ listTextError.endDay[0] }}</p>
        </div>
        <div class="content">
            <label for="fullName">Người tạo:</label>
            <input id="fullName" type="text" placeholder="Người Tạo" v-model="tasks.fullName">
            <p v-show="checkFullName">{{ listTextError.fullName[0] }}</p>
        </div>

        <div>
            <button @click="addNewTask()">Thêm Mới</button>
        </div>
    </div>
</template>

<style scoped>
label {
    font-weight: bold;
    display: inline-block;
    min-width: 110px;
    cursor: default
}

.modal-content {
    text-align: center;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    background-color: white;
    border-radius: 20px;
}

.modal-content .content {
    text-align: left;
}

.modal-content>div {
    margin-bottom: 10px;
}

.modal-content>div:last-child {
    margin-bottom: 0px;
}

.modal-content p {
    color: red;
    font-size: 12px;
}

.modal-content .title {
    position: relative;
}

.modal-content .close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-weight: bold;
    cursor: pointer;
}

.modal-content .close:hover {
    color: red;
    font-size: 17px;
}
</style>