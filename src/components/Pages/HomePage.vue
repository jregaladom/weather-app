<template>
    <div class="flex flex-col items-center justify-center m-7">
        <CityWeather :is-current-location="true" />
    </div>
</template>
<script setup>
import CityWeather from '@/components/Widgets/CityWeather.vue'
</script>