
<script setup>
import Sidebar from './components/Sidebar.vue'
import MiniTimer from './components/MiniTimer.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <MiniTimer v-if="route.path !== '/pomo-foco'" />
    <Sidebar />
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>
  </div>
</template>



