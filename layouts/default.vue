<template>
  <div class="p-4">
    <div class="bg-teal-500 flex gap-2 p-4 rounded-t-lg">
      <RouterLink
        v-for="link in links"
        :to="link.path"
        class="text-xl font-bold text-teal-700 transition hover:text-teal-800"
        active-class="text-teal-800"
      >
        {{ link.title }}
      </RouterLink>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { TaskI } from "~/types/main";

const tasksStore = useTasksStore(),
  { initTasks } = tasksStore;

onMounted(() => {
  if (window.localStorage.getItem("__tasks")) {
    initTasks(
      JSON.parse(window.localStorage.getItem("__tasks") as string) as TaskI[]
    );
  } else {
    let date = new Date(Date.now());
    initTasks([
      {
        id: "0",
        description: "description test",
        priority: "high",
        relatedTo: [],
        status: "todo",
        title: "Hello, edit me :)",
        created_date:
          date.toLocaleDateString() + "  " + date.toLocaleTimeString(),
      },
    ]);
  }
});
const links = [
  {
    title: "Tasks",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
];
</script>
