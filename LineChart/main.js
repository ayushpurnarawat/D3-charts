import React, { Component } from 'react'
import * as d3 from 'd3'
import {line,curveMonotoneX} from 'd3-shape'
import AxisMain from './axis'
import { select } from 'd3'

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
            { name: 'Aug', value: 70 },
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
        /*-----------------------------CREATE SVG------------------------------*/
        var svg  = d3.select('div')
                    .append('svg')
                    .attr('width',width)
                    .attr('height',height)

        /*-----------------------------SCALEING FOR X AND Y AXIS---------------- */
        var x_scale = d3.scaleBand()
                    .domain(data.map(d=>d.name))
                    .range([0,width])

        var y_scale = d3.scaleLinear()
        .range([height,0])            
        .domain([(0),d3.max(data,function(d,i){
            return d.value
        })])
        .nice()

        /*-----------------------------AXISES-------------------------------------- */
        var X_AXIS = d3.axisBottom()
            .scale(x_scale)

        var Y_AXIS = d3.axisLeft()
            .scale(y_scale)

            
        /*-----------------------------APPEND IN GROUP-------------------------------*/
        svg.append('g')
        .attr("transform","translate(30, 0)")
        .call(Y_AXIS)
        .attr('fill','none')
        .attr('stroke','red')
        
        svg.append('g')
        .attr("transform",`translate(10,${172})`)
        .call(X_AXIS)
        .attr('fill','none')
        .attr('stroke','purple')
        /*-----------------------------BACKGROUND SET USING 'rect'------------------- */
        svg.append('rect')
        .attr('width',width)
        .attr('height',height)
        .attr('fill','red')
        .attr('opacity',.3)

        /*--------------------------------LINE DRAWAING---------------------------------- */
        AxisMain(data,x_scale,y_scale)
    
    }
    render(){
        
        return(
            <div>
                Click on button to Generate SingleLine Chart with Date
                
                <button onClick={this.chart}>button</button>
            </div>
        )
    }
}

export default Main