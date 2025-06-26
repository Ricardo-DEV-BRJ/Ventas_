<template>

    <v-card-item class="pa-0 pa-sm-4">
        <v-card-item>
            <v-row justify="center">
                <v-col cols="12" md="11">
                    <v-card class="pa-4">
                        <v-row align="center" justify-md="space-between">
                            <v-col cols="12" md="8">
                                <v-card-title
                                    class=" d-flex justify-space-between align-sm-center flex-column flex-sm-row">
                                    <v-card-title
                                        class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                        Registro de una nueva venta
                                        <v-card-subtitle class="text-pre-wrap">
                                            Complete la información para registrar la venta
                                        </v-card-subtitle>
                                    </v-card-title>
                                </v-card-title>
                            </v-col>
                            <v-col cols="12" md="4" lg="2" align-self="center">
                                <v-select v-model="venta.obj.tip_factura" label="Tipo de factura" variant="underlined"
                                    :items="constantes.tip_fac">
                                </v-select>
                            </v-col>
                        </v-row>
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

                                    <v-form v-model="crear_cliente" :disabled="selected" @submit.prevent="send_form">
                                        <v-text-field v-model="venta.data.nom_cli" label="Nombre" variant="underlined"
                                            type="text" autocomplete="off" :rules="[rules.required, rules.empty]">
                                        </v-text-field>
                                        <v-text-field v-model="venta.data.ape_cli" label="Apellido" variant="underlined"
                                            type="text" autocomplete="off" :rules="[rules.required, rules.empty]">
                                        </v-text-field>
                                        <v-row>
                                            <v-col cols="5" md="5" lg="4">
                                                <v-select v-model="venta.data.iden" label="Tipo" variant="underlined"
                                                    :items="constantes.indentificacion" :rules="[rules.required]">
                                                </v-select>
                                            </v-col>
                                            <v-col>
                                                <v-text-field v-model="venta.data.iden_number" label="Identificación"
                                                    variant="underlined" autocomplete="off"
                                                    :rules="[rules.required, rules.empty]">
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
                                                    variant="underlined" autocomplete="off" type="number" min="1">
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
                                        <v-card-actions class="justify-end" v-if="!selected">
                                            <v-btn title="Agregar cliente" type="submit" class="text-capitalize"
                                                text="Agregar cliente nuevo" color="primary">
                                            </v-btn>
                                        </v-card-actions>
                                    </v-form>

                                </v-card-item>
                            </v-card>

                            <br>

                            <v-card class="pa-4" v-if="$vuetify.display.mdAndUp">
                                <v-card-title
                                    class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                                    Método de pago
                                </v-card-title>
                                <v-row>
                                    <v-col cols="12">
                                        <v-form v-model="valid_met">
                                            <v-row align="center">
                                                <v-col cols="6" class="pb-0 pt-0">
                                                    <v-select v-model="venta.metodo_array.metodo"
                                                        :rules="[rules.required]" label="Seleccionar métodos"
                                                        variant="underlined" :items="constantes.metodos">
                                                    </v-select>
                                                </v-col>
                                                <v-col cols="6" class="pb-0 pt-0">
                                                    <v-select v-model="venta.metodo_array.moneda"
                                                        :rules="[rules.required]" label="Moneda" variant="underlined"
                                                        :disabled="venta.met_text" :items="constantes.moneda">
                                                    </v-select>
                                                </v-col>
                                                <v-col cols="6" class="pb-0 pt-0">
                                                    <v-text-field v-model="venta.metodo_array.ref" label="Referencia"
                                                        variant="underlined" autocomplete="off"
                                                        :rules="[rules.required]" :disabled="venta.ref_null">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="6" class="pb-0 pt-0">
                                                    <v-text-field v-model="venta.metodo_array.monto"
                                                        :rules="[rules.required]" label="Monto" variant="underlined"
                                                        type="number" autocomplete="off">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" class="pb-0 pt-0 d-flex justify-center justify-sm-end">
                                                    <v-btn prepend-icon="mdi-plus" text="Agregar pago"
                                                        class="text-capitalize" title="Agregar pago" color="green"
                                                        variant="text" @click="agregar_pago">
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-col>
                                    <v-col>
                                        <v-card color="background">
                                            <v-card-item class="text-subtitle-1 text-sm-h7 text-md-h6">
                                                Total pagado Bs. {{ pay.bs }} <br>
                                                Total pagado $ {{ pay.dolar }}
                                            </v-card-item>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <br>
                                <v-col cols="12" v-if="venta.met_ref.length > 0" class="pa-0">
                                    <v-divider></v-divider><br>
                                    <v-col cols="12" v-for="(pago, index) in venta.met_ref" :key="index" class="pa-0">
                                        <v-card color="background"
                                            class="pa-4 text-subtitle-2 text-sm-subtitle-1 text-md-h6">
                                            <strong>Método:</strong> {{ pago.metodo }} <br>
                                            <strong>Moneda:</strong> {{ pago.moneda }} <br>
                                            <strong>Referencia:</strong> {{ pago.ref }} <br>
                                            <strong>Monto:</strong> {{ pago.monto }} <br>
                                            <div class="d-flex justify-center">
                                                <v-btn icon="mdi-delete" color="red"
                                                    @click="delete_pago(index)"></v-btn>
                                            </div><br>
                                        </v-card>
                                    </v-col>
                                    <v-divider></v-divider>
                                </v-col>
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
                                    <!-- <v-col cols="12" sm="4">
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
</v-col> -->
                                    <v-col cols="12">
                                        <v-form>
                                            <v-row>
                                                <v-col cols="12" sm="3">
                                                    <v-autocomplete v-model="producto_select"
                                                        label="Nombre del producto" variant="underlined"
                                                        :items="productos_items" item-title="nom_prod"
                                                        item-value="id_prod" return-object autocomplete="off">
                                                        <template v-slot:item="{ props, item }">
                                                            <v-list-item v-bind="props"
                                                                :subtitle="`${item.raw?.nom_prov ? item.raw?.nom_prov : ''} ${item.raw?.nom_cat ? `, Categorías:${item.raw?.nom_cat}` : ''}`"
                                                                :title="item.raw?.nom_prod">
                                                            </v-list-item>
                                                        </template>
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field v-if="!venta.producto.prec_uni_bs" label="Precio"
                                                        variant="underlined" type="number" min="1" readonly outlined>
                                                    </v-text-field>
                                                    <v-text-field v-else label="Precio unitario" readonly
                                                        variant="underlined">
                                                        <template v-slot:append-inner>
                                                            <div class="d-flex align-center ga-2">
                                                                <v-chip color="primary">
                                                                    Bs. {{ decimal(venta.producto.prec_uni_bs) }}
                                                                </v-chip>
                                                                <v-chip color="primary">
                                                                    $ {{ decimal(venta.producto.prec_uni_dolar) }}
                                                                </v-chip>
                                                            </div>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field v-model="venta.producto.cantidad" label="Cantidad"
                                                        variant="underlined" type="number" min="1">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field label="Existencia" readonly variant="underlined">
                                                        <template v-slot:append-inner>
                                                            <v-chip color="primary">
                                                                {{ venta.producto.existencia }}
                                                            </v-chip>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-col>
                                </v-row>
                                <v-col cols="12" sm="6" md="4" lg="2" class="pl-0 pr-0">
                                    <v-text-field v-model="venta.tasa" label="Tasa" variant="underlined" type="number"
                                        min="1">
                                        <template v-slot:prepend-inner>
                                            Bs.
                                        </template>
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
                                <v-data-table-virtual :headers="headers" :mobile="$vuetify.display.mobile" height="400"
                                    :items="venta.lista">
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
                                            @click="delete_item(item)">
                                        </v-btn>
                                        <v-btn icon="mdi-pencil" color="info" variant="text" title="Editar item"
                                            @click="edit_item(item)" :loading="clientes.loading_button">
                                        </v-btn>
                                    </template>
                                </v-data-table-virtual>
                                <v-divider></v-divider>

                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12" sm="6"
                                            class="d-flex pt-0 pb-0 justify-center justify-sm-start">
                                            <v-card-item title="Sub total" class="color">
                                            </v-card-item>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="d-flex pt-0 pb-0 justify-center justify-sm-end">
                                            <v-card-item :title="`Bs.${decimal(venta.montos_lista.sub_total)}`">
                                            </v-card-item>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-divider></v-divider>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12" sm="6"
                                            class="d-flex pt-0 pb-0 justify-center justify-sm-start">
                                            <v-card-item title="IVA" class="color">
                                            </v-card-item>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="d-flex pt-0 pb-0 justify-center justify-sm-end">
                                            <v-card-item :title="`Bs.${decimal(venta.montos_lista.monto_iva)}`">
                                            </v-card-item>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-divider></v-divider>

                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12" sm="6"
                                            class="d-flex pt-0 pb-0 justify-center justify-sm-start">
                                            <v-card-item title="Totales" class="color pb-0 pt-0">
                                            </v-card-item>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="d-flex pt-0 pb-0 justify-center justify-sm-end">
                                            <v-card-item class="text-green pb-0 pt-0">
                                                <v-card-title>
                                                    Bs.{{ decimal(venta.montos_lista.total) }}
                                                </v-card-title>
                                                <v-card-title>
                                                    $ {{ (venta.montos_lista.total / venta.tasa).toFixed(2) }}
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
                                <v-textarea v-model="venta.obj.obs" label="Agregar observaciones sobre la venta"
                                    variant="solo-filled"></v-textarea>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="11">
                    <v-card class="pa-4" v-if="$vuetify.display.mdAndDown">
                        <v-card-title class="text-subtitle-1 text-md-h6 text-lg-h5 font-weight-bold text-pre-wrap">
                            Método de pago
                        </v-card-title>
                        <v-row>
                            <v-col cols="12" lg="8">
                                <v-form v-model="valid_met">
                                    <v-row align="center">
                                        <v-col cols="12" sm="6" md="3" class="pb-0 pt-0">
                                            <v-select v-model="venta.metodo_array.metodo" :rules="[rules.required]"
                                                label="Seleccionar métodos" variant="underlined"
                                                :items="constantes.metodos">
                                            </v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="3" class="pb-0 pt-0">
                                            <v-select v-model="venta.metodo_array.moneda" :rules="[rules.required]"
                                                label="Moneda" variant="underlined" :disabled="venta.met_text"
                                                :items="constantes.moneda">
                                            </v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="3" class="pb-0 pt-0">
                                            <v-text-field v-model="venta.metodo_array.ref" label="Referencia"
                                                variant="underlined" :rules="[rules.required]"
                                                :disabled="venta.ref_null" autocomplete="off">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="3" class="pb-0 pt-0">
                                            <v-text-field v-model="venta.metodo_array.monto" :rules="[rules.required]"
                                                label="Monto" variant="underlined" type="number" autocomplete="off">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="pb-0 pt-0 d-flex justify-center justify-sm-end">
                                            <v-btn prepend-icon="mdi-plus" text="Agregar pago" class="text-capitalize"
                                                title="Agregar pago" color="green" variant="text" @click="agregar_pago">
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-col>
                            <v-col>
                                <v-card class="pa-4" color="background">
                                    <v-card-item class="text-subtitle-1 text-sm-h7 text-md-h6">
                                        Total a pagar Bs. {{ pay.bs }} <br>
                                        Total a pagar $ {{ pay.dolar = venta.montos_lista.total / venta.tasa }}
                                    </v-card-item>
                                </v-card>
                            </v-col>
                        </v-row>
                        <br>
                        <v-col cols="12" v-if="venta.met_ref.length > 0" class="pa-0">
                            <v-divider></v-divider><br>
                            <v-row>
                                <v-col cols="12" md="5" lg="4" v-for="(pago, index) in venta.met_ref" :key="index">
                                    <v-card color="background"
                                        class="pa-4 text-subtitle-2 text-sm-subtitle-1 text-md-h6">
                                        <strong>Método:</strong> {{ pago.metodo }} <br>
                                        <strong>Moneda:</strong> {{ pago.moneda }} <br>
                                        <strong>Referencia:</strong> {{ pago.ref }} <br>
                                        <strong>Monto:</strong> {{ pago.monto }} <br>
                                        <div class="d-flex justify-center">
                                            <v-btn icon="mdi-delete" color="red" @click="delete_pago(index)"></v-btn>
                                        </div><br>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                        </v-col>
                    </v-card>
                </v-col>

            </v-row>
            <v-btn @click="mostrar">mostrar</v-btn>
        </v-card-item>
    </v-card-item>


    <Aviso :store="clientes" />
    <Aviso :store="venta" />


