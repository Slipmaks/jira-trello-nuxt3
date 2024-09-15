<template>
  <div class="card-wrapper">
    <h3 class="text-slate-900 font-bold ml-3 mt-2">
      {{ props.title.toLocaleUpperCase() }}
    </h3>
    <draggable
      class="list-group"
      :list="props.data"
      group="tasks"
      item-key="id"
      @change="$emit('changeStatus', $event)"
    >
      <template #item="{ element, index }">
        <div class="list-group-item">
          <h4>{{ element.title }}</h4>
          <div class="flex gap-1">
            <UButton
              icon="i-mdi:file-document-edit-outline"
              size="sm"
              color="amber"
              @click="$emit('openDialog', element)"
            />
            <UButton
              icon="i-mdi:delete-outline"
              size="sm"
              color="red"
              @click="$emit('delete', element.id)"
            />
          </div>
        </div>
      </template>
    </draggable>
    <div>
      <button
        @click="$emit('addNew')"
        class="text-slate-900 flex items-center gap-2 px-3 py-2 hover:bg-slate-300 rounded-lg"
      >
        <UIcon name="i-mdi:card-plus-outline" />
        Add a card
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import type { TaskI } from "~/types/main";
const props = defineProps<{
  data: TaskI[];
  title: string;
}>();
</script>

<style>
.card-wrapper {
  @apply bg-slate-200 p-2 rounded-xl w-80 shadow-lg h-min;
}
.list-group-item {
  @apply px-3 py-2 my-3 bg-slate-100 text-slate-900 shadow-sm rounded-lg font-medium border-slate-300 border flex items-center justify-between;
}
</style>
