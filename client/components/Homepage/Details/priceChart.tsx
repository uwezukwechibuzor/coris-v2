import React, { useRef } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useAppSelector } from "../../../lib/hooks";

const PriceChart = (props) => {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const chartRef = useRef();

  const getPriceData = props;

  var config = {
    chart: {
      zoomType: "x",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    // subtitle: {
    // text:
    // document.ontouchstart === undefined
    // ? "Click and drag in the plot area to zoom in"
    //: "Pinch the chart to zoom in",
    //},
    xAxis: {
      type: "",
      zoomEnabled: true,
      categories: getPriceData?.priceChart?.map((data) => data?.map((y) => y)),
      tickInterval: 60,
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%Y-%m-%d", this.value);
        },
      },
    },
    yAxis: {
      title: {
        text: "Exchange rate",
      },
      visible: false,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 1,
          },
          stops: [
            [0, darkMode ? "#402782" : "#c7aefe"],
            [1, "transparent"],
          ],
        },
        marker: {
          radius: 5,
          fillColor: "#5a55d2",
          lineWidth: "5",
          lineColor: "transparent",
          enabledThreshold: "4",
        },
        lineWidth: 2,
        lineColor: "#5a55d2",
        states: {
          hover: {
            lineWidth: 2,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "USD",
        data: getPriceData?.priceChart?.map((data) => data?.map((y) => y)),
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartRef}
      containerProps={{ style: { width: "100%", height: "300px" } }}
      options={config}
    />
  );
};

export default PriceChart;
