import axios from "axios";

const nominatim = axios.create({
    baseURL: "https://nominatim.openstreetmap.org",
    timeout: 1000,
});

const nominatimService = {

};

nominatimService.getLocationByLatLng = function ({ latitude, longitude }) {
    return nominatim.get(`reverse?format=json&lat=${latitude}2&lon=${longitude}&zoom=18&addressdetails=1`).then((response) => {
        return response.data;
    });
};



export default nominatimService;