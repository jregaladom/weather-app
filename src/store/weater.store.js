import { defineStore } from 'pinia'
const STORE_NAME = 'weather'

export const useWeaterStore = defineStore(STORE_NAME, {
    state: () => ({
        city: 'Unknown',
        weather: {
            current: {
                temperature_2m: 0,
            },
        },

    }),
    getters: {
        getCity() {
            return this.city
        }
    },
    actions: {
        setCity(city) {
            this.city = city
        },
        setWeather(weather) {
            this.weather = weather;
        },
    },
})