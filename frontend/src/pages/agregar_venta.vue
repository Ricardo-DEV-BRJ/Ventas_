<template>
    <div>
        <v-card-item>
            <v-row justify="center" class="pa-4">
                <v-col cols="12" md="11">
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

                <v-col cols="12" md="11">
                    <v-row>
                        <v-col cols="12" md="5" lg="4">
                            <v-card class="pa-4">
                                <v-card-title
                                    class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                    <v-icon>
                                        mdi-account
                                    </v-icon>
                                    Información del Cliente
                                </v-card-title>

                                <v-card-item class="pa-0">
                                    <v-autocomplete v-model="cliente_select" variant="underlined"
                                        :items="clientes_items" item-title="iden" item-value="id_cli" return-object
                                        autocomplete="off" label=" Buscar cliente existente"
                                        no-data-text="No se encontraron clientes">
                                    </v-autocomplete>

                                    <v-divider></v-divider>

                                    <v-form :disabled="selected">
                                        <v-text-field v-model="venta.data.nom_cli" label="Nombre" variant="underlined"
                                            type="text" autocomplete="off">
                                        </v-text-field>
                                        <v-text-field v-model="venta.data.ape_cli" label="Apellido" variant="underlined"
                                            type="text" autocomplete="off">
                                        </v-text-field>
                                        <v-row>
                                            <v-col cols="5" md="5" lg="4">
                                                <v-select v-model="venta.data.iden" label="Tipo" variant="underlined"
                                                    :items="constantes.indentificacion">
                                                </v-select>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="venta.data.iden_number" label="Identificación"
                                                    variant="underlined">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" md="5" lg="4">
                                                <v-select v-model="venta.data.tel" label="Codigo" variant="underlined"
                                                    :items="constantes.codigos">
                                                </v-select>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="venta.data.tel_num" label="Teléfono"
                                                    variant="underlined" type="number" min="1">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field v-model="venta.data.email" label="Correo"
                                                    variant="underlined" autocomplete="off">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-select v-model="venta.data.type_email" label="@Example"
                                                    variant="underlined" :items="constantes.correos">
                                                </v-select>
                                            </v-col>
                                        </v-row>
                                    </v-form>

                                </v-card-item>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="7" lg="8">
                            <v-card class="pa-4">
                                <v-card-title
                                    class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                    <v-icon>
                                        mdi-package-variant
                                    </v-icon>
                                    Agregar Productos
                                </v-card-title>
                                <v-row>
                                    <v-col cols="12" sm="4">
                                        <v-autocomplete v-model="producto_select" label="Nombre del producto"
                                            variant="underlined" :items="productos_items" item-title="nom_prod"
                                            item-value="id_prod" return-object autocomplete="off">
                                            <template v-slot:item="{ props, item }">
                                                <v-list-item v-bind="props"
                                                    :subtitle="`${item.raw?.nom_prov ? item.raw?.nom_prov : ''} ${item.raw?.nom_cat ? `, Categorías:${item.raw?.nom_cat}` : ''}`"
                                                    :title="item.raw?.nom_prod">
                                                </v-list-item>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" lg="8">
                                        <v-form>
                                            <v-row align="center">
                                                <v-col cols="12" sm="6">
                                                    <v-text-field v-if="!venta.producto.prec_uni_bs" label="Precio"
                                                        variant="underlined" type="number" min="1" readonly outlined>
                                                    </v-text-field>
                                                    <v-text-field v-else label="Precio unitario" readonly
                                                        variant="underlined">
                                                        <template v-slot:append-inner>
                                                            <div class="d-flex align-center ga-2">
                                                                <v-chip color="primary">
                                                                    Bs. {{ venta.producto.prec_uni_bs }}
                                                                </v-chip>
                                                                <v-chip color="primary">
                                                                    $ {{ venta.producto.prec_uni_dolar }}
                                                                </v-chip>
                                                            </div>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <v-text-field v-model="venta.producto.cantidad" label="Cantidad"
                                                        variant="underlined" type="number" min="1">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-col>
                                </v-row>
                                <v-col cols="12" sm="6" md="4" lg="2" class="pl-0 pr-0">
                                    <v-text-field v-model="tasa" label="Tasa" variant="underlined" type="number" min="1">
                                    </v-text-field>
                                </v-col>
                                <v-card-actions class="d-flex justify-end">
                                    <v-btn v-if="edit" icon="mdi-cart-plus" color="green" title="Agregar producto"
                                        @click="addProduct">
                                    </v-btn>
                                    <v-btn v-else icon="mdi-update" color="info" title="Actualizar producto"
                                        @click="add_prod_edit">
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                            <br>
                            <v-card class="pa-4">
                                <v-data-table :headers="headers" :items="venta.lista" hide-default-footer>
                                    <template v-slot:item.precio="{ item }">
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
                                                    Bs. {{ decimal(item.monto_prod_bs) }}
                                                </v-chip>
                                            </v-card-item>
                                            <v-card-item class="pl-0 pr-0">
                                                <v-chip color="primary">
                                                    $ {{ decimal(item.monto_prod_dolar) }}
                                                </v-chip>
                                            </v-card-item>

                                        </div>
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <v-btn icon="mdi-delete" color="red" variant="text" title="Eliminar item"
                                            @click="delte_item(item)">
                                        </v-btn>
                                        <v-btn icon="mdi-pencil" color="info" variant="text" title="Editar item"
                                            @click="edit_item(item)">
                                        </v-btn>
                                    </template>
                                </v-data-table>
                                <v-divider></v-divider>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-card-item title="Sub total" class="color">
                                            </v-card-item>
                                        </v-col>
                                        <v-col cols="6" class="d-flex justify-end">
                                            <v-card-item :title="`Bs.${subtotal(venta.lista)}`">
                                            </v-card-item>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-divider></v-divider>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-card-item title="IVA" class="color">
                                            </v-card-item>
                                        </v-col>
                                        <v-col cols="6" class="d-flex justify-end">
                                            <v-card-item :title="`Bs.${iva(venta.lista)}`">
                                            </v-card-item>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-divider></v-divider>

                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-card-item title="Total" class="color">
                                            </v-card-item>
                                        </v-col>
                                        <v-col cols="6" class="d-flex justify-end">
                                            <v-card-item class="text-green">
                                                <v-card-title>
                                                    Bs.{{ total(venta.lista) }}
                                                </v-card-title>
                                            </v-card-item>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-divider></v-divider>

                            </v-card>

                            <br>
                            <v-card class="pa-4">
                                <v-card-title
                                    class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                    <v-icon>
                                        mdi-note-outline
                                    </v-icon>
                                    Observaciones
                                </v-card-title>
                                <br>
                                <v-textarea label="Agregar observaciones sobre la venta"
                                    variant="solo-filled"></v-textarea>
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
import { useProductosStore } from '@/stores/productos';
import { constantes } from '@/utils/constantes';
const clientes = useClientesStore()
const venta = useAgregarVentaStore()
const productos = useProductosStore()
const edit = ref(true)
const cliente_select = ref(undefined)
const producto_select = ref(undefined)
const selected = ref(null)
const selected_prod = ref(null)
const clientes_items = computed(() => {
    return [
        undefined,
        ...clientes.items
    ]
})
const productos_items = computed(() => {
    return [
        undefined,
        ...productos.items
    ]
})
const headers = ref([
    { key: 'nom_prod', title: 'Producto' },
    { key: 'precio', title: 'Precio Unitario' },
    { key: 'cantidad', title: 'Cantidad' },
    { key: 'monto', title: 'Monto' },
    { key: 'actions', title: 'Acciones' },
])

