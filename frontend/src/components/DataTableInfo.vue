<template>
    <v-dialog v-model="store.dialogOpenInfo" :width="$vuetify.display.smAndDown ? '100%' : '90%'" scrollable persistent>
        <v-card class="pa-4">
            <v-card-title class="d-flex align-center justify-space-between"> 
                {{ store.prod }}
                <v-btn icon="mdi-close" color="red" variant="text" @click="store.dialogOpenInfo = false"></v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="items" :search="search" :loading="props.store.loading_info"
                :mobile="$vuetify.display.mobile" itemsPerPageText="Elementos"
                loading-text="Cargando...Por Favor espere." class="border-thin rounded-lg">
                <template v-slot:item.actions="{ item }">
                    <div>
                        <v-btn color="primary" title="Editar" icon="mdi-pencil" @click="store.edit_item_info(item)"
                            variant="text"></v-btn>
                        <v-btn color="error" title="Eliminar" icon="mdi-delete" @click="delete_item(item)"
                            variant="text"></v-btn>
                    </div>
                </template>
                <template v-slot:item.precio="{ item }">
                    <div class="chip">
                        <v-card-item class="pl-0 pr-0">
                            <v-chip color="primary" class="text-caption text-sm-h7">
                                Bs. {{ decimal(item.prec_uni_bs) }}
                            </v-chip>
                        </v-card-item>
                        <v-card-item class="pl-0 pr-0">
                            <v-chip color="primary" class="text-caption text-sm-h7">
                                $ {{ decimal(item.prec_uni_dolar) }}
                            </v-chip>
                        </v-card-item>

                    </div>
                </template>
            </v-data-table>
        </v-card>
    </v-dialog>


    <v-dialog v-model="dialogOpenInfo" :width="$vuetify.display.smAndDown ? '100%' : '90%'" scrollable>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4" class="pa-0 pa-sm-4">
                <v-card title="Confirmar" text="¿Desea eliminar este elemento?">
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cancelar" rounded color="primary" @click="cancel"></v-btn>
                        <v-btn text="Confirmar" rounded color="error" @click="store.delete_item_info(data_delete)"
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
const dialogOpenInfo = ref(false)
const headers = computed(() => props.store.headers_info)
const items = computed(() => props.store.items_info)
const search = ref('');
const data_delete = ref({})

function delete_item(item) {
    dialogOpenInfo.value = true
    data_delete.value = item
}

function cancel() {
    dialogOpenInfo.value = false
    data_delete.value = {}
}

function decimal(monto) {
    return monto.toFixed(2)
}


watch(
    () => props.store.delete_success_info, (newVal) => {
        if (newVal == false) {
            dialogOpenInfo.value = false
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