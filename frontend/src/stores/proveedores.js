import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
import { empty, mail, modify_data, tel } from "@/utils/valiaciones";
import { capitalize } from "vue";
export const useProveedoresStore = defineStore('proveedores', () => {
    const data = ref({
        nom_prov: '',
        iden: null,
        iden_number: '',
    })
    const backup = ref({})
    const loading = ref(false)
    const loading_button = ref(false)
    const loading_delete = ref(false)
    const headers = ref([
        { key: 'nom_prov', title: 'Nombre' },
        { key: 'iden_prov', title: 'RIF' },
        { key: 'hab_prov', title: 'Estado' },
        { key: 'actions', title: 'Acciones' },
    ])
    const fields = ref([
        { key: 'nom_prov', type: 'text', title: 'Nombre' },
        { key: 'iden', type: 'select', subKey: 'iden_number', subType: 'text', title: 'RIF', subTitle: 'Identificación', constante: 'rif' },
    ])
    const items = ref([])
    const dialogOpen = ref(false)
    const section = 'Proveedores'
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
            const result = await apiCall('proveedor')
            items.value = result
            loading.value = false
        } catch (error) {
            console.log(error)
        }
    }

    async function add() {
        // loading_button.value = true
        // const val_tel = tel(data.value.tel, data.value.tel_num)
        // const val_mail = mail(data.value.email, data.value.type_email)
        // let msj = []
        // if (!val_tel.result) {
        //     msj.push(val_tel.msj)
        // }
        // if (!val_mail.result) {
        //     msj.push(val_mail.msj)
        // }
        // if (msj.length > 0) {
        //     alertaCrud('Error de validación', true, msj, 'warning')
        //     loading_button.value = false
        //     return;
        // }
        // try {
        //     let obj = {
        //         nom_cli: capitalize(data.value.nom_cli),
        //         ape_cli: capitalize(data.value.ape_cli),
        //         iden: String(data.value.iden) + String(data.value.iden_number),
        //         tel_cli: val_tel.telefono,
        //         email: val_mail.mail,
        //     }
        //     const validacion_vacio = empty(obj)
        //     if (!validacion_vacio.result) {
        //         msj.push(validacion_vacio.msj)
        //     }
        //     if (msj.length > 0) {
        //         alertaCrud('Error de validación', true, msj, 'warning')
        //         return;
        //     }
        //     const result = await apiCall('clientes/crear', 'POST', obj)
        //     if (result.msj_error) {
        //         alertaCrud('Error de al registrar', true, [result.msj_error], 'error')
        //         loading_button.value = false
        //         return;
        //     }
        //     if (result.msj) {
        //         alertaCrud('Registrado con éxito', true, [result.msj], 'success')
        //     }
        //     loading_button.value = false
        //     dialogOpen.value = false
        //     await get()
        // } catch (error) {
        //     console.error(error)
        // }
    }

    async function edit_item(item) {
        title_form.value = 'Modificar'
        const tip = item.iden.split('-')[0] + '-'
        const number = item.iden.split('-')[1]
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
        let obj = { id_prov: item.id_prov }
        try {
            const result = await apiCall('proveedor/eliminar', 'DELETE', obj)
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
            delete_success.value = true
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