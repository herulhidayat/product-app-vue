<script setup lang="ts">
const { title, subtitle, classBody = 'p-6' } = defineProps<{
  title?: string;
  subtitle?: string;
  classBody?: string;
}>();
</script>

<template>
  <div class="border dark:border-gray-800 border-gray-200 bg-base-200 rounded-xl">
    <div class="px-6 py-2 border-b dark:border-gray-800 border-gray-200 flex flex-col gap-1">
      <h3 class="text-base font-bold">{{ title }}</h3>
      <p v-show="subtitle" class="text-xs text-gray-500 dark:text-gray-400">{{ subtitle }}</p>
    </div>

    <div :class=classBody>
      <slot />
    </div>
  </div>
</template>