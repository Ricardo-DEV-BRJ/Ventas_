<template>
    <v-card class="pa-4">
        <template v-slot:text>
            <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" variant="underlined"
                hide-details single-line></v-text-field>
        </template>
        <v-data-table :headers="headers" :items="items" :search="search" :loading="props.store.loading"
            :mobile="$vuetify.display.mobile && store.section != 'Productos'" itemsPerPageText="Elementos"
            loading-text="Cargando...Por Favor espere." class="border-thin rounded-lg">
            <template v-slot:item.actions="{ item }">
                <div :class="store.section === 'Productos' ? 'actions' : ''">
                    <v-btn color="primary" title="Editar" icon="mdi-pencil" @click="store.edit_item(item)"
                        variant="text"></v-btn>
                    <v-btn color="error" title="Eliminar" icon="mdi-delete" @click="delete_item(item)"
                        variant="text"></v-btn>

                </div>
            </template>
            <template v-slot:item.vig_prov="{ item }">
                <div>
                    <v-chip :color="item.vig_prov ? 'green' : 'red'" :text="item.vig_prov ? 'Activo' : 'Inactivo'"
                        class="text-uppercase" size="small" label></v-chip>
                </div>
            </template>
            <template v-slot:item.info="{ item }">
                <div>
                    <v-btn icon="mdi-ballot" color="info" title="Ver detalles"
                        @click="store.get_detalle(item), store.prod = item.nom_prod"></v-btn>
                </div>
            </template>
            <template v-slot:item.total_existencia="{ item }">
                <div>
                    <v-btn color="primary" title="Agregar" icon="mdi-plus-thick" @click="store.add_item(item)"
                        variant="text"></v-btn>
                    <v-chip :color="item.total_existencia > 20 ? 'green' : 'red'"
                        class="text-uppercase text-sm-subtitle-1 text-caption" size="large" label>
                        {{ item.total_existencia }}
                    </v-chip>
                </div>
            </template>
            <template v-slot:item.precio="{ item }">
                <div class="chip">
                    <v-card-item class="pl-0 pr-0">
                        <v-chip color="primary" class="text-caption text-sm-h7">
                            Bs. {{ decimal(item.precio_bs) }}
                        </v-chip>
                    </v-card-item>
                    <v-card-item class="pl-0 pr-0">
                        <v-chip color="primary" class="text-caption text-sm-h7">
                            $ {{ decimal(item.precio_dolar) }}
                        </v-chip>
                    </v-card-item>

                </div>
            </template>
            <template v-slot:item.monto="{ item }">
                <div>
                    <v-card-item class="pl-0 pr-0">
                        <v-chip color="primary">
                            Bs. {{ decimal(item.monto_bs) }}
                        </v-chip>
                    </v-card-item>
                    <v-card-item class="pl-0 pr-0">
                        <v-chip color="primary">
                            $ {{ decimal(item.monto_dolar) }}
                        </v-chip>
                    </v-card-item>

                </div>
            </template>
            <template v-slot:item.detalle="{ item }">
                <div>
                    <v-btn color="primary" title="Detalle" icon="mdi-shopping-search-outline" @click="store.get_detalle(item)"
                        variant="text"></v-btn>
                </div>
            </template>
        </v-data-table>
    </v-card>

    <v-dialog v-model="dialogOpen" :width="$vuetify.display.smAndDown ? '100%' : '90%'" scrollable>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4" class="pa-0 pa-sm-4">
                <v-card title="Confirmar" text="¿Desea eliminar este elemento?">
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cancelar" rounded color="primary" @click="cancel"></v-btn>
                        <v-btn text="Confirmar" rounded color="error" @click="store.delete_item(data_delete)"
                            :loading="store.loading_delete"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    store: { type: Object, required: true }
})
const dialogOpen = ref(false)
const headers = computed(() => props.store.headers)
const items = computed(() => props.store.items)
const search = ref('');
const data_delete = ref({})

function delete_item(item) {
    dialogOpen.value = true
    data_delete.value = item
}

function cancel() {
    dialogOpen.value = false
    data_delete.value = {}
}

function decimal(monto) {
    return monto.toFixed(2)
}

watch(
    () => props.store.delete_success, (newVal) => {
        if (newVal == false) {
            dialogOpen.value = false
            data_delete.value = {}
        }
    }
)

</script>


<style scoped>
@media screen and (max-width:1024px) {
    .chip {
        width: 150px;
    }

    .actions {
        width: 100px;
    }
}
</style>