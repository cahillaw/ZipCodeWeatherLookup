import React, { useState } from "react"

import SearchBar from "material-ui-search-bar";
import { Grid, Paper } from "@material-ui/core";
import { getWeatherByZip, kelvinToFahrenheit } from "./zipLookupFunctions"

import { makeStyles } from "@material-ui/core/styles";
import styles from "./zipLookupStyle";
const useStyles = makeStyles(styles);

const SETTINGS = require("../../settings.json");

function ZipLookup() {
    const classes = useStyles();
    const [data, setData] = useState(null)
    const [iconURL, setIconURL] = useState('')

    return (
        <Grid container direction = "column" className={classes.container}>
            <Grid item xs = {12}>
                <h1>ZipCode Weather Lookup</h1>
            </Grid>
            <Grid item xs = {12}>
                <SearchBar 
                    placeholder="Search for a ZipCode..."
                    onRequestSearch={(newValue) => {
                        let result = getWeatherByZip(newValue,"US",SETTINGS.api_key)
                        result.then((res) => {
                            if(res.code !== 200) {
                                alert(res.data)
                            } else {
                                setData(res.data)
                                setIconURL("http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png")
                            }
                        })
                    }}
                    className={classes.searchBar}
                    inputProps={{ "data-testid": "searchbar" }}
                />
            </Grid>
            {data !== null ? //if there is no data, do not render the weather info
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