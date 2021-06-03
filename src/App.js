
import './App.css';

import ReactMapGL, { Marker } from "react-map-gl";
import React, { useState } from "react";
import { Bicycle } from 'react-bootstrap-icons';

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
    let radios = document.getElementsByClassName("form-check-input")
    // console.log(radios)
    for (let r of radios) {
      r.checked = false
    }
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

    if (regionNumber == 70) {
      setViewport((prevViewport) => {
        return {
          ...prevViewport,
          longitude: -74.05474749737286,
          latitude: 40.727072570161255,
          zoom: 13.5
        }
      })
    } else if (regionNumber == 311) {
      setViewport((prevViewport) => {
        return {
          ...prevViewport,
          latitude: 40.74499282902128,
          longitude: -74.03353265304999,
          zoom: 14.5
        }
      })
    } else {
      setViewport((prevViewport) => {
        return {
          ...prevViewport,
          longitude: -73.94618117623384,
          latitude: 40.75343397110906,
          zoom:10.75
        }
      })
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
          setViewport((prevViewport) => {
            return {
              ...prevViewport,
              latitude: station.longitude,
              longitude: station.latitude,
              zoom: 16
            };

          })
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
          setViewport((prevViewport) => {
            return {
              ...prevViewport,
              latitude: station.longitude,
              longitude: station.latitude,
              zoom: 16
            };

          })
        }
        // console.log(station.station_name)


        break
      }
    }


  }

  const markerClicked = (e) => {
    e.preventDefault();
    const index = parseInt(e.currentTarget.id.split("-")[1])
    let card = document.getElementById(`station-card-${index}`)
    let container = document.getElementById('cards-container')
    console.log(card.offsetHeight)
    // console.log(index)
    if (chosenStation && chosenStation !== e.currentTarget) {
      chosenStation.classList.remove('btn-danger')
      chosenStation.classList.add('btn-primary')
      e.currentTarget.classList.remove('btn-primary')
      e.currentTarget.classList.add('btn-danger')
      chosenCard.classList.remove('bg-primary')
      chosenCard.classList.remove('text-white')
      card.classList.add("bg-primary")
      card.classList.add("text-white")
      setChosenCard(card)
      setChosenStation(e.currentTarget);
      container.scrollTop = card.offsetTop - (3 * card.offsetHeight);
    } else if (chosenStation === e.currentTarget) {
      chosenStation.classList.remove('btn-danger')
      chosenStation.classList.add('btn-primary')
      card.classList.remove("bg-primary")
      card.classList.remove("text-white")
      setChosenStation(null)
      setChosenCard(null)
    }
    else {
      e.currentTarget.classList.remove('btn-primary')
      e.currentTarget.classList.add('btn-danger')
      card.classList.add("bg-primary")
      card.classList.add("text-white")
      setChosenStation(e.currentTarget);
      setChosenCard(card)
      container.scrollTop = card.offsetTop - (3 * card.offsetHeight);
    }


    console.log(chosenStation)
  }

  const mapClicked = (e) => {
    console.log(e.lngLat)
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

  }

  const sortCardsDescending = () => {
    let tempCards = stationCards;
    console.log(tempCards)
    tempCards.sort((a, b) => {
      if (a.visits - b.visits > 0) {
        return -1;
      } else if (a.visits - b.visits < 0) {
        return 1;
      } else {
        return 0;
      }
    })
    console.log(tempCards)
    setStationCards([...tempCards])
  }

  const sortCardsAscending = () => {
    let tempCards = stationCards;
    console.log(tempCards)
    tempCards.sort((a, b) => {
      if (a.visits - b.visits > 0) {
        return 1;
      } else if (a.visits - b.visits < 0) {
        return -1;
      } else {
        return 0;
      }
    })
    console.log(tempCards)
    setStationCards([...tempCards])
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
              style={{ height: "85%", width: "100%" }}
            >
              <hr></hr>
              <h5 style={{ paddingTop: "20px" }}>Choose a station:</h5>
              <div className="flex-row d-flex mx-6">
                Sort by:
                <div className="col form-check" style={{ marginLeft: "10px" }}>
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={sortCardsDescending} />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Most Visited
                  </label>
                </div>
                <div className="col form-check" style={{ marginLeft: "10px" }}>
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={sortCardsAscending} />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Least Visited
                  </label>
                </div>
              </div>
              <div
                id="cards-container"
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
                  <button className={`shadow btn btn-primary border border-white p-0`} id={`marker-${index}`} onClick={markerClicked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" className="bi bi-bicycle" viewBox="0 0 16 16">
                      <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5zm1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139L5.5 6.943zM8 9.057 9.598 6.5H6.402L8 9.057zM4.937 9.5a1.997 1.997 0 0 0-.487-.877l-.548.877h1.035zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765l1.027-1.643zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53L11.55 8.623z" />
                    </svg>
                  </button>
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
