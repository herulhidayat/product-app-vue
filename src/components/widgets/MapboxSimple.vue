<script setup lang="ts">
import { onMounted, watch } from 'vue';
import useMapbox from '../modules/mapbox/mapbox';
import MapboxView from '../modules/mapbox/MapboxView.vue';
import { useApiRequest } from '../../services/main.services';
import idGeojson from '../../assets/id-geo.json';
import { scalesRange } from '../../helper/scales-polygon.helper';

const mapbox = useMapbox();
const { getRequest, postRequest } = useApiRequest();

const props = withDefaults(defineProps<{
  id: string;
  url: string;
  params?: Record<string, any>;
  method?: 'GET' | 'POST',
  layerType: 'polygon' | 'line' | 'point';
}>(), {
  method: 'GET',
  layerType: 'point'
});

const request = props.method === 'GET' ? getRequest(props.url) : postRequest(props.url, props.params);

onMounted(() => {
  if(props.url) {
    request.execute()
  }
})

watch([request.data, mapbox.map], async () => {
  const map = mapbox.map.value
  if (map && request.data.value) {
    switch (props.layerType) {
      case 'polygon':
        const geojson: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: (idGeojson as any).features?.map((feature:any) => {
            return {
              type: "Feature",
              properties: {
                ...feature.properties,
                value: request.data?.value?.find((item:any) => item.province_code === feature.properties.province_code)?.value || 0
              },
              geometry: feature.geometry
          }}) || []
        }

        map.addSource(props.id, {
          type: 'geojson',
          data: geojson
        });
        map.addLayer({
          id: props.id,
          type: 'fill',
          source: props.id,
          layout: {},
          paint: {
            'fill-opacity': 1,
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'value'],
              ...scalesRange({
                indexColor: ['#D2E8F5', '#A9CCE0', '#80AFCB', '#5693B7', '#2D76A2', '#045A8D'],
                min: 0,
                max: Math.max(...request.data.value.map((item:any) => item.value))
              }).flat()
            ],
            'fill-outline-color': '#fff'
          }
        });
        break;
      case 'line':
        map.addSource(props.id, {
          type: 'geojson',
          data: request.data.value
        });
        map.addLayer({
          id: props.id,
          type: 'line',
          source: props.id,
          layout: {},
          paint: {
            'line-color': '#088',
            'line-width': 8
          }
        });
        break;
      case 'point':
        map.addSource(props.id, {
          type: 'geojson',
          data: request.data.value
        });
        map.addLayer({
          id: props.id,
          type: 'circle',
          source: props.id,
          paint: {
            'circle-radius': 6,
            'circle-color': '#B42222'
          }
        });
        break;
    }
  }
})
</script>
<template>
  <MapboxView :mapContainer="mapbox.mapContainer" />
</template>