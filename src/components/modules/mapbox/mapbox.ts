import mapboxgl from "mapbox-gl";
import { onMounted, onUnmounted, ref } from "vue";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

export default function useMapbox() {
  const mapContainer = ref<HTMLElement | null>(null);
  const map = ref<mapboxgl.Map | null>(null);

  const initializeMap = (container: HTMLElement) => {
    const mapInit = new mapboxgl.Map({
      container: container,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [118.015776, -2.600029],
      zoom: 4.2,
      projection: 'mercator',
    });

    mapInit.on("load", () => {
      map.value = mapInit;
      mapInit.resize();
    });
  }

  onMounted(() => {
    if (mapContainer.value) {
      initializeMap(mapContainer.value);
    }
  })

  onUnmounted(() => {
    map.value?.remove();
    map.value = null;
  });

  return {
    mapContainer,
    map
  }
}
