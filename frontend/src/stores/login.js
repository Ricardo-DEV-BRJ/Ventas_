import { defineStore } from "pinia";
import { apiCall } from "../utils/apiCall";
export const useLoginStore = defineStore('login', () => {

    const data = ref({
        usuario: '',
        clave: ''
    })

    async function login() {
        let obj = {
            usuario: data.value.usuario,
            clave: data.value.clave
        }
        try {
            const result = await apiCall('usuarios/login', 'POST', obj)
            console.log(result)
        } catch (error) {
            console.error(error)
        }

    }

    function culo() {
        console.log('culo')
    }


    return { data, login, culo };
})