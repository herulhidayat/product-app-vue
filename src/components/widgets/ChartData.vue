<script setup lang="ts">
import { get } from 'lodash';
import { useApiRequest } from '../../services/main.services';
import { flatModel, flatModelDate, flatModelDateMoment, flatModelTimeMoment, flatModelYearMoment, stackedModelDateMoment, stackedNestedModel, stackedSingleModel } from '../modules/echarts/parser/data.parser';
import { getChartOptionsAreaSeries, getChartOptionsLineChartData } from '../modules/echarts/parser/line.parser';
import { computed, toRaw, watch } from 'vue';
import Echarts from '../modules/echarts/Echarts.vue';
import { getChartOptionsPieData } from '../modules/echarts/parser/pie.parser';

interface IChartData {
  name?: string;
  url: string | '';
  parserChart: 'line.default' | 'line.area' | 'pie.default';
  parserData: 'flat.default' | 'flat.date-alternate' | 'flat.date' | 'flat.time' | 'flat.year' | 'stack.default' | 'stack.nested' | 'stack.date';
  params?: any;
  interval?: 'hour' | 'day' | 'month' | 'year';
  options?: {
    name?: any;
    legend?: any;
    tooltip?: any;
    xAxis?: any;
    yAxis?: any;
    valueAxis?: any;
    categoryAxis?: any;
    grid?: any;
    label?: any;
  };
  method?: 'GET' | 'POST'
}

const parserChart:any = {
  line: {
    default: getChartOptionsLineChartData,
    area: getChartOptionsAreaSeries
  },
  pie: {
    default: getChartOptionsPieData
  }
}

const parserData:any = {
  flat: {
    default: flatModel, //cocok untu line, bar, dll, dengan kedalaman data 1 level
    'date-alternate': flatModelDate, //cocok untuk line, bar, dll, dengan format tanggal alternatif
    date: flatModelDateMoment, //cocok untuk line, bar, dll, dengan format tanggal momentjs
    time: flatModelTimeMoment, //cocok untuk line, bar, dll, dengan format tanggal dan waktu momentjs
    year: flatModelYearMoment //cocok untuk line, bar, dll, dengan format year momentjs
  },
  stack: {
    default: stackedSingleModel, //cocok untuk line, bar, dll dengan kedalaman data 2 level
    nested: stackedNestedModel, //cocok untuk line, bar, dll dengan kedalaman data lebih dari 3 level
    date: stackedModelDateMoment //cocok untuk line, bar, dll dengan format tanggal momentjs dan kedalaman data 2 level
  }
}

const props = withDefaults(defineProps<IChartData>(), {
  parser: 'line.default',
  params: {},
  method: 'GET',
  interval: 'day'
});

const { getRequest, postRequest } = useApiRequest();

const request = props.method === 'GET' ? getRequest(props.url) : postRequest(props.url, props.params);
const dataTransform = computed(() => {
  if (!request.data.value) return null
  return get(parserData, props.parserData)({
    data: request.data.value,
    interval: props.interval
  })
})

const chartOptions = computed(() => {
  if (!dataTransform.value) return {}
  return get(parserChart, props.parserChart)({
    series: toRaw(dataTransform.value),
    customOptions: props.options
  });
})


watch(
  () => props.url,
  (url) => {
    if (url) request.execute()
  },
  { immediate: true }
)

// watch(request.isLoading, () => {
//   console.log('ChartData isLoading prop:', request.isLoading.value);
// });
</script>

<template>
  <Echarts 
    :options="chartOptions" 
    :isLoading="request.isLoading" 
    :isNoData="request.error" 
  />
</template>