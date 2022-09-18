import { Doughnut as Chart } from 'react-chartjs-2';
import 'chart.js/auto'
import styled from 'styled-components';

const Doughnut = () => {
    
    const chartData = {
        labels: ["s", 's'],
        datasets: [
            {
                labels: ['sdsd', 'sdsd'],
                data: [50, 50],
                backgroundColor: ["red", "blue"],
                borderWidth: 1,
                datalabels: {
                    color: 'white',
                },
                hoverOffset: 10,
                hoverBorderWidth: 10,
                hoverBorderJoinStyle: 'miter',
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        layout: {
            padding: 20,
        },
    }

    return (
        <ChartContainer>
           
        />
        </ChartContainer>
        
    )
}

const ChartContainer = styled.div`
    width: 300px;
    height: 300px;
`

export default Doughnut