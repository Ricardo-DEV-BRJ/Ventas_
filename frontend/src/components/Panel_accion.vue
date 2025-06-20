<template>
    <v-col>
        <v-btn rounded color="primary" class="text-capitalize" :text="`Agregar ${store.section}`"
            @click="store.form_add"></v-btn>
    </v-col>

    <!-- <div v-if="$vuetify.display.mobile">
        <v-col>
            <v-btn @click.stop="drawer = !drawer" text="Acciones"></v-btn>
        </v-col>
        <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
            <v-list>
                <v-list-item><v-btn rounded color="primary" class="text-capitalize" :text="`Agregar ${store.section}`"
                        @click="store.form_add"></v-btn></v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div> -->
</template>

<script setup>

const props = defineProps({
    store: { type: Object, required: true }
})

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
    drawer.value = false
})
</script>