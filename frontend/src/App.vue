<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from "./components/navigation/AppSidebar.vue"
</script>

<template>
  <AppSidebar />

  <main>
    <div class="content">
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
  background-color: red;
  margin: 0 min(10vw, 1.875rem);
}
</style>
