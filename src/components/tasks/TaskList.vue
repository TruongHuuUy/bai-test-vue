<script setup lang="ts">
import { type Task } from "@/components/types/TaskInterface";

const errorMessageEndDay: string = '* Task đã quá hạn, không thể click hoàn thành Task';

export interface Props {
    getDateTimeLocal: string;
    listTasks?: Task[];
}

const props = withDefaults(defineProps<Props>(), {
    getDateTimeLocal: '',
})

const isChecked = (item: Task, index: number) => {
    emitEvent(item)
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
                    <span :class="[{ 'line-through': item.status }]">
                        {{ item.nameTask }}
                    </span>
                </h3>
                <p><span>Người tạo: </span>{{ item.fullName }}</p>
            </div>
            <input :disabled="item.endDay < props.getDateTimeLocal"
                :class="[item.endDay < props.getDateTimeLocal ? 'mouse-no-drop' : 'mouse-pointer']" type="checkbox"
                @click="isChecked(item, index)" :checked="item.status">
        </div>

        <div class="card-end-day">
            <p>Ngày kết thúc: <span>{{ item.endDay }}</span></p>
            <p v-if="item.endDay < props.getDateTimeLocal && !item.status" class="error-message-end-day">
                {{ errorMessageEndDay }}</p>
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
    transition: 0.5s;
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