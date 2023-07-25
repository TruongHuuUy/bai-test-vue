<script setup lang="ts">
import TaskList from './components/TaskList.vue';
import TabButton from './components/TabButton.vue';
import ModalAddTask from './components/ModalAddTask.vue';
import { onBeforeMount, onMounted, ref } from 'vue';

const listTasks = ref<Task[]>([]);
const listTasksFiltered = ref<Task[]>();
const showModal = ref<boolean>(false);
const checkTaskCreateSuccess = ref<boolean>(false);
const messsSuccessCreateTask: string = 'Bạn đã tạo TASK thành công';

const getDateLocal: string = new Date().toLocaleDateString("en-CA");

interface Tab {
  id: number,
  idName: string,
  name: string,
  count: number,
  status: string,
}

interface Task {
  id: number,
  nameTask: string,
  endDay: string,
  fullName: string,
  status: boolean
}

const listTabs = ref<Tab[]>([
  {
    id: 0,
    idName: 'tabAll',
    name: 'Tất cả',
    count: 0,
    status: '',
  },
  {
    id: 1,
    idName: 'tabDoNot',
    name: 'Chưa làm',
    count: 0,
    status: '',
  },
  {
    id: 2,
    idName: 'tabDone',
    name: 'Đã làm',
    count: 0,
    status: '',
  },
  {
    id: 3,
    idName: 'tabTimeLimit',
    name: 'Quá hạn',
    count: 0,
    status: '',
  }
])

onBeforeMount(() => {
  listTasks.value = getDataFromLocalStorage();
  listTasksFiltered.value = listTasks.value;
})

onMounted(() => {
  countToTalAllTabs();
})

function getDataFromLocalStorage(): Task[] {
  const result = localStorage.getItem('Task') || '';
  if (result !== '') {
    return listTasks.value ? JSON.parse(result) : [];
  }
  return [];
}

const openModal = () => {
  showModal.value = true;
}

const lostModal = () => {
  showModal.value = false;
}

const countToTalAllTabs = () => {
  listTabs.value[0].count = listTasks.value.length;
  listTabs.value[1].count = filterDoNotTask(listTasks.value).length;
  listTabs.value[2].count = filterDoneTask(listTasks.value).length;
  listTabs.value[3].count = filterTimeLimitTask(listTasks.value).length;
}

const countTotalDoNotAndDoneTab = () => {
  listTabs.value[1].count = filterDoNotTask(listTasks.value).length;
  listTabs.value[2].count = filterDoneTask(listTasks.value).length;
}

const countNumberTask = (list: Task[]): number => {
  return list.length;
}

const filterTask = (key: string) => {
  let result: Task[] = [];
  if (key === 'tabAll') {
    result = listTasks.value.filter(item => item != null)
  } else if (key === 'tabDoNot') {
    result = filterDoNotTask(listTasks.value);
  } else if (key === 'tabDone') {
    result = filterDoneTask(listTasks.value);
  } else if (key === 'tabTimeLimit') {
    result = filterTimeLimitTask(listTasks.value);
  }
  listTasksFiltered.value = result;
}

const filterDoNotTask = (listTasks: Task[]): Task[] => {
  return listTasks = listTasks.filter(item => {
    return item.status === false
  })
}

const filterDoneTask = (listTasks: Task[]): Task[] => {
  return listTasks = listTasks.filter(item => {
    return item.status === true
  })
}

const filterTimeLimitTask = (listTasks: Task[]): Task[] => {
  return listTasks = listTasks.filter(item => {
    return item.endDay < getDateLocal
  })
}

const checkStatusTask = (key: Task) => {
  if (getDateLocal < key.endDay && key.status === false) {
    key.status = true;
  } else {
    key.status = false;
  }
  localStorage.setItem("Task", JSON.stringify(listTasks.value))
  countTotalDoNotAndDoneTab();
}

const showMessageSusscessCreateTask = () => {
  listTasks.value = getDataFromLocalStorage();
  listTasksFiltered.value = listTasks.value;
  countToTalAllTabs();
  checkTaskCreateSuccess.value = true;
  setTimeout(() => {
    checkTaskCreateSuccess.value = false;
  }, 1000);
}

</script>

<template>
  <div class="message-create" :class="[checkTaskCreateSuccess ? 'message-create-success' : '']">
    <h1>{{ messsSuccessCreateTask }}</h1>
  </div>
  <main class="scrollbar">
    <section class="header">
      <h1 class="title">Danh Sách TASK</h1>
      <div>
        <div class="date-content">
          <div>
            <h2 class="title-content">Task Hôm Nay</h2>
            <p>Ngày: {{ getDateLocal }}</p>
          </div>
          <button id="openModal" @click="openModal()">+ Thêm Task</button>
        </div>
        <div class="tab">
          <TabButton :listTabs="listTabs" :filterTask="filterTask"></TabButton>
        </div>
      </div>
    </section>
    <section class="item">
      <TaskList :getDateLocal="getDateLocal" :listTasks="listTasksFiltered" :checkStatusTask="checkStatusTask"></TaskList>
    </section>
  </main>
  <section class="modal" :class="[showModal ? 'show-modal' : '']">
    <ModalAddTask :listTasks="listTasks" :lostModal="lostModal"
      :showMessageSusscessCreateTask="showMessageSusscessCreateTask">
    </ModalAddTask>
  </section>
</template>

<style scoped>
.message-create {
  display: none;
  transition: 1.5s;
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

.modal {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  top: 0;
  z-index: 10;
}

.show-modal {
  display: block;
}
</style>