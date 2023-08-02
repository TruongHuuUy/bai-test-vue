<script setup lang="ts">
const styleBtnTasks = 'w-6 h-6 rounded-full cursor-pointer ease-in text-base duration-300 hover:rounded-xl hover:bg-emerald-400'

</script>

<template>
    <div class="text-left">
        <h2 class="text-red-500 font-bold">Chú thích:</h2>
        <div class="ml-5">
            <div class="flex items-center mb-2">
                <p class="mr-2">-</p>
                <button :class="[styleBtnTasks, 'bg-red-400 mr-2']"></button>
                <p>: Task đã quá hạn</p>
            </div>
            <div class="flex items-center mb-2">
                <p class="mr-2">-</p>
                <button :class="[styleBtnTasks, 'bg-yellow-500 mr-2']"></button>
                <p>: Task chưa hoàn thành</p>
            </div>
            <div class="flex items-center">
                <p class="mr-2">-</p>
                <button :class="[styleBtnTasks, 'bg-sky-400 mr-2']"></button>
                <p>: Task đã hoàn thành</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>