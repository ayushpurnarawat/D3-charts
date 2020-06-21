
import React from 'react'
import { render } from '@testing-library/react'
function MapNavigation(state,response){
    


    var data= {
        ...response.data.statewise
    }
    
    for(var key in data)
    {
        if(state.st_nm===response.data.statewise[key].state)
        {
            console.log("Active Cases in-> ",response.data.statewise[key].state,"is-> ",response.data.statewise[key].active)
            return  response.data.statewise[key].state
        }
    }
    
}

export default MapNavigation