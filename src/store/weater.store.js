import { defineStore } from 'pinia'
const STORE_NAME = 'weather'

export const useWeaterStore = defineStore(STORE_NAME, {
    state: () => ({
        city: 'Unknown',
        weather: {
            current: {
                temp_c: 0,
                condition: {
                    text: 'Unknown',
                }
            },
            forecast: {
                forecastday: [{
                    day: {
                        avgtemp_c: 0,
                        condition: {
                            text: 'Unknown',
                        },
                        mintemp_c: 0,
                        maxtemp_c: 0
                    }
                }]
            }
        }

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