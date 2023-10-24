<template>
<div  style="padding-top: 50px; width: 100%; display: flex; flex-direction: column; align-items: center">
    <div style="width: 80%" id="chart-1"></div>
    <div style="width: 80%" id="chart-2"></div>
    <div style="width: 80%; height: 700px;" id="chart-3"></div>
    <div style="width: 80%; height: 700px" id="chart-4"></div>
</div>
</template>

<script>
import Plotly from 'plotly.js-dist'
export default {
    name: 'MainPage',
    props: {
      data: {
          type: Array,
      },
        arrRoK: {
          type: Array,
        }
    },
    mounted() {
        var xArray = this.data[0].x;
        var yArray = this.data[0].z.map(i => i * (-1));
        console.log("x", xArray)
        console.log("y", yArray)

        var data = [{
            x: xArray,
            y: yArray,
            mode: "markers",
            type: "scatter",
            name: "A нүктесі"
        },
            {
                x: this.data[1].x,
                y: this.data[1].z.map(i => i*(-1)),
                mode: "lines",
                type: "scatter",
                name: "Рельеф"
            }
        ];
        console.log("data", data)

        Plotly.newPlot("chart-1", data, {title: "Рельефтің орналасу геометриясы", yaxis: { title: "z, m" }, xaxis: { title: "x, m"}});

        Plotly.newPlot("chart-2", [{
            x: this.arrRoK[0].roX,
            y: this.arrRoK[0].roK,
            mode: "lines",
            type: "scatter",
            name: "angle = 15°"
        },
        {
            x: this.arrRoK[1].roX,
            y: this.arrRoK[1].roK,
            mode: "lines",
            type: "scatter",
            name: "angle = 25°"
        },
        {
            x: this.arrRoK[2].roX,
            y: this.arrRoK[2].roK,
            mode: "lines",
            type: "scatter",
            name: "angle = 35°"
        }
        ], { title: "Айқын кедергі қисықтары", yaxis: { title: "ρ, Ohm∙m" }, xaxis: { title: "x, m"}})
        Plotly.newPlot('chart-3', [{
            z: this.data[3].nuxK,
            type: 'surface',
        }], { title: "Зарядтардың рельефте таралу жиілігі"})
        Plotly.newPlot('chart-4', [{
            z: this.data[4].nuxY,
            type: 'surface',
        }], { title: "Екінші ретті зарядтардың рельефте таралуы", zaxis: {title: "a"}})
    },
    data() {
        return {
            chart2Options: {
                series: [{
                    data: [4,5,1,-4,-9,17,16,15] // sample data
                }]
            },
            chart3Options: {
                series: [{
                    data: [9,8,7,1,-6,15,11,14,14] // sample data
                }]
            }
        } 
    },
}
</script>
  
<style>
</style>
  