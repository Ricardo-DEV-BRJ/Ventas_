import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
export const useAgregarVentaStore = defineStore('agregar_venta', () => {

    const data = ref({})

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


    return { data, clientes_exi, clear };
})