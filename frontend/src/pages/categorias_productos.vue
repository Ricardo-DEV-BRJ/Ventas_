<template>
    <v-card-item>
        <v-card>
            <v-tabs v-model="tab" bg-color="primary">
                <v-tab value="categorias">Categorías</v-tab>
                <v-tab value="productos">Productos</v-tab>
            </v-tabs>
            <v-card-item>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="categorias">
                        <Panel_accion :store="categoriasStore" />
                        <DataTable :store="categoriasStore" />
                        <FormAdd :store="categoriasStore" />
                    </v-tabs-window-item>

                    <v-tabs-window-item value="productos">
                        <Panel_accion :store="productosStore" />
                        <DataTable :store="productosStore" />
                        <FormAdd :store="productosStore" />
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-item>
        </v-card>
    </v-card-item>



    <DataTableInfo :store="productosStore" />
    <Aviso :store="categoriasStore" />
    <Aviso :store="productosStore" />
</template>

<script setup>
import { useCategoriasStore } from '@/stores/categorias';
import { useProductosStore } from '@/stores/productos';
import { useProveedoresStore } from '@/stores/proveedores';
const categoriasStore = useCategoriasStore()
const productosStore = useProductosStore()
const proveedorStore = useProveedoresStore()


onMounted(async () => {
    await categoriasStore.get()
    await proveedorStore.get()
    productosStore.items_cat = categoriasStore.items.map(cat => ({
        value: cat.id_cat,
        title: cat.nom_cat
    }))
    productosStore.items_prov = proveedorStore.items.filter(prov => prov.vig_prov !== false)
        .map(prov => ({
            value: prov.id_prov,
            title: prov.nom_prov
        }));
    await productosStore.get()

})

watch(
    () => categoriasStore.items, (newVal) => {
        if (newVal) {
            productosStore.items_cat = categoriasStore.items.map(cat => ({
                value: cat.id_cat,
                title: cat.nom_cat
            }))
        }
    }
)

const tab = ref(null)
</script>