import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
export const useAgregarVentaStore = defineStore('agregar_venta', () => {

    const tasa = ref(1)
    const data = ref({})
    const producto = ref({})
    const lista = ref([])
    let index = ref(0)


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
            prec_uni_bs: item.precio_bs,
            prec_uni_dolar: item.precio_dolar,
            cantidad: 1,
            index: item.index
        }
    }

    function clear_prod() {
        producto.value = {
            id_prod: '',
            nom_prod: '',
            cantidad: null,
            prec_uni_bs: null,
            prec_uni_dolar: null,
            monto_prod_bs: null,
            monto_prod_dolar: null
        }
    }


    function montos() {
        if (producto.value.id_prod) {
            producto.value.prec_uni_bs = parseFloat(producto.value.prec_uni_bs) / 1.16
            producto.value.prec_uni_dolar = parseFloat(producto.value.prec_uni_dolar) / 1.16
            producto.value.monto_prod_bs = parseFloat(producto.value.prec_uni_bs * producto.value.cantidad)
            producto.value.monto_prod_dolar = parseFloat(producto.value.prec_uni_dolar * producto.value.cantidad)
            producto.value.index = index.value
            lista.value.push(producto.value)
            clear_prod()
            index.value++;
        } else {
            console.log('eres tonto?')
        }

    }

    function montos_edit(index) {
        producto.value.prec_uni_bs = parseFloat(producto.value.prec_uni_bs) / 1.16
        producto.value.prec_uni_dolar = parseFloat(producto.value.prec_uni_dolar) / 1.16
        producto.value.monto_prod_bs = parseFloat(producto.value.prec_uni_bs * producto.value.cantidad);
        producto.value.monto_prod_dolar = parseFloat(producto.value.prec_uni_dolar * producto.value.cantidad);
        console.log(producto.value)
        lista.value.splice(index, 1, { ...producto.value });
        clear_prod();
    }

    return { data, producto, lista, tasa, clientes_exi, clear, clear_prod, producto_exi, montos, montos_edit };
})