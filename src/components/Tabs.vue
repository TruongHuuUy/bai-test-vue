<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { type Tab } from "./types/TabInterface";

const check = ref(0);

const listTabs = ref<Tab[]>([
    {
        id: 0,
        key: 'tabAll',
        name: 'Tất cả',
        count: 0,
        status: false,
    },
    {
        id: 1,
        key: 'tabDoNot',
        name: 'Chưa làm',
        count: 0,
        status: false,
    },
    {
        id: 2,
        key: 'tabDone',
        name: 'Đã làm',
        count: 0,
        status: false,
    },
    {
        id: 3,
        key: 'tabTimeLimit',
        name: 'Quá hạn',
        count: 0,
        status: false,
    }
])

onBeforeMount(() => {
    emitChangeListTabs();
})

const emitChangeListTabs = () => {
    emit('changeListTabs', listTabs.value);
}

const emit = defineEmits<{
    changeKeyTab: [key: string],
    changeListTabs: [listTabs: Tab[]]
}>()

const emitEvent = (key: string) => {
    emit('changeKeyTab', key);
};

const onClickTab = (item: Tab, index: number) => {
    check.value = item.id;
    emitEvent(item.key)
}
</script>

<template>
    <button class="tab-button" @click="onClickTab(item, index)" v-for="(item, index) in listTabs"
        :class="[{ 'active': item.id === check }]">{{ item.name }}
        <span>{{ item.count }}</span>
    </button>
</template>

<style scoped lang="scss">
$color: red;

.tab-button {
    color: #000;
    background-color: rgb(249, 249, 249);
}

.tab-button:hover {
    font-size: 16px;
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