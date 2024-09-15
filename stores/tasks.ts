import { defineStore } from "pinia";
import type { TaskI, TaskStatusT, TaskPriorityT } from "~/types/main";

export const useTasksStore = defineStore("tasksStore", {
  state: () => ({
    tasks: [] as TaskI[],
    people: [
      { id: 1, label: "Wade Cooper" },
      { id: 2, label: "Arlene Mccoy" },
      { id: 3, label: "Devon Webb" },
      { id: 4, label: "Tom Cook" },
      { id: 5, label: "Tanya Fox" },
      { id: 6, label: "Hellen Schmidt" },
      { id: 7, label: "Caroline Schultz" },
      { id: 8, label: "Mason Heaney" },
      { id: 9, label: "Claudie Smitham" },
      { id: 10, label: "Emil Schaefer" },
    ],
    cards: [
      {
        title: "todo",
        status: "todo",
      },
      {
        title: "in progress",
        status: "progress",
      },
      {
        title: "done",
        status: "done",
      },
    ],
  }),
  actions: {
    addNewTask(data: TaskI) {
      this.tasks.push(data);
      this.updateTasksLocalStorage();
    },
    deleteCurrentTask(id: string) {
      this.tasks = this.tasks.filter((i) => i.id !== id);
      this.updateTasksLocalStorage();
    },
    updateCurrentTask(data: TaskI) {
      const item = this.tasks.find((i) => i.id == data.id);
      Object.assign(item as TaskI, data);
      this.updateTasksLocalStorage();
    },
    initTasks(data: TaskI[]) {
      this.tasks = data;
    },
    updateTasksLocalStorage() {
      window.localStorage.setItem("__tasks", JSON.stringify(this.tasks));
    },
  },
});
