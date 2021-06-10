export async function getWeatherByZip(zipCode, countryCode, apiKey) {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "," + countryCode + "&appid=" + apiKey);
    if (response.status === 200) {
        const data = await response.json()
        return {
            code: response.status,
            data: data
        }
    } else {
        let errorMessage = "Request failed, error code " + response.status
        if (response.status === 404) {
            errorMessage = "No " + countryCode + " Zip Code for " + zipCode
          } else if (apiKey === "") {
            errorMessage = "No API key provided in settings.json"
          } else if (response.status === 401) {
            errorMessage = "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
          } 

          return {
              code: response.status,
              data: errorMessage
          }
    }

}
 

//Rounds to the nearest integer
export function kelvinToFahrenheit(tempKelvin) {
    return Math.round((tempKelvin - 273.15)*(9/5) + 32)
}