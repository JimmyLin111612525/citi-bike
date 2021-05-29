
import './App.css';

import ReactMapGL, { Source, Layer } from "react-map-gl";
import React, { useState, useContext, useEffect } from "react";

const App = () => {
  const [viewport, setViewport] = useState({
    //set viewing settings for map
    latitude: 40.730610,
    longitude: -73.935242,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const processRegionSelection = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className="container-fluid"
      style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <div className="row d-flex justify-content-between" style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
      }}>
        <div id="left-bar" className="col-3 shadow-lg" align="center" style={{
          backgroundColor: "#fff",
          zIndex: "2",
          paddingTop: "5rem",
          height: "100%",
          position: "relative",
        }}>
          <div
            className="text-white"
            style={{ zIndex: "4", position: "relative" }}
          >

            <h3>Select a region:</h3>
            <select
              id="region-selection"
              class="form-select"
              onChange={processRegionSelection}
            >
              <option value="" defaultValue hidden>
                Select a region
              </option>
              <option value="region_71">71</option>
              <option value="region_70">70</option>
              <option value="region_311">311</option>
            </select>

          </div>
          <div className="bg-primary region_selection_banner">
            
          </div>

        </div>
      </div>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={setViewport}
        mapboxApiAccessToken={
          "pk.eyJ1IjoieGxpdHRvYm95eHgiLCJhIjoiY2tscHFmejN4MG5veTJvbGhyZjFoMjR5MiJ9.XlWX6UhL_3qDIlHl0eUuiw"
        }
        
      >
        

        
      </ReactMapGL>
    </div>
  );
}

export default App;
