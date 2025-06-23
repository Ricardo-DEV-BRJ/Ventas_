import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
import { empty, mail, modify_data, tel } from "@/utils/valiaciones";
import { capitalize } from "vue";
export const useUsuariosStore = defineStore('usuarios', () => {
    const data = ref({
        nom_usu: '',
        ape_usu: '',
        iden: null,
        iden_number: '',
        usuario: '',
        clave: '',
        id_rol: null,
    })
    const backup = ref({})
    const loading = ref(false)
    const loading_button = ref(false)
    const loading_delete = ref(false)
    const add_user = ref(true)

    const headers = ref([
        { key: 'nom_usu', title: 'Nombre' },
        { key: 'ape_usu', title: 'Apellido' },
        { key: 'iden', title: 'Identificación' },
        { key: 'usuario', title: 'Usuario' },
        { key: 'nom_rol', title: 'Rol' },
        { key: 'actions', title: 'Acciones' },

    ])
    const fields = computed(() => {
        if (add_user.value) {
             return [
            { key: 'nom_usu', type: 'text', title: 'Nombre' },
            { key: 'ape_usu', type: 'text', title: 'Apellido' },
            { key: 'usuario', type: 'text', title: 'Usuario' },
            { key: 'clave', type: 'password', title: 'Contraseña' },
            { key: 'iden', type: 'select', subKey: 'iden_number', subType: 'text', title: 'Tipo', subTitle: 'Identificación', constante: 'indentificacion' },
            { key: 'id_rol', type: 'autocomplete', title: 'Rol', options: items_rol.value },
        ]
        } else {
             return [
            { key: 'nom_usu', type: 'text', title: 'Nombre' },
            { key: 'ape_usu', type: 'text', title: 'Apellido' },
            { key: 'usuario', type: 'text', title: 'Usuario' },
            { key: 'iden', type: 'select', subKey: 'iden_number', subType: 'text', title: 'Tipo', subTitle: 'Identificación', constante: 'indentificacion' },
            { key: 'id_rol', type: 'autocomplete', title: 'Rol', options: items_rol.value },
        ]
        }
       
    })
    const items = ref([])
    const items_rol = ref([])
    const dialogOpen = ref(false)
    const section = 'Usuarios'
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
        }, 2000);

    }

    async function get() {
        loading.value = true
        try {
            const result = await apiCall('usuarios')
            items.value = result
            loading.value = false
        } catch (error) {
            console.log(error)
        }
    }

    async function add() {
        loading_button.value = true
        try {
            let msj = []
            let obj = {
                nom_usu: capitalize(data.value.nom_usu),
                ape_usu: capitalize(data.value.ape_usu),
                iden: String(data.value.iden) + String(data.value.iden_number),
                usuario: data.value.usuario,
                clave: data.value.clave,
                id_rol: data.value.rol
            }
            const validacion_vacio = empty(obj)
            if (!validacion_vacio.result) {
                msj.push(validacion_vacio.msj)
            }
            if (msj.length > 0) {
                alertaCrud('Error de validación', true, msj, 'warning')
                return;
            }
            const result = await apiCall('usuarios/registrar', 'POST', obj)
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
        add_user.value = false
        const partes = item.iden.split('-')
        const tip = partes[0] + "-"
        const number = partes.slice(1).join('-')
        data.value = {
            nom_usu: item.nom_usu,
            ape_usu: item.ape_usu,
            usuario: item.usuario,
            iden: tip,
            iden_number: number,
            id_rol: item.id_rol
        }
        backup.value = { ...item }
        dialogOpen.value = true
    }

    async function modify() {
        let obj_modify = {
            id_usu: backup.value.id_usu,
            nom_usu: capitalize(data.value.nom_usu),
            ape_usu: capitalize(data.value.ape_usu),
            iden: String(data.value.iden) + String(data.value.iden_number),
            id_rol: data.value.id_rol
        }
        const obj_val = modify_data(obj_modify, backup.value)
        console.log(obj_val)
        if (!obj_val.result) {
            alertaCrud('Advertencia', true, [obj_val.msj], 'warning')
            loading_button.value = false
            return
        }
        let obj = obj_val.data
        obj.id_usu = backup.value.id_usu

        try {
            const result = await apiCall('usuarios/modificar', 'PUT', obj)
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
        let obj = { id_usu: item.id_usu }
        try {
            const result = await apiCall('usuarios/eliminar', 'DELETE', obj)
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
            nom_usu: '',
            ape_usu: '',
            iden: null,
            iden_number: '',
            tel: null,
            tel_num: '',
            type_email: null,
            email: '',
        }
    }

    onMounted(async() => {
        get()
        const result = await apiCall('usuarios/roles')
        items_rol.value = result.map(rol =>({
            value:rol.id_rol,
            title:rol.nom_rol
        }))
    })



    return { items, headers, loading, fields, data, dialogOpen, section, alert, alertMsj, alertTitle, alertType, loading_button, title_form, loading_delete, delete_success, get, add, alertaCrud, form_add, delete_item, edit_item, modify };
})