<template>
    <v-card-item>
        <Panel_accion :store="ventasStore" />
        <DataTable :store="ventasStore" />
        <FormAdd :store="ventasStore" />
    </v-card-item>
    <Aviso :store="ventasStore" />
</template>

<script setup>
import { useVentasStore } from '@/stores/ventas';



const ventasStore = useVentasStore()
</script>