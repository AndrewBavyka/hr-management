<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from "@/components/navigation/AppSidebar.vue"
import AppHeader from "@/components/header/AppHeader.vue"
</script>

<template>
  <AppSidebar />

  <main>
    <div class="content">
      <AppHeader />
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  margin-left: 16.25rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.content {
  /* padding-top: 1.875rem; */
  margin: 0 min(10vw, 1.875rem);
}
</style>
