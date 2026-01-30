<script setup lang="ts">
const { title, subtitle, classBody = 'p-6' } = defineProps<{
  title?: string;
  subtitle?: string;
  classBody?: string;
}>();
</script>

<template>
  <div class="border dark:border-gray-700 border-gray-300 dark:bg-gray-800 bg-gray-100 rounded-xl">
    <div class="px-6 py-2 border-b dark:border-gray-700 border-gray-300 flex flex-col gap-1">
      <h3 class="text-xl font-bold">{{ title }}</h3>
      <p v-show="subtitle" class="text-sm text-gray-500 dark:text-gray-400">{{ subtitle }}</p>
    </div>

    <div :class=classBody>
      <slot />
    </div>
  </div>
</template>