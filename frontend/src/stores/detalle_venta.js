import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
export const useDetalleVentaStore = defineStore('detalle_venta', () => {
    const loading = ref(false)
    const items = ref([])
    const items_ven = ref([])
    const items_pag = ref([])
    const section = 'Detalle'

    const headers = ref([
        { key: 'nom_prod', title: 'Producto' },
        { key: 'cantidad', title: 'Cantidad' },
        { key: 'prec_uni', title: 'Precio Unitario' },
        { key: 'monto', title: 'Monto', align:'end' },
    ])

    async function get(id) {
        loading.value = true
        let obj = { id_ven: id }
        var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        try {
            const result = await apiCall('ventas/detalle', 'POST', obj)
            items.value = result.map(item => ({
                ...item,
                fec_ven: new Date(item.fec_ven).toLocaleDateString('es-VE',(options))
            }))
            items_ven.value = JSON.parse(result[0].descrip)
            items_pag.value = JSON.parse(result[0].met_ref)
            loading.value = false
        } catch (error) {
            console.log(error)
        }
    }





    return { items, items_ven, items_pag, headers, loading, section, get };
})