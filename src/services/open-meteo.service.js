import axios from "axios";

const openMeteo = axios.create({
    baseURL: "https://api.open-meteo.com/",
    timeout: 1000,
});

const openMeteoService = {

};

openMeteoService.getForecastByLatLng = function ({ latitude, longitude }) {
    return openMeteo.get(`v1/forecast?latitude=${latitude}&longitude=${longitude}&current=is_day,temperature_2m&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,visibility,uv_index,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,uv_index_max`).then((response) => {
        return response.data;
    });
};



export default openMeteoService;