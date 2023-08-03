<script setup lang="ts">
import HeaderCalendar from './components/calendar/HeaderCalendar.vue'
import BodyCalendar from './components/calendar/BodyCalendar.vue'
import FooterCalendar from './components/calendar/FooterCalendar.vue'
import ModalAddTask from './components/tasks/ModalAddTask.vue';
import ModalTasks from './components/calendar/ModalTasks.vue'

import { type Task } from "./components/types/TaskInterface";
import { type Day } from "./components/types/DayInterface";
import { onBeforeMount, ref } from 'vue';

const currentDate = new Date();
const getDateLocal: string = new Date().toLocaleDateString("en-CA");

const listTasks = ref<Task[]>([]);
const listTaskGetDataInDate = ref<Task[]>();

const dateOfMonth = ref<Day[]>([])
const currentMonthed = ref<string | Date>('');
const getFullDate = ref<string | number>('');

const showModalAddTask = ref<boolean>(false);
const showModalTask = ref<boolean>(false);
const checkTaskCreateSuccess = ref<boolean>(false);

const messsSuccessCreateTask: string = 'Bạn đã tạo TASK thành công';

onBeforeMount(() => {
    initDefaultData();
})

const initDefaultData = () => {
    currentMonthed.value = updateMonthed(currentDate);
    dateOfMonth.value = updateDays(currentDate);
    listTasks.value = getDataFromLocalStorage();
}

function getDataFromLocalStorage(): Task[] {
    const result = localStorage.getItem('Task') || '';
    if (result !== '') {
        return listTasks.value ? JSON.parse(result) : [];
    }
    return [];
}

const openModalAddTask = () => {
    showModalAddTask.value = true;
}

const lostModalAddTask = () => {
    showModalAddTask.value = false;
}

const openModalTask = () => {
    showModalTask.value = true;
}

const lostModalTask = () => {
    showModalTask.value = false;
    updateDays(currentDate);
}

const updateMonthed = (currentDate: Date) => {
    const currentMonthed = (currentDate.toLocaleDateString('en-GB'));
    return currentMonthed;
}

const updateDays = (currentDate: Date) => {
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getMonth();
    const fullYear = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getFullYear();

    dateOfMonth.value = []
    let monthed = '';

    getLastDateOfLastMonth(lastMonth, fullYear, monthed);

    getDateInMonth(lastMonth + 1, fullYear, monthed);

    getFirstDateOfNextMonth(lastMonth + 2, fullYear, monthed);

    addTaskInDate();

    return dateOfMonth.value
}

const getLastDateOfLastMonth = (lastMonth: number, fullYear: number, monthed: string) => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDateOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    for (let i = firstDayOfMonth; i > 0; i--) {
        addDateToDateOfMonth(lastMonth, monthed, fullYear, lastDateOfLastMonth - i + 1, false);
    }
}

const getDateInMonth = (lastMonth: number, fullYear: number, monthed: string) => {
    const datesInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= datesInMonth; i++) {
        addDateToDateOfMonth(lastMonth, monthed, fullYear, i, true);
    }
}

const getFirstDateOfNextMonth = (lastMonth: number, fullYear: number, monthed: string) => {
    const countLastDate = 42 - dateOfMonth.value.length;

    for (let i = 1; i <= countLastDate; i++) {
        addDateToDateOfMonth(lastMonth, monthed, fullYear, i, false);
    }
}

const addDateToDateOfMonth = (lastMonth: number, monthed: string, fullYear: number, date: number, statusActive: boolean) => {
    let dateString = '';
    (date > 0 && date < 10) ? dateString = `0${date}` : dateString = `${date}`;

    (lastMonth > 0 && lastMonth < 10) ? monthed = `0${lastMonth}` : monthed = `${lastMonth}`;

    if (lastMonth === 13) {
        fullYear += 1;
        monthed = '01'
    } else if (lastMonth === 0) {
        fullYear -= 1
        monthed = '12'
    }

    dateOfMonth.value.push({
        date: dateString,
        month: monthed,
        year: fullYear,
        fullDate: fullYear + '-' + monthed + '-' + dateString,
        status: statusActive,
        checkTaskDoNot: false,
        checkTaskDone: false,
        checkTaskLimit: false,
        countTaskDoNot: 0,
        countTaskDone: 0,
        countTaskLimit: 0,
        task: []
    })
}

