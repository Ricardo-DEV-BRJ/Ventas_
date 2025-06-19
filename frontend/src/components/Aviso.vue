<template>
    <v-col cols="12" sm="8" md="5" lg="3" class="position-absolute flotar">
        <v-expand-transition>
            <v-card v-show="store.alert">
                <v-alert closable :color="store.alertType" :title="store.alertTitle" >
                    <p v-for="(mensaje, index) in store.alertMsj" :key="index">
                        {{ mensaje }}
                    </p>
                </v-alert>
            </v-card>
        </v-expand-transition>
    </v-col>
</template>

<script setup>
const alert = ref(true)
const props = defineProps({
    store: { type: Object, required: true }
})

</script>

<style scoped>
.flotar {
    z-index: 9999999;
    top: 0;
}
</style>