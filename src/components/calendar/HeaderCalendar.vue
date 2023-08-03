<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import IconArrow from '@/components/icons/IconArrow.vue'

const currentDate = new Date();
const years: number[] = []
const currentMonth = ref<number>(currentDate.getMonth() + 1);
const currentYear = ref<number>(currentDate.getFullYear());

const styleSelect = 'text-center min-w-[80px] h-8 rounded-xl outline-none border-solid border-[1px] border-sky-300 duration-700';
const styleButton = 'text-sky-500 hover:text-red-600 duration-500'

export interface Props {
    openModalAddTask: () => void;
}

const props = defineProps<Props>()

const emit = defineEmits<{
    changeSelectMonthYear: [month: number, year: number],
    changeClickArrowMonth: [check: boolean]
}>()

watch([currentMonth, currentYear], ([month, year], [prevMonth, prevYear]) => {
    emit('changeSelectMonthYear', month - 1, year);
})

const monthNames: string[] = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
];

onBeforeMount(() => {
    totalYears(currentYear.value)
})

const totalYears = (currentYear: number): number[] => {
    for (let i = currentYear - 10; i < currentYear + 10; i++) {
        years.push(i);
    }
    return years;
};

const clickNextMonth = () => {
    currentMonth.value += 1;
    if (currentMonth.value > 12) {
        currentYear.value += 1;
        currentMonth.value = 1
    }
    emit('changeClickArrowMonth', true);
}

const clickPrevMonth = () => {
    currentMonth.value -= 1;
    if (currentMonth.value === 0) {
        currentYear.value -= 1;
        currentMonth.value = 12
    }
    emit('changeClickArrowMonth', false);
}

</script>

<template>
    <div class="relative font-bold border-b-2 border-slate-400 pb-4 mb-8">
        <h2 class="text-3xl">CALENDAR</h2>
        <!-- <h3 class="text-xl text-orange-500 m-2">{{ currentMonth }} - {{ currentYear }}</h3> -->
    </div>
    <div class="flex justify-between mb-3">
        <div class="flex items-center">
            <button :class="styleButton" class="mr-2" @click="clickPrevMonth()">
                <IconArrow />
            </button>
            <select v-model="currentMonth" :class="styleSelect" class="mr-2">
                <option v-for="(month, index) in monthNames" :value="index + 1">
                    {{ month }}
                </option>
            </select>
            <select v-model="currentYear" :class="styleSelect">
                <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                </option>
            </select>
            <button :class="styleButton" class="rotate-180 ml-2" @click="clickNextMonth()">
                <IconArrow />
            </button>
        </div>
        <button class="btn text-sky-500" @click="props.openModalAddTask()">+ Thêm Task</button>
    </div>
</template>

<style scoped>
select:hover {
    box-shadow: 2px 2px 10px #6e6cfc;
}
</style>