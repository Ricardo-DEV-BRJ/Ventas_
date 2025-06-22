import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
import { empty, mail, modify_data, tel } from "@/utils/valiaciones";
import { capitalize } from "vue";
export const useCategoriasStore = defineStore('categorias', () => {
    const data = ref({
        nom_cat: '',
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
        { key: 'nom_cat', title: 'Categoría' },
        { key: 'actions', title: 'Acciones' },
    ])
    const fields = ref([{ key: 'nom_cat', type: 'text', title: 'Categoría' }])
    const items = ref([])
    const dialogOpen = ref(false)
    const section = 'Categorías'
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
            const result = await apiCall('categorias')
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
                nom_cat: capitalize(data.value.nom_cat),
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
            const result = await apiCall('categorias/crear', 'POST', obj)

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
        data.value = {
            nom_cat: item.nom_cat,
        }
        backup.value = { ...item }
        dialogOpen.value = true
    }

    async function modify() {
        let obj_modify = {
            id_cat: backup.value.id_cat,
            nom_cat: capitalize(data.value.nom_cat),
        }
        const obj_val = modify_data(obj_modify, backup.value)
        if (!obj_val.result) {
            alertaCrud('Advertencia', true, [obj_val.msj], 'warning')
            loading_button.value = false
            return
        }
        let obj = obj_val.data
        obj.id_cat = backup.value.id_cat

        try {
            const result = await apiCall('categorias/modificar', 'PUT', obj)
            if (result.msj_error) {
                alertaCrud('Error de al modificar', true, [result.msj_error], 'error')
                loading_button.value = false
                return;
            }
            if (result.msj) {
                console.log('que pasa')
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
        let obj = { id_cat: item.id_cat }
        try {
            const result = await apiCall('categorias/eliminar', 'DELETE', obj)
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
            nom_cat: '',
        }
    }





    return { items, headers, loading, fields, data, dialogOpen, section, alert, alertMsj, alertTitle, alertType, loading_button, title_form, loading_delete, delete_success, get, add, alertaCrud, form_add, delete_item, edit_item, modify };
})