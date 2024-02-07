<template>
    <div>
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white" v-if="isCurrent">
            Current Location
        </h1>
    </div>
    <div>
        <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-white">
            {{ city }}
        </h1>
    </div>
    <div>
        <h1 class="mb-4 text-6xl font-extrabold leading-none tracking-tight text-white">
            {{ currentTemperature }}</h1>
    </div>
    <div>
        <h1 class="mb-4 text-sm font-medium leading-none tracking-tight text-white">
            Maximum:{{ temperature_2m_max }}° Minimum:{{ temperature_2m_min }}°
        </h1>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import getCurrentPosition from '@utils/geolocation'
import nominatimService from '@services/nominatim.service'
import openMeteoService from '@services/open-meteo.service'
import { useWeaterStore } from '@store/weater.store.js'
import { computed, ref } from 'vue'

const props = defineProps(['isCurrentLocation'])
const isCurrentLocation = props.isCurrentLocation;
console.log(isCurrentLocation)

const canLoad = ref(true);
// Obtiene el store de weather
const weatherStore = useWeaterStore()

// Obtiene el valor de city  del store
const city = computed(() => weatherStore.city)
const isCurrent = computed(() => isCurrentLocation)
const currentTemperature = computed(() => `${weatherStore.weather.current.temperature_2m}°`)
const temperature_2m_max = computed(() => weatherStore.weather.daily.temperature_2m_max[0])
const temperature_2m_min = computed(() => weatherStore.weather.daily.temperature_2m_min[0])

// Ejecuta la función cuando el componente se monta
onMounted(async () => {
    //Obtiene la ubicación actual del usuario
    const geolocation = await getCurrentPosition()
        .then(position => position)
        .catch(error => error)

    // Si el código es 1, significa que no se pudo obtener la ubicación
    if (geolocation.code === 1) {
        console.log('No se pudo obtener la ubicación')

    } else {
        // Si el código es 0, significa que se obtuvo la ubicación
        nominatimService.getLocationByLatLng(geolocation.coords).then(response => {
            weatherStore.setCity(response.address.city)

            openMeteoService.getForecastByLatLng(geolocation.coords).then(response => {
                weatherStore.setWeather(response)
                console.log(response)
            }).catch(error => {
                console.log(error)
            });
        }).catch(error => {
            console.log(error)
            canLoad.value = false
        });
    }


})


</script>