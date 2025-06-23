<template>
    <v-navigation-drawer expand-on-hover rail>
        <v-list>
            <v-list-item :subtitle="`${nombre} ${apellido}`" :title="usuario" prepend-icon="mdi-shield-account"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item v-for="link in items" :prepend-icon="link.icon" :to="`/${link.ruta}`" :title="link.title"
                :value="link.value"></v-list-item>
            <v-list-item prepend-icon="mdi-logout"> <v-btn color="error" @click="logout">Cerrar
                    sesión</v-btn></v-list-item>
        </v-list>
    </v-navigation-drawer>


    <div v-if="$vuetify.display.mobile">
        <v-app-bar>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Ventas</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
            <v-list>
                <v-list-item v-for="link in items" :prepend-icon="link.icon" :to="`/${link.ruta}`" :title="link.title"
                    :value="link.value"></v-list-item>
                <v-list-item prepend-icon="mdi-logout"> <v-btn color="error" @click="logout">Cerrar
                        sesión</v-btn></v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getPersonApellido, getPersonNombre, getPersonUsuario } from '../utils/authdecode'

const router = useRouter()
const usuario = ref(getPersonUsuario())
const nombre = ref(getPersonNombre())
const apellido = ref(getPersonApellido())

const items = [
    {
        title: 'Dashboard',
        value: 'Dashboard',
        icon: 'mdi-chart-multiple',
        ruta: ''
    },
    {
        title: 'Clientes',
        value: 'Clientes',
        icon: 'mdi-clipboard-account',
        ruta: 'clientes'
    },
    {
        title: 'Agregar venta',
        value: 'Agregar venta',
        icon: 'mdi-cash-register',
        ruta: 'agregar_venta'
    },
    {
        title: 'Venta',
        value: 'Venta',
        icon: 'mdi-file-document-multiple-outline',
        ruta: 'venta'
    },
    {
        title: 'Proveedores',
        value: 'Proveedores',
        icon: 'mdi-table-account',
        ruta: 'proveedores'
    },
    {
        title: 'Categorías y productos',
        value: 'Categorias_productos',
        icon: 'mdi-shape',
        ruta: 'categorias_productos'
    },
    {
        title: 'Usuarios',
        value: 'Usuarios',
        icon: 'mdi-account-group',
        ruta: 'usuarios'
    },

]

function logout() {
    localStorage.removeItem('token')
    router.push({ path: '/login' })
}
const drawer = ref(false)
const group = ref(null)

watch(group, () => {
    drawer.value = false
})
</script>