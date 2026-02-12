<script setup lang="ts">
import Sidebar from '../sidebar/Sidebar.vue';


</script>

<template>
  <sidebar>
    <div class="min-h-screen bg-base-100 dark:text-white text-black">
      <div class="container mx-auto px-4 py-8">
        <slot />
      </div>
    </div>
  </sidebar>
</template>
