<template>
  <nav :class="STYLES.nav">
    <div :class="STYLES.pageCount">Page {{ PROPS.pageCurrent }} of {{ PROPS.pagesTotal }}</div>
    <div v-if="PROPS.pageCurrent > 1" :class="STYLES.navigateButton" @click="onPageUpdate(PROPS.pageCurrent - 1)">
      <ArrowLongLeftIcon class="size-5" aria-hidden="true" />
      Previous
    </div>
    <div
      v-if="PROPS.pageCurrent < PROPS.pagesTotal"
      :class="[STYLES.navigateButton, 'ml-3']"
      @click="onPageUpdate(PROPS.pageCurrent + 1)"
    >
      Next
      <ArrowLongRightIcon class="size-5" aria-hidden="true" />
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

  interface Props {
    pageCurrent: number;
    pagesTotal: number;
  }
  const PROPS = defineProps<Props>();

  const STYLES = {
    nav: 'w-full mx-auto flex items-center justify-between px-4',
    navigateButton:
      'inline-flex gap-3 items-center text-sm font-medium text-white hover:text-blue-500 hover:cursor-pointer',
    pageCount: 'text-sm mr-auto font-medium'
  };

  const EMITS = defineEmits(['page-update']);

  function onPageUpdate(page: number) {
    EMITS('page-update', page);
  }
</script>
