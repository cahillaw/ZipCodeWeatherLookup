import React, { useState } from "react"

import SearchBar from "material-ui-search-bar";
import { Grid, Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import styles from "./zipLookupStyle";
const useStyles = makeStyles(styles);

const ZipLookup = () => {
    const classes = useStyles();
    const [zipCode, setZipCode] = useState('')
    const [data, setData] = useState([])
    const [iconURL, setIconURL] = useState('')

    
    const getWeatherByZip = (zipCode, countryCode, apiKey) => {
        var url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "," + countryCode + "&appid=" + apiKey
        fetch(url, {
          method: 'get'
        })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              console.log(data)
              setData(data)
              setIconURL("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
            })
          } else {
            console.log("failed :(")
            alert("failed")
          }
        })        
    }

    function kelvinToFahrenheit(tempKelvin) {
        return Math.round((tempKelvin - 273.15)*(9/5) + 32)
    }

    return (
        <Grid container direction = "column" className={classes.container}>
            <Grid item xs = {12}>
                <h1>ZipCode Weather Lookup</h1>
            </Grid>
            <Grid item xs = {12}>
                <SearchBar
                    placeholder="Search for a ZipCode..."
                    value={zipCode}
                    onChange={(newValue) => setZipCode(newValue)}
                    onRequestSearch={(newValue) => getWeatherByZip(newValue,"us","6943dd3c502c8cff737d78bb517686c2")}
                    className={classes.searchBar}
                />
            </Grid>
            {data.length !== 0 ? 
                <Grid item xs={12} className={classes.weatherContent}>
                    <Paper>
                        <Grid container direction ="row">
                            <Grid item xs = {12}>
                                <h3>{data.name}, {data.sys.country}</h3>
                            </Grid>
                            <Grid item xs = {12} className={classes.currentTemp}>
                                <strong>{kelvinToFahrenheit(data.main.temp)}&deg; F</strong>
                            </Grid>
                            <Grid item xs = {6}>
                                Low: {kelvinToFahrenheit(data.main.temp_min)}&deg; F
                            </Grid>
                            <Grid item xs = {6}>
                                High: {kelvinToFahrenheit(data.main.temp_max)}&deg; F
                            </Grid>
                            <Grid item xs = {12}>
                                <h4>{data.weather[0].main}</h4>
                                <img src={iconURL} alt={data.weather[0].description} className={classes.icon}></img>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            : null }
        </Grid>
    )        
    
}

export default ZipLookup