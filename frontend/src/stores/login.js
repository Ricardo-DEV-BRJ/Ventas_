import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
export const useLoginStore = defineStore('login', () => {
    const router = useRouter()
    const data = ref({
        usuario: '',
        clave: ''
    })
    const loading = ref(false)

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

    function clear() {
        data.value = {
            usuario: '',
            clave: ''
        }
    }

    async function login() {
        loading.value = true
        let obj = {
            usuario: data.value.usuario,
            clave: data.value.clave
        }
        try {
            const result = await apiCall('usuarios/login', 'POST', obj)
            if (result.token) {
                localStorage.setItem('token', result.token)
                router.push({ path: '/', query: { login: true } })
                clear()
            }
            if (result.msj_error) {
                alertaCrud('Error de verificacion', true, [result.msj_error], 'warning')
                loading.value = false
                return;
            }
            loading.value = false
        } catch (error) {
            console.error(error)
        }

    }



    return { data, loading, alert, alertMsj, alertTitle, alertType, login, alertaCrud };
})