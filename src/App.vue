<template>
  <div class="bg-gray-900 min-h-[100vh]">
    <Header />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from './components/Header.vue';
</script>
