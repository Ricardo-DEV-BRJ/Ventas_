<template>
    <div>
        <v-card-item>
            <v-row justify="center" class="pa-4">
                <v-col cols="12" md="10">
                    <v-card>
                        <v-card-title class="pa-4 d-flex justify-space-between align-sm-center flex-column flex-sm-row">
                            <v-card-title class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                Registro de una nueva venta
                                <v-card-subtitle>
                                    Complete la información para registrar la venta
                                </v-card-subtitle>
                            </v-card-title>
                        </v-card-title>
                    </v-card>
                </v-col>

                <v-col cols="12" md="10">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-card class="pa-4">
                                <v-card-title
                                    class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                    <v-icon>
                                        mdi-account
                                    </v-icon>
                                    Información del Cliente
                                </v-card-title>

                                <v-card-item>
                                    <v-autocomplete v-model="cliente_select" label="Buscar cliente existente"
                                        variant="underlined" :items="clientes_items" item-title="iden"
                                        item-value="id_cli" return-object="" autocomplete="off">
                                    </v-autocomplete>

                                    <v-divider></v-divider>

                                    <v-form :disabled="selected">
                                        <v-text-field v-model="venta.data.nom_cli" label="Nombre" variant="underlined" type="text"
                                            autocomplete="off">
                                        </v-text-field>
                                        <v-text-field v-model="venta.data.ape_cli" label="Apellido" variant="underlined" type="text"
                                            autocomplete="off">
                                        </v-text-field>
                                        <v-row>
                                            <v-col cols="4" sm="3">
                                                <v-select v-model="venta.data.iden" label="Tipo" variant="underlined"
                                                    :items="constantes.indentificacion">
                                                </v-select>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="venta.data.iden_number" label="Identificación" variant="underlined">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4" sm="3">
                                                <v-select v-model="venta.data.tel" label="Codigo" variant="underlined"
                                                    :items="constantes.codigos">
                                                </v-select>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="venta.data.tel_num" label="Teléfono" variant="underlined" type="number"
                                                    min="1">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field v-model="venta.data.email" label="Correo" variant="underlined" autocomplete="off">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-select v-model="venta.data.type_email" label="@Example" variant="underlined"
                                                    :items="constantes.correos">
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                    </v-form>

                                </v-card-item>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-item>
    </div>
</template>

<script setup>
import { useAgregarVentaStore } from '@/stores/agregar_venta';
import { useClientesStore } from '@/stores/clientes';
import { constantes } from '@/utils/constantes';
const clientes = useClientesStore()
const venta = useAgregarVentaStore()

const cliente_select = ref(null)
const selected = ref(null)
const clientes_items = computed(() => {
    return [
        { id_cli: null, iden: '' },
        ...clientes.items
    ]
})
onMounted(async () => {
    await clientes.get()
})

watch(
    () => cliente_select.value, async (newVal) => {

        if (newVal.id_cli === null) {
            selected.value = null
            venta.clear()

        } else {
            venta.clientes_exi(cliente_select.value)
            selected.value = true
        }
    }
)


</script>