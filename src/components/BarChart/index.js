import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from "prop-types";

import "./BarChart.css"

const Chart = ({ data, chartTitle, categories }) => {
    console.log(data)
    const options = {

        chart: {
            type: 'column'
        },
        title: {
            text: chartTitle
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '$'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} $</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: data

    }

    return <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
}

Chart.propTypes = {
    data: PropTypes.array,
    categories: PropTypes.array,
    chartTitle: PropTypes.string,
};

export default Chart;