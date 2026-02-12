<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, watch, onMounted, onUnmounted, nextTick, type Ref, shallowRef } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { DARK_THEME, LIGHT_THEME } from './config/echarts-theme.config'
import { isDark } from '../../../helper/theme.helper'

interface Props {
  options?: Ref<any>
  isLoading?: Ref<boolean>
  isError?: Ref<any>
}

const props = defineProps<Props>()

const chartRef = ref<HTMLDivElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)
const chartOptions = ref<any>(null)

function initChart() {
  if (!chartRef.value || chartInstance.value) return

  echarts.registerTheme('light', LIGHT_THEME)
  echarts.registerTheme('dark', DARK_THEME)

  const theme = isDark.value ? 'dark' : 'light'
  chartInstance.value = echarts.init(chartRef.value, theme)

  if (chartOptions.value) {
    chartInstance.value.setOption(chartOptions.value)
  }
}

function updateChart(options: any) {
  if (!chartInstance.value || !options) return
  handleResize()
  chartInstance.value.setOption(options, {
    notMerge: true,
    lazyUpdate: true,
  })
}

function changeTheme() {
  if (!chartRef.value || !chartInstance.value || !chartOptions.value) return

  chartInstance.value.dispose()
  chartInstance.value = null

  const theme = isDark.value ? 'dark' : 'light'
  chartInstance.value = echarts.init(chartRef.value, theme)
  console.log('opt 2', chartOptions.value)
  chartInstance.value.setOption(chartOptions.value)

  nextTick(() => {
    chartInstance.value?.resize()
  })
}

const handleResize = useDebounceFn(() => {
  chartInstance.value?.resize()
}, 100)

watch(
  () => props.options,
  (newOptions) => {
    if (!newOptions) return

    chartOptions.value = newOptions

    if (!chartInstance.value) {
      initChart()
    } else {
      updateChart(newOptions)
    }
  },
  { immediate: true }
)

watch(isDark, () => {
  if (chartInstance.value && chartOptions.value) {
    changeTheme()
  }
})

watch(chartInstance, (newChart, oldChart) => {
  if (oldChart) {
    window.removeEventListener('resize', handleResize)
  }
  if (newChart) {
    window.addEventListener('resize', handleResize)
  }
})

onMounted(() => {
  nextTick(initChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance.value?.dispose()
  chartInstance.value = null
  chartOptions.value = null
})
</script>

<template>
  <div class="h-80 w-full">
    <div v-if="props.isLoading?.value" class="h-full flex items-center justify-center p-3">
      <div class="h-full rounded-xl w-full shrink-0 animate-pulse bg-gray-700"></div>
    </div>

    <div
      v-else-if="props.isError?.value"
      class="h-full flex items-center justify-center text-red-500"
    >
      Data not found
    </div>

    <div
      v-show="!props.isLoading?.value && !props.isError?.value"
      ref="chartRef"
      class="w-full h-full"
    />
  </div>
</template>
