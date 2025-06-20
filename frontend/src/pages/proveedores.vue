<template>
    <v-card-item>
        <Panel_accion :store="proveedoresStore" />
        <DataTable :store="proveedoresStore" />
        <FormAdd :store="proveedoresStore" />
    </v-card-item>
    <Aviso :store="proveedoresStore" />
</template>

<script setup>
import { useProveedoresStore } from '@/stores/proveedores';
const proveedoresStore = useProveedoresStore()
</script>