import mapboxgl from "mapbox-gl";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { isDark } from "../../../helper/theme.helper";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

export default function useMapbox() {
  const mapContainer = ref<HTMLElement | null>(null);
  const map = ref<mapboxgl.Map | null>(null);
  console.log("isDark mapbox", isDark.value);

  const initializeMap = (container: HTMLElement) => {
    const mapInit = new mapboxgl.Map({
      container: container,
      style: isDark.value ? "mapbox://styles/serpapi/clnyclf2f00a001pfhdryfza4": "mapbox://styles/serpapi/clntuc6bn00lf01pgggsihwwg",
      center: [118.015776, -2.600029],
      zoom: 4.2,
      projection: 'mercator',
    });

    mapInit.on("load", () => {
      map.value = mapInit;
      mapInit.resize();
    });
  }

  watch(isDark, (newVal) => {
    if (map.value) {
      const newStyle = newVal ? "mapbox://styles/serpapi/clnyclf2f00a001pfhdryfza4" : "mapbox://styles/serpapi/clntuc6bn00lf01pgggsihwwg";
      map.value.setStyle(newStyle);
    }
  })

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
