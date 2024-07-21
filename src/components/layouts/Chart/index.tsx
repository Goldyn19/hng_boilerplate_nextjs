import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type DataPoint = {
  month: string;
  value: number;
};

type ChartProps = {
  data: DataPoint[];
};

export function Chart({ data }: ChartProps) {
  const chartOptions: ApexOptions = {
    chart: {
      id: 'customer-bar-chart',
      toolbar: {
        show: false,
      },
      fontFamily: `'Inter', sans-serif`,
    },
    xaxis: {
      categories: data.map(item => item.month),
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '95%',
        borderRadius: 4,  // Rounded bar corners
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    colors: ['#F97316'],
    grid: {
      show: false,  
    },
  };

  const chartSeries = [
    {
      name: 'Amount',
      data: data.map(item => item.value),
    },
  ];

  return (
    <ApexChart
      type="bar"
      options={chartOptions}
      series={chartSeries}
      height="100%"
      width="100%"
    />
  );
}