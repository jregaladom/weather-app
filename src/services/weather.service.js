import axios from "axios";

const weather = axios.create({
    baseURL: "https://weatherapi-com.p.rapidapi.com/",
    timeout: 1000,
});

const weatherService = {

};

weatherService.getForecastByLatLng = function ({ latitude, longitude }, days = 7) {
    const params = {
        q: `${latitude},${longitude}`,
        days: days
    }

    const headers = {
        'X-RapidAPI-Key': '3a162fc432mshbe8ae49cba2fd24p10855djsn5ed2e777bee5',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }

    const options = {
        params,
        headers

    }

    return weather.get(`forecast.json`, options).then((response) => {
        return response.data;
    });
};



export default weatherService;