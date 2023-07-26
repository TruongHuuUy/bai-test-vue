<script setup lang="ts">
import { type Task } from "./types/TaskInterface";

const errorMessageEndDay: string = '* Task đã quá hạn, không thể click hoàn thành Task';

export interface Props {
    getDateLocal: string;
    listTasks?: Task[];
    // checkStatusTask: (task: Task) => void;
}

const props = withDefaults(defineProps<Props>(), {
    getDateLocal: '',
})

const isChecked = (item: Task, index: number): boolean => {
    emitEvent(item)
    return item.status
}

const emit = defineEmits<{
    changeClickTask: [key: Task]
}>()

const emitEvent = (item: Task) => {
    emit('changeClickTask', item);
};

</script>

<template>
    <div v-for="(item, index) in listTasks" class="card" :key="item.id">
        <div class="card-content">
            <div class="title-content">
                <h3 class="title-content">Tên Task:
                    <span :class="[{ 'line-through': item.status === true }]">
                        {{ item.nameTask }}
                    </span>
                </h3>
                <p><span>Người tạo: </span>{{ item.fullName }}</p>
            </div>
            <input :disabled="item.endDay < props.getDateLocal"
                :class="[item.endDay < props.getDateLocal ? 'mouse-no-drop' : 'mouse-pointer']" type="checkbox"
                @click="isChecked(item, index)" :checked="item.status === true">
        </div>

        <div class="card-end-day">
            <p>Ngày kết thúc: <span>{{ item.endDay }}</span></p>
            <p v-if="item.endDay < props.getDateLocal" class="error-message-end-day">{{ errorMessageEndDay }}</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    flex: 1 1 auto;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    margin-bottom: 20px;
}

.card .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid rgba(145, 142, 142, 0.2);
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.card-end-day {
    text-align: left;
}

.card-end-day>p {
    font-weight: bold;
}

.card>.card-content>.title-content {
    text-align: left;
}

input[type="checkbox"] {
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #ddd;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
}

input[type="checkbox"]:checked {
    background-color: blue;
}

.line-through {
    text-decoration: line-through;
}

.error-message-end-day {
    margin-top: 10px;
    font-size: 12px;
    color: red;
}

.mouse-pointer {
    cursor: pointer;
}

.mouse-no-drop {
    cursor: no-drop;
}
</style>