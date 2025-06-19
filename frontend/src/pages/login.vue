<template>
    <v-main style="height: 100vh;" class="d-flex justify-center align-center">
        <v-col cols="3">
            <v-card title="Bienvenidos">
                <v-form v-model="valid">
                    <v-container>
                        <v-text-field v-model="loginStore.data.usuario" :rules="[rules.required]" label="Usuario" type="text"
                            autocomplete="off"></v-text-field>
                        <v-text-field v-model="loginStore.data.clave" :rules="[rules.required]" label="Contraseña"
                            type="password" autocomplete="off"></v-text-field>
                        <v-btn :loading="loading" color="primary" class="w-100 text-capitalize" @click="loginStore.login">
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
const loading = ref(false)
const rules = {
    required: value => !!value || 'Campo requerido',
}

</script>