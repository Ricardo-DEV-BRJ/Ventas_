<template>
  <div class="d-flex">
    <Sidebar v-if="route.path !== '/login'" />
    <v-main>
      <router-view />
    </v-main>
    <Button_theme />
  </div>

  <AppFooter />
</template>

<script setup>
import { getToken } from '@/utils/authdecode';
const route = useRoute()
const router = useRouter()
const token = getToken()

onMounted(() => {
  if (token === null || token === undefined) {
    router.push({ path: '/login' })
  }
})
//
</script>
