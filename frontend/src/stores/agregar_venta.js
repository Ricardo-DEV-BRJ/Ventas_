import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
import { getPersonUsuario } from "@/utils/authdecode";
export const useAgregarVentaStore = defineStore('agregar_venta', () => {

    const tasa = ref(1)
    const data = ref({
        id_cli: '',
        nom_cli: '',
        ape_cli: '',
        iden: null,
        iden_number: '',
        tel: null,
        tel_num: '',
        type_email: null,
        email: '',
    })
    const producto = ref({})
    const lista = ref([])
    let index = ref(0)


    const montos_lista = ref({
        sub_total: 0,
        monto_iva: 0,
        total: 0
    })
    const met_ref = ref([])
    const metodo_array = ref({
        metodo: undefined,
        moneda: undefined,
        ref: '',
        monto: null
    })
    const met_text = ref(null)
    const ref_null = ref(null)

    const obj = ref({
        tip_factura: null,
        descrip: lista.value,
        tasa: 1,
        monto_bs: 0,
        monto_dolar: 0,
        id_cli: null,
        ant_por: getPersonUsuario(),
        obs: '',
        met_ref: met_ref.value
    })

    const alert = ref(false)
    const alertMsj = ref([])
    const alertTitle = ref('')
    const alertType = ref('')

    function alertaCrud(title, shoAlert, msj, type) {
        alert.value = shoAlert
        alertMsj.value = msj
        alertTitle.value = title
        alertType.value = type
        setTimeout(() => {
            alert.value = false
        }, 3000);

    }

    function total_pagar() {
        montos_lista.value.sub_total = 0;
        for (const monto of lista.value) {
            montos_lista.value.sub_total = montos_lista.value.sub_total + monto.monto_prod_bs
        }
        montos_lista.value.monto_iva = montos_lista.value.sub_total * 0.16
        montos_lista.value.total = montos_lista.value.sub_total + montos_lista.value.monto_iva
    }

    async function clientes_exi(item) {
        const partes = item.iden.split('-')
        const tip = partes[0] + "-"
        const number = partes.slice(1).join('-')
        let cod;
        let tel;
        let type_email;
        let email;
        if (item.tel_cli === 'Sin contacto') {
            cod = null;
            tel = ''
        } else {
            cod = item.tel_cli.split('-')[0]
            tel = item.tel_cli.split('-')[1]
        }
        if (item.email === 'Sin correo') {
            type_email = null;
            email = ''
        } else {
            type_email = '@' + item.email.split('@')[1]
            email = item.email.split('@')[0]
        }
        data.value = {
            id_cli: item.id_cli,
            nom_cli: item.nom_cli,
            ape_cli: item.ape_cli,
            iden: tip,
            iden_number: number,
            tel: cod,
            tel_num: tel,
            type_email: type_email,
            email: email,
        }
    }

    function clear() {
        data.value = {
            nom_cli: '',
            ape_cli: '',
            iden: null,
            iden_number: '',
            tel: null,
            tel_num: '',
            type_email: null,
            email: '',
        }
    }

    async function producto_exi(item) {
        producto.value = {
            id_prod: item.id_prod,
            nom_prod: item.nom_prod,
            prec_uni_bs: (item.precio_bs),
            prec_uni_dolar: (item.precio_dolar),
            existencia: item.total_existencia,
            cantidad: 1,
            index: item.index
        }
    }

    function clear_prod() {
        producto.value = {
            id_prod: '',
            nom_prod: '',
            existencia: '',
            cantidad: null,
            prec_uni_bs: null,
            prec_uni_dolar: null,
            monto_prod_bs: null,
            monto_prod_dolar: null
        }
    }


    function montos() {
        if (producto.value.id_prod) {
            producto.value.prec_uni_bs = parseFloat((producto.value.prec_uni_bs / 1.16).toFixed(2))
            producto.value.prec_uni_dolar = parseFloat((producto.value.prec_uni_dolar / 1.16).toFixed(2))
            producto.value.monto_prod_bs = parseFloat((producto.value.prec_uni_bs * producto.value.cantidad).toFixed(2))
            producto.value.monto_prod_dolar = parseFloat((producto.value.prec_uni_dolar * producto.value.cantidad).toFixed(2))
            producto.value.index = index.value
            lista.value.push(producto.value)
            clear_prod()
            index.value++;
        } else {
            alertaCrud('Datos vacíos', true, ['Debes selecionar un producto'], 'warning')
        }

    }

    function montos_edit(index) {
        producto.value.prec_uni_bs = parseFloat((producto.value.prec_uni_bs / 1.16).toFixed(2))
        producto.value.prec_uni_dolar = parseFloat((producto.value.prec_uni_dolar / 1.16).toFixed(2))
        producto.value.monto_prod_bs = parseFloat((producto.value.prec_uni_bs * producto.value.cantidad).toFixed(2));
        producto.value.monto_prod_dolar = parseFloat((producto.value.prec_uni_dolar * producto.value.cantidad).toFixed(2));
        producto.value.cantidad = parseFloat(producto.value.cantidad)
        console.log(producto.value)
        lista.value.splice(index, 1, { ...producto.value });
        clear_prod();
    }

    function agregar_pago() {
        metodo_array.value.monto = parseFloat((parseFloat(metodo_array.value.monto)).toFixed(2))
        met_ref.value.push(metodo_array.value)
        metodo_array.value = {
            metodo: undefined,
            moneda: undefined,
            ref: '',
            monto: null
        }

        console.log(met_ref.value)

    }

    function enviar_venta() {
        obj.value.id_cli = data.value.id_cli
        obj.value.tasa = tasa.value == 0 ? 1 : parseFloat(tasa.value)
        obj.value.monto_bs = parseFloat(montos_lista.value.total.toFixed(2))
        obj.value.monto_dolar = parseFloat((parseFloat(montos_lista.value.total) / parseFloat(tasa.value)).toFixed(2))
        console.log(obj.value)
    }

    watch(
        () => metodo_array.value.metodo, async (newVal) => {
            if (!newVal || newVal === null || newVal === '') {
                metodo_array.value.moneda = null
                met_text.value = null
                ref_null.value = null
            } else {
                if (newVal === 'Tarjeta de débito' || newVal === 'Transferencia Bancaria') {
                    metodo_array.value.moneda = 'Bolívares'
                    metodo_array.value.ref = ''
                    met_text.value = true
                    ref_null.value = null

                }
                if (newVal === 'Zelle') {
                    metodo_array.value.moneda = 'Dólares'
                    metodo_array.value.ref = ''
                    met_text.value = true
                    ref_null.value = null

                }
                if (newVal === 'Efectivo') {
                    metodo_array.value.ref = 'Sin referencia'
                    metodo_array.value.moneda = null
                    met_text.value = null
                    ref_null.value = true
                }

            }
        }
    )




    return { data, producto, lista, tasa, montos_lista, alert, alertMsj, alertTitle, alertType, clientes_exi, clear, clear_prod, producto_exi, montos, montos_edit, total_pagar, agregar_pago, enviar_venta, alertaCrud, met_ref, metodo_array, met_text, obj, ref_null };
})