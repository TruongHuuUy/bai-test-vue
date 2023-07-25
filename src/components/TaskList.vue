<script setup lang="ts">
const errorMessageEndDay: string = '* Task đã quá hạn, không thể click hoàn thành Task';

export interface Props {
    getDateLocal: string;
    listTasks?: Task[];
    checkStatusTask: (task: Task) => void;
}

const props = withDefaults(defineProps<Props>(), {
    getDateLocal: '',
})

interface Task {
    id: number,
    nameTask: string,
    endDay: string,
    fullName: string,
    status: boolean
}

const isChecked = (item: Task, index: number): boolean => {
    props.checkStatusTask(item)
    return item.status
}

</script>

<template>
    <div v-for="(item, index) in listTasks" class="card" :key="item.id">
        <div class="card-content">
            <div class="title-content">
                <h3 class="title-content">Tên Task:
                    <span :class="item.status === true ? 'line-through' : ''">
                        {{ item.nameTask }}
                    </span>
                </h3>
                <p><span>Người tạo: </span>{{ item.fullName }}</p>
            </div>
            <input type="checkbox" @click="isChecked(item, index)" :checked="item.status === true">
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
    cursor: pointer;
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
</style>