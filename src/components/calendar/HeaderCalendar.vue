<script setup lang="ts">
import { type CheckedTask } from '@/components/types/CheckedTaskInterface';
import { onBeforeMount, ref, watch } from 'vue';
import IconArrow from '@/components/icons/IconArrow.vue'
import IconReloadSort from '../icons/IconReloadSort.vue';

const currentDate = new Date();
const years: number[] = []
const currentMonthed = ref<number>(currentDate.getMonth() + 1);
const currentYeared = ref<number>(currentDate.getFullYear());
const currentMonth = currentMonthed.value;
const currentYear = currentYeared.value;
const props = defineProps<Props>()
const isCheckTask: CheckedTask = props.isCheckedSortTask;

const styleSelect = 'text-center min-w-[80px] h-8 rounded-xl outline-none border-solid border-[1px] border-sky-300 duration-700';
const styleButton = 'text-sky-500 hover:text-red-600 duration-500'

export interface Props {
    isCheckedSortTask: CheckedTask;
    openModalAddTask: () => void;
}

const emit = defineEmits<{
    changeSelectMonthYear: [month: number, year: number],
    changeClickArrowMonth: [check: boolean],
}>()

const monthNames: string[] = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
];

interface SortTask {
    id: number,
    key: string,
    class: string,
}

const btnSortsTask = ref<SortTask[]>([
    {
        id: 1,
        key: 'sortLimit',
        class: 'w-6 h-6 rounded-full ease-in text-base duration-300 hover:rounded-xl hover:bg-emerald-400 mt-1 bg-red-400 mr-2',
    },
    {
        id: 2,
        key: 'sortDoNot',
        class: 'w-6 h-6 rounded-full ease-in text-base duration-300 hover:rounded-xl hover:bg-emerald-400 mt-1 bg-sky-400 mr-2',
    },
    {
        id: 3,
        key: 'sortDone',
        class: 'w-6 h-6 rounded-full ease-in text-base duration-300 hover:rounded-xl hover:bg-emerald-400 mt-1 bg-lime-500 mr-2',
    },
])

onBeforeMount(() => {
    totalYears(currentYeared.value)
})

watch([currentMonthed, currentYeared], ([month, year], [prevMonth, prevYear]) => {
    emit('changeSelectMonthYear', month - 1, year);
})

const totalYears = (currentYeared: number): number[] => {
    for (let i = currentYeared - 10; i < currentYeared + 10; i++) {
        years.push(i);
    }
    return years;
};

const loadDataDefault = (month: number, year: number) => {
    emit('changeSelectMonthYear', month - 1, year);
    currentMonthed.value = currentMonth
    currentYeared.value = currentYear
}

const clickNextMonth = () => {
    currentMonthed.value += 1;
    if (currentMonthed.value > 12) {
        currentYeared.value += 1;
        currentMonthed.value = 1
    }
    emit('changeClickArrowMonth', true);
}

const clickPrevMonth = () => {
    currentMonthed.value -= 1;
    if (currentMonthed.value === 0) {
        currentYeared.value -= 1;
        currentMonthed.value = 12
    }
    emit('changeClickArrowMonth', false);
}

const clickSortDefault = () => {
    isCheckTask.isCheckSortTaskLimit = true
    isCheckTask.isCheckSortTaskDone = true
    isCheckTask.isCheckSortTaskDoNot = true
}

const clickButtonSort = (key: string) => {
    isCheckTask.isCheckSortTaskLimit = false
    isCheckTask.isCheckSortTaskDone = false
    isCheckTask.isCheckSortTaskDoNot = false

    if (key === 'sortLimit') {
        isCheckTask.isCheckSortTaskLimit = true
    } else if (key === 'sortDoNot') {
        isCheckTask.isCheckSortTaskDoNot = true
    } else {
        isCheckTask.isCheckSortTaskDone = true
    }
}

</script>

<template>
    <div class="relative font-bold border-b-2 border-slate-400 pb-3 mb-6">
        <button class="text-3xl" @click="loadDataDefault(currentMonth, currentYear)">CALENDAR</button>
    </div>
    <div class="flex justify-between mb-3">
        <div class="flex items-center">
            <button :class="styleButton" class="mr-2" @click="clickPrevMonth()">
                <IconArrow />
            </button>
            <select v-model="currentMonthed" :class="styleSelect" class="mr-2">
                <option v-for="(month, index) in monthNames" :value="index + 1">
                    {{ month }}
                </option>
            </select>
            <select v-model="currentYeared" :class="styleSelect">
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
            <button :class="styleButton" class="rotate-180 ml-2" @click="clickNextMonth()">
                <IconArrow />
            </button>
        </div>
        <div class="mt-2 flex cursor-pointer">
            <IconReloadSort class="mr-2" @click="clickSortDefault()"></IconReloadSort>
            <button v-for="btnSort in btnSortsTask" :class="[btnSort.class]" @click="clickButtonSort(btnSort.key)"></button>
        </div>
        <button class="btn text-sky-500" @click="props.openModalAddTask()">+ Thêm Task</button>
    </div>
</template>

<style scoped>
select:hover {
    box-shadow: 2px 2px 10px #6e6cfc;
}
</style>