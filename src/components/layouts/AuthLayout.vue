<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen dark:bg-gray-900 bg-gray-50">
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="card border-gray-600 border p-8 rounded-2xl bg-gray-800">
          <!-- Content Card -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
