import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
import { empty, mail, modify_data, tel } from "@/utils/valiaciones";
import { capitalize } from "vue";
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
    const backup = ref({})
    const loading = ref(false)
    const loading_button = ref(false)
    const loading_delete = ref(false)
    const headers = ref([
        { key: 'nom_cli', title: 'Nombre' },
        { key: 'ape_cli', title: 'Apellido' },
        { key: 'iden', title: 'Identificación' },
        { key: 'tel_cli', title: 'Teléfono' },
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
    const dialogOpen = ref(false)
    const section = 'Clientes'
    const title_form = ref('')
    
    const delete_success = ref(false)

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
            loading_button.value = false
            return;
        }
        try {
            let obj = {
                nom_cli: capitalize(data.value.nom_cli),
                ape_cli: capitalize(data.value.ape_cli),
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

    async function edit_item(item) {
        title_form.value = 'Modificar'
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
        backup.value = { ...item }
        dialogOpen.value = true
    }

    async function modify() {
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
            loading_button.value = false
            return;
        }
        let obj_modify = {
            id_cli: backup.value.id_cli,
            nom_cli: capitalize(data.value.nom_cli),
            ape_cli: capitalize(data.value.ape_cli),
            iden: String(data.value.iden) + String(data.value.iden_number),
            tel_cli: val_tel.telefono,
            email: val_mail.mail,
        }
        const obj_val = modify_data(obj_modify, backup.value)
        if (!obj_val.result) {
            alertaCrud('Advertencia', true, [obj_val.msj], 'warning')
            loading_button.value = false
            return
        }
        let obj = obj_val.data
        obj.id_cli = backup.value.id_cli

        try {
            const result = await apiCall('clientes/modificar', 'PUT', obj)
            if (result.msj_error) {
                alertaCrud('Error de al modificar', true, [result.msj_error], 'error')
                loading_button.value = false
                return;
            }
            if (result.msj) {
                alertaCrud('Modificado con éxito', true, [result.msj], 'success')
            }
            loading_button.value = false
            dialogOpen.value = false
            await get()
        } catch (error) {
            console.error(error)
        }

    }

    async function delete_item(item) {
        delete_success.value = true
        loading_delete.value = true
        let obj = { id_cli: item.id_cli }
        try {
            const result = await apiCall('clientes/eliminar', 'DELETE', obj)
            if (result.msj_error) {
                alertaCrud('Error de al eliminar', true, [result.msj_error], 'error')
                loading_delete.value = false
                return;
            }
            if (result.msj) {
                alertaCrud('Eliminado con éxito', true, [result.msj], 'success')
            }
            await get()
            loading_delete.value = false
            delete_success.value = false
        } catch (error) {
            console.error(error)
        }

    }

    function form_add() {
        title_form.value = 'Agregar'
        dialogOpen.value = true
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

    onMounted(() => {
        get()
    })



    return { items, headers, loading, fields, data, dialogOpen, section, alert, alertMsj, alertTitle, alertType, loading_button, title_form, loading_delete, delete_success, get, add, alertaCrud, form_add, delete_item, edit_item, modify };
})