const addTaskInDate = () => {
    let listTask = listTasks.value;
    listTask = getDataFromLocalStorage();

    dateOfMonth.value.forEach(date => {
        date.task = filterEndDateEqualFullDate(listTask ? listTask : [], date.fullDate)
        listTask?.forEach(task => {
            if (task.endDay === date.fullDate) {
                if (task.endDay < getDateLocal && !task.status) {
                    date.checkTaskLimit = true
                    date.countTaskLimit += 1
                }
                if (!task.status) {
                    date.checkTaskDoNot = true
                    date.countTaskDoNot += 1
                }
                if (task.status) {
                    date.checkTaskDone = true
                    date.countTaskDone += 1
                }
            }
        })
    })
}

const clickPrevMonth = (check: boolean) => {
    if (check) {
        checkMonthYear(currentDate.getMonth() - 1, currentDate.getFullYear());
    }
}

const clickNextMonth = (check: boolean) => {
    if (check) {
        checkMonthYear(currentDate.getMonth() + 1, currentDate.getFullYear());
    }
}

const selectMonth = (month: number, year: number) => {
    checkMonthYear(month, year);
}

const checkMonthYear = (month: number, year: number) => {
    currentDate.setMonth(month);
    currentDate.setFullYear(year);

    currentMonthed.value = updateMonthed(currentDate);

    updateDays(currentDate);
}

const showMessageSusscessCreateTask = () => {
    initDefaultData();
    checkTaskCreateSuccess.value = true;
    setTimeout(() => {
        checkTaskCreateSuccess.value = false;
    }, 1000);
}

const filterEndDateEqualFullDate = (listTasks: Task[], fullDate: string): Task[] => {
    return listTasks = listTasks.filter(item => {
        return item.endDay === fullDate
    })
}

const eventChangeOpenTask = (data: boolean, fullDate: string | number) => {
    if (data) {
        openModalTask();
        getFullDate.value = fullDate;
    }
}

const eventGetDataTaskInDate = (data: Task[]) => {
    if (data) {
        listTaskGetDataInDate.value = data
    }
}

const eventChangeSelectMonthYear = (month: number, year: number) => {
    selectMonth(month - 1, year);
}

</script>

<template>
    <section class="hidden duration-500" :class="[{ 'message-create-success': checkTaskCreateSuccess }]">
        <h1>{{ messsSuccessCreateTask }}</h1>
    </section>
    <section class="w-[80vh] h-[100vh] m-auto text-center p-8 bg-white rounded-3xl ">
        <header>
            <HeaderCalendar @changeSelectMonthYear="eventChangeSelectMonthYear" @changeClickPrevMonth="clickPrevMonth"
                @changeClickNextMonth="clickNextMonth" :openModalAddTask="openModalAddTask">
            </HeaderCalendar>
        </header>
        <main>
            <BodyCalendar @changeGetDataTaskInDate="eventGetDataTaskInDate" @changeClickOpenTask="eventChangeOpenTask"
                :dateOfMonth="dateOfMonth" :getDateLocal="getDateLocal">
            </BodyCalendar>
        </main>
        <footer>
            <FooterCalendar></FooterCalendar>
        </footer>
    </section>
    <section class="modal absolute hidden w-full h-full backdrop-blur-sm top-0 z-10"
        :class="[{ 'show-modal-add-task': showModalAddTask }]">
        <ModalAddTask :listTasks="listTasks" :lostModalAddTask="lostModalAddTask"
            :showMessageSusscessCreateTask="showMessageSusscessCreateTask" :getDateLocal="getDateLocal">
        </ModalAddTask>
    </section>

    <section class="modal absolute hidden w-full h-full backdrop-blur-sm top-0 z-10"
        :class="[{ 'show-modal-task': showModalTask }]">
        <ModalTasks :lostModalTask="lostModalTask" :getDateLocal="getDateLocal" :listTasks="listTasks"
            :getFullDate="getFullDate" :listTaskGetDataInDate="listTaskGetDataInDate">
        </ModalTasks>
    </section>
</template>

<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.5);
}

.show-modal-add-task {
    display: block;
}

.show-modal-task {
    display: block;
}

.message-create-success {
    display: block;
    text-align: center;
    position: absolute;
    width: 100%;
    height: 50px;
    background-color: rgb(213, 222, 243);
    opacity: 0.9;
}
</style>