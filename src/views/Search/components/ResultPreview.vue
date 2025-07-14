<template>
  <div :class="STYLES.wrapper" @click="onViewDetail(PROPS.preview.imdbID)">
    <h2>{{ `${PROPS.preview.Title} (${PROPS.preview.Year})` }}</h2>
    <img
      alt="Poster Not Found"
      :class="STYLES.img"
      :src="PROPS.preview.Poster"
      @error="error => (error.target as HTMLImageElement).src = 'https://critics.io/img/movies/poster-placeholder.png'"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Preview } from '../../../types/search';

  interface Props {
    preview: Preview;
  }
  const PROPS = defineProps<Props>();

  const STYLES = {
    img: 'max-h-[400px] w-auto my-auto mx-auto',
    wrapper: [
      'w-sm min-h-[474px] p-2 flex flex-col gap-2 align-center text-center bg-gray-700 text-white rounded-lg',
      'hover:bg-gray-600 hover:cursor-pointer'
    ]
  };

  const EMITS = defineEmits(['view-detail']);

  function onViewDetail(imdbID: string) {
    EMITS('view-detail', imdbID);
  }
</script>
