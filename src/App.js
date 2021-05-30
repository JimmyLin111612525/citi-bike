
import './App.css';

import ReactMapGL, { Marker } from "react-map-gl";
import React, { useState } from "react";

const App = () => {
  const [stationLayers, setStationLayers] = useState(null)
  const [stationCards, setStationCards] = useState(null)
  const [chosenStation, setChosenStation] = useState(null)
  const [chosenCard, setChosenCard] = useState(null)

  const [viewport, setViewport] = useState({
    //set viewing settings for map
    latitude: 40.730610,
    longitude: -73.935242,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const stationsJSON = require("./data/stations.json")

  const processRegionSelection = (e) => {
    console.log('process')
    const regionNumber = parseInt(e.target.value.split("_")[1])
    const stationsOBJ = Object.values(stationsJSON)
    let stationCards = []
    for (let i = 0; i < stationsOBJ.length; i++) {
      let station = stationsOBJ[i]
      if (station.region_id === regionNumber) {
        let newStation = JSON.parse(JSON.stringify(station))
        newStation.station_name = newStation.station_name.replace(/\s/g, "-")
        console.log(newStation.station_name)
        stationCards.push(newStation)

      }
    }

    setStationCards(stationCards)
  }

  const numberWithCommas = (x) => {
    // add commas for thousands place and stuff
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const cardClicked = (e) => {
    e.preventDefault()
    console.log(stationCards.length)
    console.log(chosenStation)
    const className = e.currentTarget.className.substr(e.currentTarget.className.indexOf(' ') + 1)
    console.log(className)
    let lat = ''
    let long = ''
    // console.log(className)
    // console.log(stationCards)
    for (let i = 0; i < stationCards.length; i++) {
      const station = stationCards[i]

      if (e.currentTarget.className.includes(station.station_name)) {
        console.log('passed')
        let newStat = document.getElementById(`marker-${i}`)
        lat = station.latitude
        long = station.longitude
        if (chosenCard && chosenCard !== e.currentTarget) {

          chosenCard.classList.remove("bg-primary")
          chosenCard.classList.remove("text-white")
          e.currentTarget.classList.add("bg-primary")
          e.currentTarget.classList.add("text-white")
          console.log(e.currentTarget.classList)
          chosenStation.classList.remove("btn-danger")
          chosenStation.classList.add("btn-primary")
          newStat.classList.remove("btn-primary")
          newStat.classList.add("btn-danger")
          setChosenStation(newStat)
          setChosenCard(e.currentTarget)
          console.log(`Longitude : ${long}, Latitude : ${lat}`)
        } else if (chosenCard && chosenCard.className.includes(e.currentTarget.className)) {
          console.log('here')
          chosenCard.classList.remove("bg-primary")
          chosenCard.classList.remove("text-white")
          chosenStation.classList.remove("btn-danger")
          chosenStation.classList.add("btn-primary")
          setChosenStation(null)
          setChosenCard(null)
          console.log(`Longitude : ${long}, Latitude : ${lat}`)
        } else {
          e.currentTarget.classList.add("bg-primary")
          e.currentTarget.classList.add("text-white")

          newStat.classList.remove("btn-primary")
          newStat.classList.add("btn-danger")
          setChosenStation(newStat)
          setChosenCard(e.currentTarget)
          console.log(`Longitude : ${long}, Latitude : ${lat}`)
        }
        // console.log(station.station_name)

        setViewport((prevViewport) => {
          return {
            ...prevViewport,
            latitude: station.longitude,
            longitude: station.latitude,
            zoom: 16
          };

        })
        break
      }
    }


  }

  const markerClicked = (e) => {
    e.preventDefault();
    const index = parseInt(e.target.id.split("-")[1])
    let card = document.getElementById(`station-card-${index}`)
    console.log(index)
    if (chosenStation && chosenStation !== e.target) {
      chosenStation.classList.remove('btn-danger')
      chosenStation.classList.add('btn-primary')
      e.target.classList.remove('btn-primary')
      e.target.classList.add('btn-danger')
      chosenCard.classList.remove('bg-primary')
      chosenCard.classList.remove('text-white')
      card.classList.add("bg-primary")
      card.classList.add("text-white")
      setChosenCard(card)
      setChosenStation(e.target);
    } else if (chosenStation === e.target) {
      chosenStation.classList.remove('btn-danger')
      chosenStation.classList.add('btn-primary')
      card.classList.remove("bg-primary")
      card.classList.remove("text-white")
      setChosenStation(null)
      setChosenCard(null)
    }
    else {
      e.target.classList.remove('btn-primary')
      e.target.classList.add('btn-danger')
      card.classList.add("bg-primary")
      card.classList.add("text-white")
      setChosenStation(e.target);
      setChosenCard(card)
    }


    console.log(chosenStation)
  }

  const mapClicked = (e) => {
    console.log(stationCards.length)
    console.log("marker clicked")
    console.log(chosenStation)
    if (chosenStation) {
      chosenStation.classList.remove('btn-danger')
      chosenStation.classList.add('btn-primary')
    }
    if (chosenCard) {
      chosenCard.classList.remove("bg-primary")
      chosenCard.classList.remove("text-white")
    }
    setChosenStation(null)
    setChosenCard(null)
    e.stopPropagation();


    // if(e.target.classList.contains('chosen')){
    //   console.log('already chosen')
    //   e.target.classList.remove('chosen')
    //   console.log(chosenStation)
    // }else{
    //   setChosenStation(130)
    //   e.target.classList.add('chosen')
    // }

    // if (chosenStation === null) {
    //   console.log('not chosen')
    //   setChosenStation(3)
    //   console.log(chosenStation)
    // } else {
    //   console.log('chosen')
    //   console.log(chosenStation)
    // }

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
              className="form-select"
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
          <div className="bg-primary region_selection_banner" style={{ paddingTop: "1.5rem" }}>
            <img width="200" src="citibike.png" alt="citibike logo" />
          </div>
          {stationCards ? (
            <div
              className="d-flex flex-column justify-content-between"
              style={{ height: "90%", width: "100%" }}
            >
              <hr></hr>
              <h5>Choose a station:</h5>
              <div
                style={{ overflow: "auto", height: "85%" }}
              >
                {stationCards.map((station, index) => {
                  return (
                    <div className={`card ${station.station_name}`} id={`station-card-${index}`} key={index} style={{ marginBottom: "5px" }} onClick={cardClicked}>

                      <div className="card-body">
                        <h5 className="card-title">
                          {station.station_name.replace(/-/g, " ")}
                        </h5>
                        <h6 className="card-title">
                          {numberWithCommas(station.visits)} visits
                        </h6>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : ("")}



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
        onClick={mapClicked}

      >
        {stationCards ?
          (
            stationCards.map((station, index) => {
              return (
                <Marker key={station.station_name} latitude={station.longitude} longitude={station.latitude} >
                  <button className={`btn btn-primary`} id={`marker-${index}`} onClick={markerClicked}></button>
                </Marker>
              )
            })
          )
          : ('')}


      </ReactMapGL>
    </div>
  );
}

export default App;
