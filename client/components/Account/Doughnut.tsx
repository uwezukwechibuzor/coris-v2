import { Doughnut as Chart } from "react-chartjs-2";
import "chart.js/auto";
import styled from "styled-components";
import { useAppSelector } from "../../lib/hooks";

const Doughnut = (props) => {
  const darkMode = useAppSelector((state) => state.general.darkMode);

  const {
    percentageOfAccountDelegations,
    percentageOfAccountRedelegations,
    percentageOfAccountRewards,
    percentageOfAccountUnboundings,
  } = props;

  const chartData = {
    labels: ["Reward", "Delegation", "Redelegation", "Unbonding"],
    datasets: [
      {
        labels: ["sdsd", "sdsd"],
        data: [
          percentageOfAccountRewards,
          percentageOfAccountDelegations,
          percentageOfAccountRedelegations,
          percentageOfAccountUnboundings,
        ],
        backgroundColor: [
          darkMode ? "red" : "red",
          darkMode ? "blue" : "#402782",
          darkMode ? "lightblue" : "lightblue",
          darkMode ? "darkblue" : "darkblue",
        ],
        borderWidth: 1,
        datalabels: {
          color: "white",
        },
        hoverOffset: 10,
        hoverBorderWidth: 10,
        hoverBorderJoinStyle: "miter",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <ChartContainer>
      <Chart data={chartData} options={options as any} />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  width: 300px;
  height: 300px;
`;

export default Doughnut;
