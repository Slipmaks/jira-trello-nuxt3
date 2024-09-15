<template>
  <UModal v-model="props.isOpen" :prevent-close="true" class="text-slate-900">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-slate-900',
        background: 'dark:bg-slate-200',
        rounded: 'rounded-xl',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div class="w-full flex">
            <h2 class="text-xl font-semibold">Title:</h2>
            <UInput
              class="w-full"
              variant="none"
              :autofocus="false"
              v-model="dataTmp.title"
              placeholder="Enter title"
            >
            </UInput>
          </div>
          <div class="flex">
            <UTooltip text="close">
              <UButton
                color="white"
                variant="link"
                icon="i-mdi:close"
                class="-my-1"
                @click="$emit('modalClose')"
              />
            </UTooltip>
          </div>
        </div>
      </template>
      <div class="flex">
        <div class="w-4/5 flex flex-col items-center">
          <h2 class="text-base font-semibold">Description:</h2>
          <UTextarea
            placeholder="Enter description"
            v-model="dataTmp.description"
            class="w-full"
            autoresize
            variant="none"
            :autofocus="false"
            :maxrows="10"
          />
        </div>
        <div class="w-1/5">
          <div class="mb-2 flex flex-col">
            <p class="text-sm">Assigned to:</p>

            <UAvatarGroup size="sm" :max="2">
              <UAvatar
                v-for="userAvatar in dataTmp.relatedTo"
                :alt="userAvatar.label"
              />
            </UAvatarGroup>
            <USelectMenu
              v-model="dataTmp.relatedTo"
              :options="people"
              by="id"
              multiple
              color="white"
              class="mt-1"
              placeholder="Select people"
              :ui-menu="{ background: 'bg-white dark:bg-slate-700' }"
              :ui="{
                variant: {
                  outline: `dark:focus:ring-slate-400`,
                },
                color: {
                  white: {
                    outline: `dark:focus:ring-${colorFinder(
                      dataTmp.priority
                    )}-400`,
                  },
                },
              }"
            />
          </div>
          <div class="mb-2 w-full">
            <p class="text-sm">Priority:</p>
            <USelectMenu
              :options="priority"
              v-model="dataTmp.priority"
              color="white"
              :ui="{
                variant: {
                  outline: `dark:focus:ring-slate-400`,
                },
                color: {
                  white: {
                    outline: `dark:focus:ring-${colorFinder(
                      dataTmp.priority
                    )}-400`,
                  },
                },
              }"
            >
              <template #option="{ option: prior }">
                <span>{{ prior }}</span>
                <span
                  class="h-2 w-2 rounded-full"
                  :class="`bg-${colorFinder(prior)}-400 dark:bg-${colorFinder(
                    prior
                  )}-400`"
                />
              </template>
            </USelectMenu>
            <!-- <select
              v-model="dataTmp.priority"
              class="outline-none p-1 rounded-md font-normal w-full"
              :class="`bg-${colorFinder(dataTmp.priority as TaskPriorityT)}-400`"
            >
              <option
                v-for="option in priority"
                class="outline-none border-none custom-option"
                :class="`bg-${colorFinder(option as TaskPriorityT)}-400`"
              >
                {{ option }}
              </option>
            </select> -->
          </div>

          <p class="text-slate-500 text-xs">
            Creation date: {{ dataTmp.created_date }}
          </p>
        </div>
      </div>

      <template #footer>
        <UButton variant="solid" color="yellow" @click="$emit('save', dataTmp)">
          <UIcon name="i-mdi:check" />Save
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TaskI, TaskPriorityT } from "~/types/main";

const props = defineProps<{
  isOpen: boolean;
  data?: TaskI;
}>();

const priority = ["high", "medium", "low"],
  tasksStore = useTasksStore(),
  { people } = storeToRefs(tasksStore),
  dataTmp = ref<TaskI>({
    description: "",
    id: "",
    priority: "medium",
    relatedTo: [],
    status: "todo",
    title: "",
    created_date: "",
  });

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      //@ts-ignore
      dataTmp.value = { ...props.data };
    }
  }
);

const badgeColor = computed(() => {
    const priorityTmp = dataTmp.value?.priority;
    return priorityTmp == "high"
      ? "red"
      : priorityTmp == "medium"
      ? "amber"
      : "green";
  }),
  colorFinder = (prior: TaskPriorityT) => {
    return prior == "high" ? "red" : prior == "medium" ? "amber" : "green";
  };
</script>
