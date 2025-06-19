<template>
    <div class="position-fixed pa-4 right-0">
        <v-btn class="tema" :icon="theme.global.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            @click="change_theme">
        </v-btn>
    </div>
</template>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()

onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    theme.global.name.value = savedTheme
})

function change_theme() {
    theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.global.name.value)
}

</script>


<style scoped>
.tema {
    z-index: 9999999;
    right: 0;
}
</style>