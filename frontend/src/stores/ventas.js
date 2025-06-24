import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
export const useVentasStore = defineStore('ventas', () => {
    const router = useRouter()
    const loading = ref(false)
    const items = ref([])
    const section = 'Venta'


    const headers = ref([
        { key: 'fec_ven', title: 'Fecha' },
        { key: 'tip_factura', title: 'Tipo de factura' },
        { key: 'num_fac', title: 'Número de factura' },
        { key: 'monto', title: 'Monto' },
        { key: 'detalle', title: 'Detalle' },
        { key: 'aten_por', title: 'Atendido por' },

    ])

    async function get() {
        loading.value = true
        try {
            const result = await apiCall('ventas')
            items.value = result.map((item) => ({
                ...item,
                fec_ven: new Date(item.fec_ven).toLocaleDateString('es-VE')
            }))
            loading.value = false
        } catch (error) {
            console.log(error)
        }
    }

    function form_add() {
        router.push('agregar_venta')
    }

    function get_detalle(item) {
        router.push({path:'detalle_venta', query:{id_ven:item.id_ven}})
    }


    onMounted(async () => {
        get()
    })



    return { items, headers, loading, section, get, form_add, get_detalle };
})