<template>
    <Back_button />
    <div v-if="id">
        <v-card-item v-if="detalle.items.length > 0">
            <v-row justify="center" class="pa-4">
                <v-col cols="12" md="10">
                    <v-card>
                        <v-card-title class="pa-4 d-flex justify-space-between align-sm-center flex-column flex-sm-row">
                            <div class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                {{ `Detalle de Venta ${detalle.items[0].num_fac}` }}
                                <v-card-subtitle>
                                    {{ `Fecha: ${detalle.items[0].fec_ven}` }}
                                </v-card-subtitle>
                            </div>
                            <div>
                                <v-chip color="green" prepend-icon="mdi-check-circle-outline">
                                    Completada
                                </v-chip>
                            </div>
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
                                <br>
                                <v-card-title class="text-subtitle-1">
                                    {{ detalle.items[0].nom_cli }} {{ detalle.items[0].ape_cli }}
                                    <v-card-subtitle>
                                        {{ detalle.items[0].iden }}
                                    </v-card-subtitle>
                                </v-card-title>

                                <v-divider></v-divider>
                                <br>
                                <v-card-item class="pa-0">
                                    <v-card-text class="pl-0 pr-0">
                                        <v-icon>
                                            mdi-email-outline
                                        </v-icon>
                                        {{ detalle.items[0].email }}
                                    </v-card-text>
                                    <v-card-text class="pl-0 pr-0">
                                        <v-icon>
                                            mdi-phone
                                        </v-icon>
                                        {{ detalle.items[0].tel_cli }}
                                    </v-card-text>
                                </v-card-item>
                            </v-card>
                            <br>
                            <v-card class="pa-4">
                                <v-card-title
                                    class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                    <v-icon>
                                        mdi-credit-card-chip
                                    </v-icon>
                                    Pago
                                </v-card-title> <br>

                                <v-card-title class="text-subtitle-1 text-md-h6 font-weight-bold text-pre-wrap">
                                    <v-icon color="info">
                                        mdi-information
                                    </v-icon>
                                    Detalle de Pago
                                </v-card-title>

                                <v-list v-for="(pago, index) in detalle.items_pag" :key="index">
                                    <v-divider></v-divider>
                                    <v-list-item>
                                        <strong>Metodo:</strong> {{ pago.metodo }}
                                    </v-list-item>
                                    <v-list-item v-if="pago.ref != 'Sin referencia'">
                                        <strong>Referencia:</strong> {{ pago.ref }}
                                    </v-list-item>
                                    <v-list-item>
                                        <strong>Moneda:</strong> {{ pago.moneda }}
                                    </v-list-item>
                                    <v-list-item>
                                        <strong>Monto:</strong> {{ pago.monto }}
                                    </v-list-item>
                                </v-list>
                                <br>
                                <v-divider></v-divider> <br>
                                <v-card-title class="text-subtitle-1 text-md-h6 font-weight-bold text-pre-wrap">
                                    <v-icon color="info">
                                        mdi-information
                                    </v-icon>
                                    Atendido por
                                </v-card-title>
                                <v-list>
                                    <v-list-item>
                                        <strong>Operador: </strong>{{ detalle.items[0].aten_por }}
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="8">
                            <v-card class="pa-4">
                                <v-card-title
                                    class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                    <v-icon>
                                        mdi-package-variant
                                    </v-icon>
                                    Productos vendidos
                                </v-card-title>
                                <v-data-table :headers="detalle.headers" :items="detalle.items_ven"
                                    :loading="detalle.loading" loading-text="Cargando...Por Favor espere."
                                    hide-default-footer>
                                    <template v-slot:item.prec_uni="{ item }">
                                        <div class="chip">
                                            <v-card-item class="pl-0 pr-0">
                                                <v-chip color="primary">
                                                    Bs. {{ decimal(item.prec_uni_bs) }}
                                                </v-chip>
                                            </v-card-item>
                                            <v-card-item class="pl-0 pr-0">
                                                <v-chip color="primary">
                                                    $ {{ decimal(item.prec_uni_dolar) }}
                                                </v-chip>
                                            </v-card-item>
                                        </div>
                                    </template>
                                    <template v-slot:item.monto="{ item }">
                                        <div class="chip">
                                            <v-card-item class="pl-0 pr-0">
                                                <v-chip color="primary">
                                                    Bs. {{ precio(item.monto_prod_bs) }}
                                                </v-chip>
                                            </v-card-item>
                                            <v-card-item class="pl-0 pr-0">
                                                <v-chip color="primary">
                                                    $ {{ precio(item.monto_prod_dolar) }}
                                                </v-chip>
                                            </v-card-item>
                                        </div>
                                    </template>
                                </v-data-table>
                                <v-divider></v-divider>
                                <v-card-text class="d-flex justify-space-between">
                                    <strong>Sub total</strong>
                                    Bs. {{ subTotal.toFixed(2) }}
                                </v-card-text>
                                <v-card-text class="d-flex justify-space-between">
                                    <strong>Descuento (%)</strong>
                                    0
                                </v-card-text>
                                <v-card-text class="d-flex justify-space-between">
                                    <strong>IVA (16%)</strong>
                                    Bs. {{ iva.toFixed(2) }}
                                </v-card-text>
                                <v-card-text class="d-flex align-start justify-space-between flex-nowrap ">
                                    <p class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold">Total:</p>
                                    <div>
                                        Bs. {{ parseFloat(subTotal.toFixed(2)) + parseFloat(iva.toFixed(2)) }} <br>
                                        $ {{ detalle.items[0].monto_dolar }}
                                    </div>
                                </v-card-text>
                            </v-card>
                            <br>
                            <v-card class="pa-4">
                                <v-card-title
                                    class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                    Observaciones
                                </v-card-title>
                                <v-card-text>
                                    {{ detalle.items[0].obs ? detalle.items[0].obs : 'Sin Observaciones' }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>

            </v-row>
        </v-card-item>

        <v-card-item v-else>
            <v-progress-circular indeterminate></v-progress-circular>
        </v-card-item>
    </div>
    <div v-else>
        <v-card-item>
            <v-main style="height: 90vh;" class="d-flex justify-center align-center">
                <v-col cols="11" sm="8" md="5" lg="3">
                    <v-card class="text-center pa-4">
                        <v-avatar color="error" size="71" icon="mdi-file-document-remove">
                        </v-avatar>
                        <v-card-title>
                            No hay información disponible
                        </v-card-title>
                        <v-card-text>
                            No se encontraron datos para mostrar en este momento.
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-main>
        </v-card-item>
    </div>

</template>

<script setup>
import { useDetalleVentaStore } from '@/stores/detalle_venta'

const detalle = useDetalleVentaStore()
const route = useRoute()
const id = ref(null)
const subTotal = ref(0)
const iva = ref(0)

onMounted(async () => {
    if (route.query.id_ven) {
        id.value = route.query.id_ven
        await detalle.get(id.value)
        subTotal_monto(detalle.items_ven)
        iva_monto(subTotal.value)
    }
})


function decimal(monto) {
    return monto.toFixed(2)
}
function precio(monto) {
    const total = (monto / 1.16)
    return parseFloat(total.toFixed(2))
}
function subTotal_monto(montos) {
    for (const monto of montos) {
        subTotal.value = subTotal.value + precio(monto.monto_prod_bs)
    }
}

function iva_monto(monto) {
    iva.value = monto * 0.16
}
</script>



<style scoped>
@media screen and (max-width:1024px) {
    .chip {
        width: 150px;
    }
}
</style>