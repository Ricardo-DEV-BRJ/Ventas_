<template>
    <v-card-item>
        <Panel_accion :store="clientesStore" />
        <DataTable :store="clientesStore" />
        <FormAdd :store="clientesStore" />
    </v-card-item>
    <Aviso :store="clientesStore"/>
</template>

<script setup>
import { useClientesStore } from '@/stores/clientes';
const clientesStore = useClientesStore()


</script>