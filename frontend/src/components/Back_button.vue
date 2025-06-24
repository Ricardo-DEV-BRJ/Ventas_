<template>
    <div class="position-fixed pa-4">
        <v-btn class="tema" icon="mdi-arrow-left-thick"
            @click="back_link">
        </v-btn>
    </div>
</template>

<script setup>
const router = useRouter()


function back_link() {
    router.push('venta')
}
</script>


<style scoped>
.tema {
    z-index: 9999999;
    left: 0;
}
</style>