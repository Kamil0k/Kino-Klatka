import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

function Chart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      series: [
        {
          name: "filmy",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "kinomaniacy",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
        {
          name: "pracownicy",
          data: [11, 16, 12, 22, 34, 42, 56],
        },
        {
          name: "promocje",
          data: [2, 6, 9, 2, 11, 8, 14],
        },
      ],
      chart: {
        height: 350,
        type: "area",
        foreColor: "#fff",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          new Date().toISOString(),
          new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      legend: {
        show: true,
      },
      colors: ["#b82227", "#cfb53b", "#ffffff", "#000000"], // tablica kolorów dla serii danych
    };
    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();
  }, []);

  return <div className="wrapper" ref={chartRef}></div>;
}

export default Chart;
