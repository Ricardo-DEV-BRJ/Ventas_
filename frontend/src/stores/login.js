import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
export const useLoginStore = defineStore('login', () => {
    const router = useRouter()
    const data = ref({
        usuario: '',
        clave: ''
    })
    const loading = ref(false)


    async function login() {
        loading.value = true
        let obj = {
            usuario: data.value.usuario,
            clave: data.value.clave
        }
        try {
            const result = await apiCall('usuarios/login', 'POST', obj)
            loading.value = false
            if (result.token) {
                localStorage.setItem('token', result.token)
                console.log(result.msj)
                router.push({ path: '/', query: { usuario: data.value.usuario } })
            } else {
                console.log(result.msj)
            }
        } catch (error) {
            console.error(error)
        }

    }



    return { data, loading, login };
})