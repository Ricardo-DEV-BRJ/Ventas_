<template>
    <div>
        Detalle venta
    </div>
    <div v-if="id"> {{ id }} </div>
    <div v-else> Sin datos selecionados </div>

</template>

<script setup> 
const route = useRoute()
const id = ref(null)
onMounted(()=>{
   id.value = route.query.id_ven
})
</script>