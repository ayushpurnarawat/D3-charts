import React, { Component } from 'react'
import * as d3 from 'd3'
import AxisMain from './axis'

class Main extends Component
{
    state= {
        data: [
            { name: 'Jan', value: 30 },
            { name: 'Feb', value: 10 },
            { name: 'Mar', value: 50 },
            { name: 'Apr', value: 20 },
            { name: 'May', value: 80 },
            { name: 'Jun', value: 30 },
            { name: 'July', value: 0 },
            { name: 'Aug', value: 20 },
            { name: 'Sep', value: 10 },
            { name: 'Oct', value: 55 },
            { name: 'Nov', value: 60 },
            { name: 'Dec', value: 80 },
          ]
    }
    chart=()=>{
        const { data} = this.state
        const margin = {top:20,left:20,bottom:20,right:20}
        const width = 550 -margin.left-margin.right
        const height = 230 -margin.top-margin.bottom

        var svg  = d3.select('div')
                    .append('svg')
                    .attr('width',width)
                    .attr('height',height)


        var x_scale = d3.scaleBand()
                    .domain(data.map(d=>d.name))
                    .range([0,width])
        var y_scale = d3.scaleLinear()
        .range([height,0])            
        .domain([(0),d3.max(data,function(d,i){
            return d.value
        })])
        // .domain([0,200])
        .nice()
        var X_AXIS = d3.axisBottom()
            // .ticks(d3.timeDay.every(1))
            .scale(x_scale)

        var Y_AXIS = d3.axisLeft()
            // .ticks(data.length)
            .scale(y_scale)

            const line = d3.line()
            .x(function(d,i){return x_scale(d.name)})
            .y(function(d,i){return y_scale(d.value)})       
        svg.append('g')
        .attr("transform","translate(30, 0)")
        .call(Y_AXIS)
        .attr('fill','none')
        .attr('stroke','red')
        
        console.log(height)
        svg.append('g')
        .attr("transform",`translate(10,${172})`)
        // .attr('fill','red')
        .call(X_AXIS)
        .attr('fill','none')
        .attr('stroke','purple')

        svg.append('rect')
        .attr('width',width)
        .attr('height',height)
        .attr('fill','red')
        .attr('opacity',.3)
    }
    render(){
        
        return(
            <div>
                FinalChart.js
                {/* <AxisMain 
                data={this.state.data} 
                x_scale={x_scale}
                y_scale={y_scale}
                svg={svg}
                /> */}
                <button onClick={this.chart}>button</button>
            </div>
        )
    }
}

export default Main