<template>
    <v-card>
        <template v-slot:text>
            <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" variant="underlined"
                hide-details single-line></v-text-field>
        </template>
        <v-data-table :headers="headers" :items="items" :search="search" :loading="props.store.loading"
            itemsPerPageText="Elementos" loading-text="Cargando...Por Favor espere." class="border-thin rounded-lg">
            <template v-slot:item.actions="{ item }">
                <td>
                    <v-btn color="primary" title="Editar" icon="mdi-pencil" variant="text"></v-btn>
                    <v-btn color="error" title="Eliminar" icon="mdi-delete" variant="text"></v-btn>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script setup>

const props = defineProps({
    store: { type: Object, required: true }
})
const headers = computed(() => props.store.headers)
const items = computed(() => props.store.items)
const search = ref('');


</script>