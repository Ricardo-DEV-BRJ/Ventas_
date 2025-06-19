import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
export const useLoginStore = defineStore('login', () => {
    const router = useRouter()
    const data = ref({
        usuario: '',
        clave: ''
    })
    const loading = ref(false)

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
            } else {
            }
            loading.value = false
        } catch (error) {
            console.error(error)
        }

    }



    return { data, loading, login };
})