const addProduct = () => {
    venta.montos();
    producto_select.value = undefined;
}


function decimal(monto) {
    return monto.toFixed(2)
}
function precio(monto) {
    const total = (monto / 1.16)
    return parseFloat(total.toFixed(2))
}

function edit_item(item) {
    const data = [item].map((prod) => ({
        id_prod: prod.id_prod,
        nom_prod: prod.nom_prod,
        precio_bs: parseFloat(prod.prec_uni_bs) * 1.16,
        precio_dolar: parseFloat(prod.prec_uni_dolar) * 1.16,
        index: prod.index
    }))
    producto_select.value = data[0]
    console.log(producto_select.value)
    edit.value = false
}

function add_prod_edit() {
    const found = venta.lista.findIndex(element => element.index === producto_select.value.index)
    if (found !== -1) {
        venta.montos_edit(found);
    }
    producto_select.value = undefined;
    edit.value = true
}

function subtotal(array) {
    let subtotal = 0;
    for (const producto of array) {
        console.log(producto.monto_prod_bs)
        const monto = precio(producto.monto_prod_bs)
        subtotal = subtotal + monto
    }
    return subtotal.toFixed(2)
}
function iva(array) {
    const monto = subtotal(array)
    const iva = monto * 0.16
    return iva.toFixed(2);
}
function total(array) {
    const monto_subtotal = subtotal(array)
    const monto_iva = iva(array)
    const resultado = parseFloat(monto_subtotal) + parseFloat(monto_iva)
    return resultado.toFixed(2)
}

onMounted(async () => {
    await clientes.get()
    await productos.get()
})

watch(
    () => producto_select.value, async (newVal) => {
        if (!newVal || newVal.id_prod === null || newVal.id_prod === '') {
            selected_prod.value = null
            venta.clear_prod()
        } else {
            venta.producto_exi(newVal)
            selected_prod.value = true
        }
    }
)

watch(
    () => cliente_select.value, async (newVal) => {
        if (!newVal || newVal.id_cli === null || newVal.id_cli === '') {
            selected.value = null
            venta.clear()
        } else {
            venta.clientes_exi(newVal)
            selected.value = true
        }
    }
)


</script>

<style scoped>
.chip {
    width: 180px;
}

.color {
    color: rgb(var(--v-theme-primary));
}

@media screen and (max-width:1024px) {}
</style>