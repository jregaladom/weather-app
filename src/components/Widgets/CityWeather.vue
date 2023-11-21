<template>
  <div>
    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black">
      {{ city }}
    </h1>
  </div>
  <div>
    <h1 class="mb-4 text-7xl font-extrabold leading-none tracking-tight text-black">
      {{ currentTemperature }}
    </h1>
  </div>
  <div>
    <p class="mb-4 text-1xl font-extrabold leading-none tracking-tight text-black">
      {{ currentCondition }}
    </p>
  </div>
  <div class="flex flex-row">
    <p class="mb-4 text-1xl font-extrabold leading-none tracking-tight text-black m-1">
      Maximum {{ maxTemperature }}
    </p>
    <p class="mb-4 text-1xl font-extrabold leading-none tracking-tight text-black m-1">
      Minimum {{ minTemperature }}
    </p>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import getCurrentPosition from '@utils/geolocation'
import nominatimService from '@services/nominatim.service'
import weatherService from '@services/weather.service'
import { useWeaterStore } from '@store/weater.store.js'
import { computed, ref } from 'vue'

const canLoad = ref(true)
// Obtiene el store de weather
const weatherStore = useWeaterStore()

// Obtiene el valor de city  del store
const city = computed(() => weatherStore.city)

const currentTemperature = computed(() => `${weatherStore.weather.current.temp_c}°`)
const currentCondition = computed(() => `${weatherStore.weather.current.condition.text}`)
const minTemperature = computed(
  () => `${weatherStore.weather.forecast.forecastday[0].day.mintemp_c}°`
)
const maxTemperature = computed(
  () => `${weatherStore.weather.forecast.forecastday[0].day.maxtemp_c}°`
)

// Ejecuta la función cuando el componente se monta
onMounted(async () => {
  //Obtiene la ubicación actual del usuario
  const geolocation = await getCurrentPosition()
    .then((position) => position)
    .catch((error) => error)

  // Si el código es 1, significa que no se pudo obtener la ubicación
  if (geolocation.code === 1) {
    console.log('No se pudo obtener la ubicación')
  } else {
    // Si el código es 0, significa que se obtuvo la ubicación
    nominatimService
      .getLocationByLatLng(geolocation.coords)
      .then((response) => {
        weatherStore.setCity(response.address.city)

        weatherService
          .getForecastByLatLng(geolocation.coords)
          .then((response) => {
            console.log(response)
            weatherStore.setWeather(response)
            //canLoad.value = false
          })
          .catch((error) => {
            console.log(error)
            //canLoad.value = false
          })
      })
      .catch((error) => {
        console.log(error)
        canLoad.value = false
      })
  }
})
</script>
