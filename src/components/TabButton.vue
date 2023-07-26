<script setup lang="ts">
import { ref } from 'vue';
import { type Tab } from "./types/TabInterface";

export interface Props {
    listTabs: Tab[];
    filterTask: (idName: string) => void;
}

const props = defineProps<Props>()

const check = ref(0);

const onClickTab = (item: Tab, index: number) => {
    check.value = item.id;
    props.filterTask(item.key);
}
</script>

<template>
    <button class="tab-button" @click="onClickTab(item, index)" v-for="(item, index) in listTabs"
        :class="[{ 'active': item.id === check }]">{{ item.name }}
        <span>{{ item.count }}</span>
    </button>
</template>

<style scoped>
.tab-button {
    color: #000;
    background-color: rgb(249, 249, 249);
}

.tab-button:hover {
    font-size: 15px;
    color: blue;
    background-color: rgb(213, 222, 243);
}

span {
    padding: 4px;
    font-size: small;
    border-radius: 30px;
    background: rgb(93, 93, 250);
    color: white;
    margin-left: 5px;
}

.tab-button.active {
    color: blue;
    background-color: rgb(213, 222, 243);
}
</style>