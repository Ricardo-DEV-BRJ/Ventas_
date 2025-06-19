<template>
    <v-navigation-drawer expand-on-hover rail>
        <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item v-for="link in items" :prepend-icon="link.icon" :to="`/${link.ruta}`" :title="link.title"
                :value="link.value"></v-list-item>
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
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

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
        title: 'Categorías',
        value: 'Categorias',
        icon: 'mdi-shape',
        ruta: 'categorias'
    },
    {
        title: 'Productos',
        value: 'Productos',
        icon: 'mdi-food-apple',
        ruta: 'productos'
    },
    {
        title: 'Usuarios',
        value: 'Usuarios',
        icon: 'mdi-account-group',
        ruta: 'usuarios'
    },

]

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
    drawer.value = false
})
</script>