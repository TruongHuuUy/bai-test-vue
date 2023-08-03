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
const getFullDate = ref<string | number>('');

const showModalAddTask = ref<boolean>(false);
const showModalTask = ref<boolean>(false);
const checkTaskCreateSuccess = ref<boolean>(false);

const messsSuccessCreateTask: string = 'Bạn đã tạo TASK thành công';

onBeforeMount(() => {
    initDefaultData();
})

const initDefaultData = () => {
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

const updateDays = (currentDate: Date): Day[] => {
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getMonth();
    const fullYear = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getFullYear();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDateOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const datesInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    dateOfMonth.value = []
    let monthed = '';

    for (let i = firstDayOfMonth; i > 0; i--) {
        addDateToMonth(lastMonth, monthed, fullYear, lastDateOfLastMonth - i + 1, false);
    }

    for (let i = 1; i <= datesInMonth; i++) {
        addDateToMonth(lastMonth + 1, monthed, fullYear, i, true);
    }

    const countLastDate = 42 - dateOfMonth.value.length;

    for (let i = 1; i <= countLastDate; i++) {
        addDateToMonth(lastMonth + 2, monthed, fullYear, i, false);
    }

    addTaskInDate();

    return dateOfMonth.value
}

const addDateToMonth = (lastMonth: number, monthed: string, fullYear: number, date: number, statusActive: boolean): Day[] => {
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

    return dateOfMonth.value
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

const filterEndDateEqualFullDate = (listTasks: Task[], fullDate: string): Task[] => {
    return listTasks = listTasks.filter(item => {
        return item.endDay === fullDate
    })
}

const clickBtnArrowMonth = (check: boolean) => {
    check ? checkMonthYear(currentDate.getMonth() - 1, currentDate.getFullYear()) : checkMonthYear(currentDate.getMonth() + 1, currentDate.getFullYear());
}

const checkMonthYear = (month: number, year: number) => {
    currentDate.setMonth(month);
    currentDate.setFullYear(year);

    updateDays(currentDate);
}

const showMessageSusscessCreateTask = () => {
    initDefaultData();
    checkTaskCreateSuccess.value = true;
    setTimeout(() => {
        checkTaskCreateSuccess.value = false;
    }, 1000);
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
    checkMonthYear(month, year);
}

</script>

<template>
    <section class="hidden absolute w-full text-center mt-1 duration-500 font-bold z-10 bg-sky-200 h-[60px]"
        :class="[{ 'show-modal': checkTaskCreateSuccess }]">
        <h1 class="text-xl mt-3.5">{{ messsSuccessCreateTask }}</h1>
    </section>
    <section class="w-[80vh] h-[100vh] m-auto text-center p-8 bg-white rounded-3xl ">
        <header>
            <HeaderCalendar @changeSelectMonthYear="eventChangeSelectMonthYear" @changeClickArrowMonth="clickBtnArrowMonth"
                :openModalAddTask="openModalAddTask">
            </HeaderCalendar>
        </header>
        <main>
            <BodyCalendar @changeGetDataTaskInDate="eventGetDataTaskInDate" @changeClickOpenTask="eventChangeOpenTask"
                :dateOfMonth="dateOfMonth" :getDateLocal="getDateLocal">
            </BodyCalendar>
        </main>
        <footer>
            <FooterCalendar />
        </footer>
    </section>
    <section class="modal absolute hidden w-full h-full backdrop-blur-sm top-0 z-10"
        :class="[{ 'show-modal': showModalAddTask }]">
        <ModalAddTask :listTasks="listTasks" :lostModalAddTask="lostModalAddTask"
            :showMessageSusscessCreateTask="showMessageSusscessCreateTask" :getDateLocal="getDateLocal">
        </ModalAddTask>
    </section>

    <section class="modal absolute hidden w-full h-full backdrop-blur-sm top-0 z-10"
        :class="[{ 'show-modal': showModalTask }]">
        <ModalTasks :lostModalTask="lostModalTask" :getDateLocal="getDateLocal" :listTasks="listTasks"
            :getFullDate="getFullDate" :listTaskGetDataInDate="listTaskGetDataInDate">
        </ModalTasks>
    </section>
</template>

<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.5);
}

.show-modal {
    display: block;
}
</style>