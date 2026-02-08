import { get } from 'lodash';
import { decimalNumberFormat } from '../../../../helper/number.helper';

const color = {
  negative: 'oklch(63.7% 0.237 25.331)',
  positive: 'oklch(72.3% 0.219 149.579)',
  neutral: 'oklch(55.1% 0.027 264.364)',
};

export const getChartOptionsPieData = ({
  series,
  customOptions = { grid: {}, legend: {}, tooltip: {}, xAxis: {}, yAxis: {}, color: ['#0A84FF', '#5E5CE6', '#FF9F0A', '#34C759', '#FF375F', '#AF52DE'] },
}: any) => {
  const dataSeries = series?.features.map((f: any) => {{
    const name = f[series?.fields?.find((f: any) => f?.type == 'string')?.name]
    const c = get(color, name.toLowerCase());
    return {
      name: name,
      value: decimalNumberFormat(f[series?.fields?.find((f: any) => f?.type == 'number')?.name], 0),
      itemStyle: { color: c ? c : undefined },
    };
  }});
  


  return {
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return `${params.seriesName || params.name}<br />
              ${params?.marker} ${params.name}: (${params?.value}) ${params.percent}%`;
      },
      ...customOptions?.tooltip,
    },
    legend: {
      show: false,
      bottom: '0',
      type: 'scroll',
      ...customOptions?.legend,
    },
    series: [
        {
          name: name,
          type: 'pie',
          radius: ['45%', '70%'],
          center: [
            '50%',
            customOptions?.legend?.show ? '40%' : '50%',
            '50%',
            '50%',
          ],
          avoidLabelOverlap: true,
          label: {
            overflow: 'truncate',
            lineHeight: 12,
            color: 'oklch(70.7% 0.022 261.325)',
            ...customOptions?.label,
          },
          labelLine: {
            show: true,
            length: 5,
          },
          data: dataSeries,
          emphasis: {
            itemStyle: {
              color: 'inherit',
            },
          },
        },
      ],
  };
};