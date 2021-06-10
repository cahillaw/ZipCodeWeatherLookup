# ZipCode Weather Lookup

## About

ZipCode Weather Lookup is a web application that allows users to lookup weather information for a given Zip Code. It uses weather data from [OpenWeatherMap](https://openweathermap.org) and displays the city name, country code, currrent temperature, high and low temperatures for the day, and current weather. To use the application, type a Zip Code in the search bar and hit enter!

![ZipCode Weather Lookup](https://raw.githubusercontent.com/cahillaw/ZipCodeWeatherLookup/master/public/weatherlookup.PNG)

## Installation 
To run this application, first clone the repo with the following command:

`git clone https://github.com/cahillaw/ZipCodeWeatherLookup.git`

Next, navigate into the application:

`cd ZipCodeWeatherLookup`

Finally, you will need to add your OpenWeatherMap API key to the `api_key` field in the `settings.json` in the `src` directory. To get an API key, sign up and register an API key at OpenWeatherMap [here](https://home.openweathermap.org/users/sign_up).

Once you have cloned the repo, use `npm install` to install the needed dependencies, and then use `npm start` to start the application. 

## Testing

To run the unit tests, use `npm test`. Tests related to the ZipLookup functionality are found in `src/pages/ziplookup/ziplookup.test.js`, and tests related to the general application are found in `App.test.js`

## Documentation

The main application functionality is located in the `src/pages/ziplookup` folder. If more pages are added, parallel folders can be added named after each page. The ziplookup folder contains a few files: the react component for the page `ziplookup.js`, styling for that component in `zipLookupStyle.js`, functions needed for the page `zipLookupFunctions`, and unit tests related to the functions in `ziplookup.test.js`. In future, tests can be added related to the rendering of the component, which will also be located in `ziplookup.test.js`.

Settings related to the application are found in `src/settings.json`. Currently the only setting is `api_key`, however future releases may add other settings that can be added.

