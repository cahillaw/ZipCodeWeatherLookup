import { getWeatherByZip, kelvinToFahrenheit } from "./zipLookupFunctions"

const SETTINGS = require("../../settings.json");

test("Converts 300 K to F correctly (80F)", () => {
    let result = kelvinToFahrenheit(300)
    expect(result).toEqual(80) 
})

test("Converts 0 K to F correctly (-460F)", () => {
    let result = kelvinToFahrenheit(0)
    expect(result).toEqual(-460) 
})

test("98501 returns status code of 200", async () => {
    fetch.mockResolvedValueOnce({json:() => ({"coord":{"lon":-122.8763,"lat":47.0129},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":291.87,"feels_like":291,"temp_min":289.19,"temp_max":294.49,"pressure":1017,"humidity":46},"visibility":10000,"wind":{"speed":0.89,"deg":253,"gust":2.24},"clouds":{"all":74},"dt":1623275947,"sys":{"type":2,"id":2006008,"country":"US","sunrise":1623241005,"sunset":1623297910},"timezone":-25200,"id":0,"name":"Olympia","cod":200}), status: 200})

    let result = await getWeatherByZip(98501, "US", SETTINGS.api_key)
    expect(result.code).toEqual(200)
})

test("98501 returns weather info for Olympia", async () => {
    let code = 200
    fetch.mockResolvedValueOnce({json:() => ({"coord":{"lon":-122.8763,"lat":47.0129},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":291.87,"feels_like":291,"temp_min":289.19,"temp_max":294.49,"pressure":1017,"humidity":46},"visibility":10000,"wind":{"speed":0.89,"deg":253,"gust":2.24},"clouds":{"all":74},"dt":1623275947,"sys":{"type":2,"id":2006008,"country":"US","sunrise":1623241005,"sunset":1623297910},"timezone":-25200,"id":0,"name":"Olympia","cod":200}), status: code})

    let result = await getWeatherByZip(98501, "US", SETTINGS.api_key)
    expect(result.data.name).toEqual("Olympia")
})

test("99999 returns 404", async () => {
    let errorCode = 404
    fetch.mockResolvedValueOnce({status: errorCode})
    let result = await getWeatherByZip(99999, "US", SETTINGS.api_key)
    expect(result.code).toEqual(errorCode)
})

test("99999 returns correct error message", async () => {
    let errorCode = 404
    fetch.mockResolvedValueOnce({status: errorCode})
    let result = await getWeatherByZip(99999, "US", SETTINGS.api_key)
    expect(result.data).toEqual("No US Zip Code for 99999")
})

test("No API key returns correct message", async () => {
    let errorCode = 401
    fetch.mockResolvedValueOnce({status: errorCode})
    let result = await getWeatherByZip(98501, "US", "")
    expect(result.data).toEqual("No API key provided in settings.json")
})

test("Invalid API key returns correct message", async () => {
    let errorCode = 401
    fetch.mockResolvedValueOnce({status: errorCode})
    let result = await getWeatherByZip(98501, "US", "invalidapikey")
    expect(result.data).toEqual("Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.")
})

test("Non-specified error returns correct message", async () => {
    let errorCode = 403
    fetch.mockResolvedValueOnce({status: errorCode})
    let result = await getWeatherByZip(98501, "US", SETTINGS.api_key)
    expect(result.data).toEqual("Request failed, error code " + errorCode)
})