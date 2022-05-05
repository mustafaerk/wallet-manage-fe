import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from "prop-types";



const Chart = ({ ChartData, ChartTitle }) => {
    const options = {
        chart: {
            styledMode: true
        },
        title: {
            text: ChartTitle
        },  
        series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data: ChartData,
            showInLegend: true
        }]
    }

    return <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
}

Chart.propTypes = {
    ChartData: PropTypes.array,
    ChartTitle: PropTypes.string,
};

export default Chart;