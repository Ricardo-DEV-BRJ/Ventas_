import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
import { empty, mail, tel } from "@/utils/valiaciones";
export const useClientesStore = defineStore('clientes', () => {
    const data = ref({
        nom_cli: '',
        ape_cli: '',
        iden: null,
        iden_number: '',
        tel: null,
        tel_num: '',
        type_email: null,
        email: '',
    })
    const loading = ref(false)
    const loading_button = ref(false)
    const headers = ref([
        { key: 'nom_cli', title: 'Nombre' },
        { key: 'ape_cli', title: 'Apellido' },
        { key: 'iden', title: 'Identificación' },
        { key: 'tel_cli', title: 'Telefono' },
        { key: 'email', title: 'Correo' },
        { key: 'actions', title: 'Acciones' },

    ])
    const fields = ref([
        { key: 'nom_cli', type: 'text', title: 'Nombre' },
        { key: 'ape_cli', type: 'text', title: 'Apellido' },
        { key: 'iden', type: 'select', subKey: 'iden_number', subType: 'text', title: 'Tipo', subTitle: 'Identificación', constante: 'indentificacion' },
        { key: 'tel', type: 'select', subKey: 'tel_num', subType: 'number', title: 'Codigo', subTitle: 'Telefono', constante: 'codigos' },
        { key: 'email', type: 'select', subKey: 'type_email', subType: 'text', title: 'Correo', subTitle: '@example.com', constante: 'correos' },

    ])
    const items = ref([])
    const dialogOpen = ref(true)
    const section = 'Clientes'
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

    async function get() {
        loading.value = true
        try {
            const result = await apiCall('clientes')
            items.value = result
            loading.value = false
        } catch (error) {
            console.log(error)
        }
    }

    async function add() {
        loading_button.value = true
        const val_tel = tel(data.value.tel, data.value.tel_num)
        const val_mail = mail(data.value.email, data.value.type_email)
        let msj = []
        if (!val_tel.result) {
            msj.push(val_tel.msj)
        }
        if (!val_mail.result) {
            msj.push(val_mail.msj)
        }
        if (msj.length > 0) {
            alertaCrud('Error de validación', true, msj, 'warning')
            return;
        }
        try {
            let obj = {
                nom_cli: data.value.nom_cli,
                ape_cli: data.value.ape_cli,
                iden: String(data.value.iden) + String(data.value.iden_number),
                tel_cli: val_tel.telefono,
                email: val_mail.mail,
            }
            const validacion_vacio = empty(obj)
            if (!validacion_vacio.result) {
                msj.push(validacion_vacio.msj)
            }
            if (msj.length > 0) {
                alertaCrud('Error de validación', true, msj, 'warning')
                return;
            }
            const result = await apiCall('clientes/crear', 'POST', obj)
            if (result.msj_error) {
                alertaCrud('Error de al registrar', true, [result.msj_error], 'error')
                loading_button.value = false
                return;
            }
            if (result.msj) {
                alertaCrud('Registrado con éxito', true, [result.msj], 'success')
            }
            loading_button.value = false
            dialogOpen.value = false
            await get()
        } catch (error) {
            console.error(error)
        }
    }

    onMounted(() => {
        get()
    })



    return { items, headers, loading, fields, data, dialogOpen, section, alert, alertMsj, alertTitle, alertType, loading_button, get, add, alertaCrud };
})