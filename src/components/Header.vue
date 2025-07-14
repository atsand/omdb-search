<template>
  <div :class="STYLES.wrapper">
    <div v-if="ROUTE.path !== '/'" :class="STYLES.backButton" @click="ROUTER.back()">
      <ArrowLongLeftIcon class="size-5" aria-hidden="true" />
      Back
    </div>
    <h1 :class="STYLES.h1">OMDB Search</h1>
  </div>
</template>

<script setup lang="ts">
  import { ArrowLongLeftIcon } from '@heroicons/vue/20/solid';
  import { useRoute, useRouter } from 'vue-router';

  const ROUTE = useRoute();
  const ROUTER = useRouter();

  const STYLES = {
    backButton:
      'inline-flex gap-3 items-center text-sm font-medium text-white hover:text-blue-500 hover:cursor-pointer',
    h1: 'ml-auto text-lg text-white font-semibold',
    wrapper: 'py-4 px-6 bg-gray-800 shadow-md flex sticky top-0'
  };
</script>
