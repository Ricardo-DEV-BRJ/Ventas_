import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
import { empty, mail, modify_data, tel } from "@/utils/valiaciones";
import { capitalize } from "vue";
export const useProveedoresStore = defineStore('proveedores', () => {
    const data = ref({
        nom_prov: '',
        iden: null,
        iden_number: '',
        vig_prov: true,
        hab_prov: true
    })
    const backup = ref({})
    const loading = ref(false)
    const loading_button = ref(false)
    const loading_delete = ref(false)
    const headers = ref([
        { key: 'nom_prov', title: 'Nombre' },
        { key: 'iden_prov', title: 'RIF' },
        { key: 'vig_prov', title: 'Estado' },
        { key: 'actions', title: 'Acciones' },
    ])
    const fields = ref([])
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
        loading_button.value = true
        try {
            let obj = {
                nom_prov: capitalize(data.value.nom_prov),
                iden_prov: String(data.value.iden) + String(data.value.iden_number)
            }
            let msj = []
            const validacion_vacio = empty(obj)
            if (!validacion_vacio.result) {
                msj.push(validacion_vacio.msj)
            }
            if (msj.length > 0) {
                alertaCrud('Error de validación', true, msj, 'warning')
                return;
            }
            const result = await apiCall('proveedor/crear', 'POST', obj)

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
        fields.value = [
            { key: 'nom_prov', type: 'text', title: 'Nombre' },
            { key: 'iden', type: 'select', subKey: 'iden_number', subType: 'text', title: 'RIF', subTitle: 'Identificación', constante: 'rif' },
            { key: 'vig_prov', type: 'check', title: 'Vigente' },
        ]
        title_form.value = 'Modificar'
        const partes = item.iden_prov.split('-')
        const tip = partes[0] + "-"
        const number = partes.slice(1).join('-')
        data.value = {
            nom_prov: item.nom_prov,
            iden: tip,
            iden_number: number,
            vig_prov: item.vig_prov
        }
        backup.value = { ...item }
        dialogOpen.value = true
    }

    async function modify() {
        let obj_modify = {
            id_prov: backup.value.id_prov,
            nom_prov: capitalize(data.value.nom_prov),
            iden_prov: String(data.value.iden) + String(data.value.iden_number),
            vig_prov: data.value.vig_prov
        }
        const obj_val = modify_data(obj_modify, backup.value)
        if (!obj_val.result) {
            alertaCrud('Advertencia', true, [obj_val.msj], 'warning')
            loading_button.value = false
            return
        }
        let obj = obj_val.data
        obj.id_prov = backup.value.id_prov

        console.log(obj)
        try {
            const result = await apiCall('proveedor/modificar', 'PUT', obj)
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
            delete_success.value = false
        } catch (error) {
            console.error(error)
        }

    }

    function form_add() {
        fields.value = [
            { key: 'nom_prov', type: 'text', title: 'Nombre' },
            { key: 'iden', type: 'select', subKey: 'iden_number', subType: 'text', title: 'RIF', subTitle: 'Identificación', constante: 'rif' }
        ]
        title_form.value = 'Agregar'
        dialogOpen.value = true
        data.value = {
            nom_prov: '',
            iden: null,
            iden_number: '',
        }
    }

    onMounted(() => {
        get()
    })



    return { items, headers, loading, fields, data, dialogOpen, section, alert, alertMsj, alertTitle, alertType, loading_button, title_form, loading_delete, delete_success, get, add, alertaCrud, form_add, delete_item, edit_item, modify };
})