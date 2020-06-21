import React, { Component } from 'react'
import * as d3 from 'd3'
import { map } from 'd3'
import {queue} from 'd3-queue'
import * as topojson from 'topojson' 
import Axios from 'axios'
import MapNavigation from './MapNavigation'
var state= null
var Response = {}
var stateNames =''
class TestMap extends Component
{
  state ={
    show:false,
    stateName:''
  }
  componentDidMount(){
    this.map()
  }
  componentWillUpdate(){
    console.log("update")
  }
  onHavor=()=>{
    this.setState({stateName:stateNames})
  }
map=()=>{
// The svg
var width = 550
        var height = 400
        var svg = d3.select('div')
            .append('svg')
            .attr('width','432px')
            .attr('height','600px')
            // .attr('viewBox','0 0 632 800')
            // .attr('transform','translate(10,30)')
// Map and projection

var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(730)
  // .center([0,0])

  .translate([-850, 550]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeDark2[5]);

Axios.get('https://api.covid19india.org/data.json').then(function(res){
    Response={
      ...res
    }
})
d3.json("./india.geojson").then(function(data){
    // console.log(data,"delhi")
    ready(data)
})

function ready(todo) {

  let mouseOver = function(d) {
    d3.selectAll(".State")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
    // console.log(d.properties.st_nm)
    state = d.properties.st_nm
    stateNames =MapNavigation(d.properties,Response)
    
  }
  // console.log("error","topo",todo)
  let mouseLeave = function(d) {
    d3.selectAll(".State")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(todo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "State" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
      
    
    }
  // console.log(this.state.stateName,"stafdcg")
}
    render(){

      console.log(this.state.stateName)
        var st = null
      
        return
      
        
    }
}

export default TestMap