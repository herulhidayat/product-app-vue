<script setup lang="ts">
import "mapbox-gl/dist/mapbox-gl.css";
import { type Ref } from "vue";

const props = defineProps<{
  mapContainer: Ref<HTMLElement | null>;
}>();

</script>

<template>
  <div :ref="props.mapContainer" class="map-container"></div>
</template>

<style>
.map-container {
  width: 100%;
  height: 100%;
}
</style>