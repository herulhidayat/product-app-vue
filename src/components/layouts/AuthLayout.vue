<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen dark:bg-gray-950 bg-gray-50">
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="card border-gray-200 border p-8 rounded-2xl bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <!-- Content Card -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
