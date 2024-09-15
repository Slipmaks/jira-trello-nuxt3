<template>
  <div class="bg-teal-400 rounded-b-lg">
    <div class="flex justify-around py-4 flex-wrap gap-y-10">
      <div v-for="card in cards" :key="card.status">
        <draggableItem
          :data="tasks.filter((i) => i.status == card.status)"
          :title="card.title"
          @changeStatus="
            changeStatusHandler($event, card.status as TaskStatusT)
          "
          @openDialog="openDialogHandler"
          @addNew="createNewTaskHandler(card.status as TaskStatusT)"
          @delete="deleteCurrentTask"
        />
      </div>
    </div>
  </div>
  <Modal
    :data="modalData"
    :isOpen="isOpen"
    @modalClose="isOpen = false"
    @save="saveChanges"
  />
</template>
<script setup lang="ts">
import draggableItem from "~/components/draggable-item.vue";
import Modal from "~/components/crud-modal.vue";
import type { TaskI, TaskStatusT } from "~/types/main";

const modalData = ref<TaskI>(),
  isOpen = ref(false),
  tasksStore = useTasksStore(),
  {
    addNewTask,
    updateCurrentTask,
    deleteCurrentTask,
    updateTasksLocalStorage,
  } = tasksStore,
  { tasks, cards } = storeToRefs(tasksStore);

const changeStatusHandler = (e: any, status: TaskStatusT) => {
    if (e.added) {
      e.added.element.status = status;
      updateTasksLocalStorage();
    }
  },
  openDialogHandler = (data: TaskI) => {
    modalData.value = data;
    isOpen.value = true;
  },
  createNewTaskHandler = (status: TaskStatusT) => {
    let date = new Date(Date.now());
    modalData.value = {
      description: "Change description",
      id: window.crypto.randomUUID(),
      priority: "low",
      relatedTo: [],
      status: status,
      title: "Change title",
      created_date:
        date.toLocaleDateString() + "  " + date.toLocaleTimeString(),
    };
    addNewTask(modalData.value);
    isOpen.value = true;
  },
  saveChanges = (data: TaskI) => {
    updateCurrentTask(data);
    isOpen.value = false;
  };
</script>
