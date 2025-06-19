<template>

    <v-col cols="12" sm="8" md="5" lg="3" class="position-absolute flotar">
        <v-expand-transition>
            <v-card v-show="alert" color="success" title="Inicio éxitoso" prepend-icon="mdi-check-decagram-outline">
                <v-card-item class="pt-0">
                    {{ `Bienvenido ${user}` }}
                </v-card-item>
                <v-card-actions class="justify-end">
                    <v-btn @click="alert = false">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </v-expand-transition>

    </v-col>
</template>

<script setup>
import { getPersonUsuario } from '@/utils/authdecode';
const user = getPersonUsuario()
const props = defineProps({
    alert: { type: Boolean },
})
const alert = ref(props.alert)

</script>

<style scoped>
.flotar {
    z-index: 9999999;
}
</style>