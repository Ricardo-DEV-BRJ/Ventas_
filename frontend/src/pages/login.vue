<template>
    <v-main style="height: 95vh;" class="d-flex justify-center align-center back">
        <v-col cols="11" sm="8" md="5" lg="3">
            <v-card title="Bienvenidos">
                <v-form v-model="valid">
                    <v-container>
                        <v-text-field v-model="loginStore.data.usuario" :rules="[rules.required, rules.empty]"
                            label="Usuario" type="text" autocomplete="off" variant="underlined"></v-text-field>
                        <v-text-field v-model="loginStore.data.clave" :rules="[rules.required, rules.empty]"
                            label="Contraseña" type="password" autocomplete="off" @keyup.enter="loginStore.login"
                            variant="underlined"></v-text-field>
                        <v-btn :loading="loginStore.loading" color="primary" class="w-100 text-capitalize"
                            @click="loginStore.login">
                            Ingresar
                        </v-btn>
                    </v-container>
                </v-form>
            </v-card>
        </v-col>
    </v-main>

</template>

<script setup>
import { useLoginStore } from '@/stores/login'
const loginStore = useLoginStore()
const valid = ref(false)
const rules = {
    required: value => !!value || 'Campo requerido',
    empty: value => value.trim() !== '' || 'Campo vacío'
}

</script>

<style scoped>
.back {
    background-color: #1366FF;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%233f7df0' points='800 100 0 200 0 800 1600 800 1600 200'/%3E%3Cpolygon fill='%236693e6' points='800 200 0 400 0 800 1600 800 1600 400'/%3E%3Cpolygon fill='%238aa8df' points='800 300 0 600 0 800 1600 800 1600 600'/%3E%3Cpolygon fill='%23a9bbdd' points='1600 800 800 400 0 800'/%3E%3Cpolygon fill='%23c4cdde' points='1280 800 800 500 320 800'/%3E%3Cpolygon fill='%23dbdee4' points='533.3 800 1066.7 800 800 600'/%3E%3Cpolygon fill='%23EEE' points='684.1 800 914.3 800 800 700'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

</style>