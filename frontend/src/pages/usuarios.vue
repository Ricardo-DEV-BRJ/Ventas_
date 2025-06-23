<template>
    <v-card-item>
        <Panel_accion :store="usuariosStore" />
        <DataTable :store="usuariosStore" />
        <FormAdd :store="usuariosStore" />
    </v-card-item>
    <Aviso :store="usuariosStore" />
</template>

<script setup>
import { useUsuariosStore } from '@/stores/usuarios';


const usuariosStore = useUsuariosStore()
</script>