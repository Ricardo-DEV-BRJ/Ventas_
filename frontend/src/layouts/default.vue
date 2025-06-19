<template>
  <div class="d-flex">
    <Sidebar v-if="route.path !== '/login'" />
    <Button_theme />
    <v-main>
      <router-view />
    </v-main>
  </div>

  <AppFooter />
</template>

<script setup>
const route = useRoute()
//
</script>