</template>

<script setup>
import { useAgregarVentaStore } from '@/stores/agregar_venta';
import { useClientesStore } from '@/stores/clientes';
import { useProductosStore } from '@/stores/productos';
import { constantes } from '@/utils/constantes';
import { rules } from '@/utils/rules';
const clientes = useClientesStore()
const venta = useAgregarVentaStore()
const productos = useProductosStore()
const edit = ref(true)
const cliente_select = ref(undefined)
const producto_select = ref(undefined)
const selected = ref(null)
const selected_prod = ref(null)
const valid_met = ref(null)
const crear_cliente = ref(null)
const pay = ref({
    bs: 0,
    dolar: 0
})

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
    venta.total_pagar();
    pay.value.bs = parseFloat(venta.montos_lista.total.toFixed(2))
    pay.value.dolar = parseFloat((venta.montos_lista.total / venta.tasa).toFixed(2))
    producto_select.value = undefined;
}


function decimal(monto) {
    return monto.toFixed(2)
}

function edit_item(item) {
    const data = [item].map((prod) => ({
        id_prod: prod.id_prod,
        nom_prod: prod.nom_prod,
        precio_bs: parseFloat((prod.prec_uni_bs * 1.16).toFixed(2)),
        precio_dolar: parseFloat((prod.prec_uni_dolar * 1.16).toFixed(2)),
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
    venta.total_pagar()
    producto_select.value = undefined;
    edit.value = true
}

function delete_item(item) {
    const found = venta.lista.findIndex(element => element.index === item.index)
    if (found !== -1) {
        venta.lista.splice(found, 1)
    }
    venta.total_pagar()
}

function mostrar() {
    let dolar = venta.montos_lista.total * venta.tasa
    if (pay.value.bs >= venta.montos_lista.total || pay.value.bs >= dolar) {
        venta.enviar_venta()
    } else {
        venta.alertaCrud('Pago insuficiente', true, ['El pago no cubre el monto de la venta'], 'warning')
    }

}

function agregar_pago() {
    if (valid_met.value) {
        venta.agregar_pago()
        monto_pagos_add(venta.met_ref)
    } else {
        venta.alertaCrud('Datos vacíos', true, ['Debes llenar todos los datos del pago'], 'warning')

    }
}

async function send_form() {
    if (crear_cliente.value) {
        console.log(venta.data)
        const nuevo_cliente = await clientes.add_venta(venta.data)
        console.log(nuevo_cliente)
        if (nuevo_cliente) {
            cliente_select.value = nuevo_cliente;
        }
    } else {
        clientes.alertaCrud('Error', true, ['No se pueden enviar datos vacíos al registrar un cliente'], 'error')
    }
}

function delete_pago(index) {
    venta.met_ref.splice(index, 1)
}

function monto_pagos_add(array) {
    let monto_bs = 0
    let monto_dolar = 0
    if (array.length > 0) {
        for (const pago of array) {
            if (pago.moneda === 'Bolívares') {
                monto_bs = parseFloat((monto_bs + pago.monto).toFixed(2))
            }
            if (pago.moneda === 'Dólares') {
                monto_dolar = parseFloat((monto_dolar + pago.monto).toFixed(2))
            }
        }
    }
    pay.value.bs = ((pay.value.bs - monto_bs).toFixed(2))
    pay.value.dolar = parseFloat((pay.value.bs / venta.tasa).toFixed(2))
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

watch(
    () => venta.tasa, async (newVal) => {
        if (!newVal || newVal === null || newVal === '') {
            pay.value.dolar = 0
        } else {
            pay.value.dolar = parseFloat((venta.montos_lista.total / venta.tasa).toFixed(2))
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