import * as echarts from 'echarts';
import { replaceAll, toTitleCase } from '../../../../helper/string.helper';
import { decimalNumberFormat } from '../../../../helper/number.helper';

export const getChartOptionsLineChartData = ({
  series,
  customOptions = { grid: {}, legend: {}, tooltip: {}, xAxis: {}, yAxis: {}, color: ['#0A84FF', '#5E5CE6', '#FF9F0A', '#34C759', '#FF375F', '#AF52DE'] },
}: any) => {
  const features = series?.features;
  const fields = series?.fields;
  const color = customOptions?.color;
  const dataLabel = features?.map((f: any) => f[series?.fields?.find((f: any) => f?.type == 'string')?.name]);
  const dataSeries = fields?.filter((f: any) => f?.type == 'number')?.map((l: any, i: number) => {
    return {
      name: toTitleCase(replaceAll(l?.name, { _: ' ' })),
      data: features?.map((f: any) => decimalNumberFormat(f[l?.name], 0)),
      type: 'line',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: color[i],
      },
    };
  });

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      ...customOptions?.tooltip,
    },
    legend: { show: false, ...customOptions?.legend },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: customOptions?.legend?.show ? '20%' : '5%',
      containLabel: true,
      ...customOptions?.grid,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: true },
      splitLine: {
        lineStyle: { type: 'dotted', color: 'oklch(70.7% 0.022 261.325)' },
      },
      ...customOptions?.yAxis,
    },
    xAxis: {
      type: 'category',
      data: dataLabel,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        width: 99,
      },
      splitLine: {
        lineStyle: { type: 'dotted', color: 'oklch(70.7% 0.022 261.325)' },
      },
      ...customOptions?.xAxis,
    },
    series: dataSeries,
  };
};

export const getChartOptionsAreaSeries = ({
  series,
  customOptions = { grid: {}, legend: {}, tooltip: {}, xAxis: {}, yAxis: {}, color: ['#0A84FF', '#5E5CE6', '#FF9F0A', '#34C759', '#FF375F', '#AF52DE'] },
}: any) => {
  const features = series?.features;
  const fields = series?.fields;
  const color = customOptions?.color;
  const dataLabel = features?.map((f: any) => f[series?.fields?.find((f: any) => f?.type == 'string')?.name]);
  const dataSeries = fields?.filter((f: any) => f?.type == 'number')?.map((l: any, i: number) => {
    return {
      name: toTitleCase(replaceAll(l?.name, { _: ' ' })),
      data: features?.map((f: any) => decimalNumberFormat(f[l?.name], 0)),
      type: 'line',
      label: {
        show: false,
      },
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: color[i],
      },
      areaStyle: {
        opacity: 0.4,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 0.9, [
          {
            offset: 0,
            color: 'rgba(10,132,255, 0.01)',
          },
          {
            offset: 1,
            color: 'rgb(255,255,255)',
          },
        ]),
      },
    };
  });

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      ...customOptions?.tooltip,
    },
    legend: { show: false, ...customOptions?.legend },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      top: customOptions?.legend?.show ? '20%' : '3%',
      containLabel: true,
      ...customOptions?.grid,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: true },
      splitLine: {
        lineStyle: { type: 'dotted', color: 'oklch(70.7% 0.022 261.325)' },
      },
      ...customOptions?.yAxis,
    },
    xAxis: {
      type: 'category',
      data: dataLabel,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        width: 99,
      },
      splitLine: {
        lineStyle: { type: 'dotted', color: 'oklch(70.7% 0.022 261.325)' },
      },
      ...customOptions?.xAxis,
    },
    series: dataSeries,
  };
};