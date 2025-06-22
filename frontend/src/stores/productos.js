import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
import { empty, mail, modify_data, tel } from "@/utils/valiaciones";
import { capitalize } from "vue";
export const useProductosStore = defineStore('productos', () => {
    const data = ref({
        nom_prod: '',
        id_prov: null,
        id_cat: null,
        cantidad: null,
        cod_lote: '',
        prec_uni_bs: null,
        prec_uni_dolar: null,
        tasa: null

    })
    const backup = ref({})
    const loading = ref(false)
    const loading_button = ref(false)
    const loading_delete = ref(false)
    const loading_info = ref(false)
    const add_prod = ref(true)
    const edit_prod = ref(true)
    const edit_lote = ref(true)
    const headers = ref([
        { key: 'nom_prod', title: 'Producto' },
        { key: 'nom_cat', title: 'Categoría' },
        { key: 'nom_prov', title: 'Proveedor' },
        { key: 'total_existencia', title: 'Existencia' },
        { key: 'precio', title: 'Precio' },
        { key: 'info', title: 'Lotes' },
        { key: 'actions', title: 'Acciones' },
    ])
    const headers_info = ref([
        { key: 'fec_lote', title: 'Fecha' },
        { key: 'cod_lote', title: 'Lote' },
        { key: 'cantidad', title: 'Cantidad' },
        { key: 'precio', title: 'Precio' },
        { key: 'actions', title: 'Acciones' },
    ])
    const fields = computed(() => {
        if (add_prod.value) {
            return [
                { key: 'nom_prod', type: 'text', title: 'Producto' },
                { key: 'id_prov', type: 'autocomplete', title: 'Proveedor', options: items_prov.value },
                { key: 'id_cat', type: 'autocomplete', title: 'Categoría', options: items_cat.value },
                { key: 'cantidad', type: 'number', title: 'Cantidad' },
                { key: 'cod_lote', type: 'text', title: 'Codigo de lote' },
                { key: 'tasa', type: 'number', title: 'Tasa' },
                { key: 'prec_uni_bs', type: 'number', title: 'Precio Bs.', subKey: 'prec_uni_dolar', subType: 'number', subTitle: 'Precio $', disabledKey: dis_bs.value, disabledSubKey: dis_dol.value, row: true },
            ]
        }
        if (edit_prod.value) {
            return [
                { key: 'nom_prod', type: 'text', title: 'Producto' },
                { key: 'id_prov', type: 'autocomplete', title: 'Proveedor', options: items_prov.value },
                { key: 'id_cat', type: 'autocomplete', title: 'Categoría', options: items_cat.value },
            ]
        }
        if (edit_lote.value) {
            return [
                { key: 'cantidad', type: 'number', title: 'Cantidad' },
                { key: 'cod_lote', type: 'text', title: 'Codigo de lote' },
                { key: 'tasa', type: 'number', title: 'Tasa' },
                { key: 'prec_uni_bs', type: 'number', title: 'Precio Bs.', subKey: 'prec_uni_dolar', subType: 'number', subTitle: 'Precio $', disabledKey: dis_bs.value, disabledSubKey: dis_dol.value, row: true },
            ]
        }


    })
    const items = ref([])
    const items_info = ref([])
    const dialogOpen = ref(false)
    const dialogOpenInfo = ref(false)
    const section = 'Productos'
    const prod = ref('')
    const title_form = ref('')
    const delete_success = ref(false)
    const delete_success_info = ref(false)

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
    const items_prov = ref([])
    const items_cat = ref([])
    const dis_bs = ref(true)
    const dis_dol = ref(true)

    async function get() {
        loading.value = true
        try {
            const result = await apiCall('productos')
            items.value = result
            loading.value = false
        } catch (error) {
            console.log(error)
        }
    }
    async function get_detalle(item) {
        dialogOpenInfo.value = true
        let obj = { id_prod: item.id_prod }
        loading_info.value = true
        try {
            const result = await apiCall('productos/lote', 'POST', obj)
            if (result.msj_error) {
                alertaCrud('Error de al registrar', true, [result.msj_error], 'error')
                loading_button.value = false
                return;
            }
            items_info.value = result.map((item) => ({
                ...item,
                fec_lote: new Date(item.fec_lote).toLocaleDateString('es-VE')
            }))
            loading_info.value = false
        } catch (error) {
            console.log(error)
        }
    }

    async function add() {
        loading_button.value = true
        try {
            let obj = {
                nom_prod: capitalize(data.value.nom_prod),
                id_prov: data.value.id_prov,
                id_cat: data.value.id_cat,
                cantidad: data.value.cantidad,
                cod_lote: data.value.cod_lote,
                prec_uni_bs: data.value.prec_uni_bs,
                prec_uni_dolar: data.value.prec_uni_dolar
            }
            const result = await apiCall('productos/crear', 'POST', obj)

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
        add_prod.value = false
        edit_lote.value = false
        edit_prod.value = true
        title_form.value = 'Modificar'
        data.value = {
            nom_prod: item.nom_prod,
            id_prov: item.id_prov,
            id_cat: item.id_cat,
        }
        backup.value = { ...item }
        dialogOpen.value = true
    }
    async function edit_item_info(item) {
        add_prod.value = false
        edit_prod.value = false
        edit_lote.value = true
        title_form.value = 'Modificar lote'
        data.value = {
            cantidad: parseFloat(item.cantidad),
            cod_lote: item.cod_lote,
            tasa: null,
            prec_uni_bs: parseFloat(item.prec_uni_bs),
            prec_uni_dolar: parseFloat(item.prec_uni_dolar)

        }
        backup.value = { ...item }
        dialogOpen.value = true
    }

    async function modify() {
        let obj_modify = {
            nom_prod: capitalize(data.value.nom_prod),
            id_prov: data.value.id_prov,
            id_cat: data.value.id_cat,
        }
        const obj_val = modify_data(obj_modify, backup.value)
        if (!obj_val.result) {
            alertaCrud('Advertencia', true, [obj_val.msj], 'warning')
            loading_button.value = false
            return
        }
        let obj = obj_val.data
        obj.id_prod = backup.value.id_prod

        try {
            const result = await apiCall('productos/modificar', 'PUT', obj)
            console.log(result)
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
    async function modify_info() {
        let obj_modify = {
            cantidad: data.value.cantidad,
            cod_lote: data.value.cod_lote,
            prec_uni_bs: data.value.prec_uni_bs,
            prec_uni_dolar: data.value.prec_uni_dolar
        }
        const obj_val = modify_data(obj_modify, backup.value)
        if (!obj_val.result) {
            alertaCrud('Advertencia', true, [obj_val.msj], 'warning')
            loading_button.value = false
            return
        }
        let obj = obj_val.data
        obj.id_prod_exi = backup.value.id_prod_exi

        try {
            const result = await apiCall('productos/modificar_lote', 'PUT', obj)
            if (result.msj_error) {
                alertaCrud('Error de al modificar', true, [result.msj_error], 'error')
                loading_button.value = false
                return;
            }
            if (result.msj) {
                alertaCrud('Modificado con éxito', true, [result.msj], 'success')
            }
            await get_detalle(backup.value)
            loading_button.value = false
            dialogOpen.value = false
        } catch (error) {
            console.error(error)
        }

    }

    async function delete_item(item) {
        delete_success.value = true
        loading_delete.value = true
        let obj = { id_prod: item.id_prod }
        try {
            const result = await apiCall('productos/eliminar', 'DELETE', obj)
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
    async function delete_item_info(item) {
        delete_success_info.value = true
        loading_delete.value = true
        let obj = { id_prod_exi: item.id_prod_exi }
        let obj_delete = { id_prod: item.id_prod }
        try {
            const result = await apiCall('productos/eliminar_lote', 'DELETE', obj)
            if (result.msj_error) {
                alertaCrud('Error de al eliminar', true, [result.msj_error], 'error')
                loading_delete.value = false
                return;
            }
            if (result.msj) {
                alertaCrud('Eliminado con éxito', true, [result.msj], 'success')
            }
            await get_detalle(obj_delete)
            await get()
            loading_delete.value = false
            delete_success_info.value = true
        } catch (error) {
            console.error(error)
        }

    }
    function add_item(item) {
        add_prod.value = false
        edit_prod.value = false
        edit_lote.value = true
        title_form.value = 'Agregar'
        data.value = {
            nom_prod: item.nom_prod,
            id_prov: item.id_prov,
            id_cat: item.id_cat,
            cantidad: null,
            cod_lote: '',
            tasa: null,
            prec_uni_bs: null,
            prec_uni_dolar: null

        }
        backup.value = { ...item }
        dialogOpen.value = true
    }

    function form_add() {
        title_form.value = 'Agregar'
        add_prod.value = true
        edit_prod.value = false
        edit_lote.value = false
        dialogOpen.value = true
        data.value = {
            nom_prod: '',
            id_prov: null,
            id_cat: null,
            cantidad: null,
            cod_lote: '',
            prec_uni_bs: null,
            prec_uni_dolar: null,
            tasa: null

        }
    }


    watch(
        () => data.value.tasa, (newVal) => {
            if (!newVal || newVal === 0) {
                dis_bs.value = true;
                dis_dol.value = true;
                data.value.prec_uni_bs = null;
                data.value.prec_uni_dolar = null;
            } else {
                dis_bs.value = null;
                dis_dol.value = null;
                // Si ya hay un precio definido, recalcular el otro
                if (data.value.prec_uni_bs && data.value.prec_uni_bs !== 0) {
                    data.value.prec_uni_dolar = parseFloat((data.value.prec_uni_bs / newVal).toFixed(2));
                    dis_dol.value = true;
                } else if (data.value.prec_uni_dolar && data.value.prec_uni_dolar !== 0) {
                    data.value.prec_uni_bs = parseFloat((data.value.prec_uni_dolar * newVal).toFixed(2));
                    dis_bs.value = true;

                }
            }
        }
    );

    watch(
        () => data.value.prec_uni_bs, (newVal) => {
            if (!dis_bs.value) {
                if (newVal && newVal !== 0 && data.value.tasa && data.value.tasa !== 0) {
                    const calculatedDolar = parseFloat((newVal / data.value.tasa).toFixed(6)); // Más precisión
                    data.value.prec_uni_dolar = calculatedDolar;
                    dis_dol.value = true
                    dis_bs.value = null;
                } else if (data.value.tasa && data.value.tasa !== 0) {
                    dis_dol.value = null;
                    data.value.prec_uni_dolar = null;
                }
            }

        }
    );

    watch(
        () => data.value.prec_uni_dolar, (newVal) => {
            if (!dis_dol.value) {
                if (newVal && newVal !== 0 && data.value.tasa && data.value.tasa !== 0) {
                    data.value.prec_uni_bs = parseFloat((newVal * data.value.tasa).toFixed(2));
                    dis_bs.value = true;
                    dis_dol.value = null;
                } else if (data.value.tasa && data.value.tasa !== 0) {
                    dis_bs.value = null;
                    data.value.prec_uni_bs = null;
                }
            }

        }
    );




    return { items, items_prov, items_cat, headers, loading, fields, data, dialogOpen, section, alert, alertMsj, alertTitle, alertType, loading_button, title_form, loading_delete, delete_success, dis_bs, dis_dol, get, add, alertaCrud, form_add, delete_item, edit_item, modify, loading_info, dialogOpenInfo, items_info, headers_info, prod, get_detalle, edit_item_info, modify_info, delete_item_info, add_item };
})