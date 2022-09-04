import axios from "axios"

const apiKey = process.env.REACT_APP_WEATHER_API

export const weatherData = async () => {
    const params = {
        id : "1835847,1841610,1843125,1845106,1845105,1845789,1845788,1841597,1902028,1846265",
        appid : apiKey,
        lang : "kr",
        units : "metric"
    };
    const res = await axios.get("/api", {
        params
    });
    return res;
}