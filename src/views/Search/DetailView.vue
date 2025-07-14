<template>
  <div :class="STYLES.wrapper">
    <div :class="STYLES.details">
      <img
        alt="Poster Not Found"
        :class="STYLES.img"
        :src="gPiniaDetails.Poster"
        @error="error => (error.target as HTMLImageElement).src = 'https://critics.io/img/movies/poster-placeholder.png'"
      />
      <h1>{{ `${gPiniaDetails.Title} (${gPiniaDetails.Year})` }}</h1>
      <div>
        <span class="font-medium">Type: </span>
        <span>{{ gPiniaDetails.Type }}</span>
      </div>
      <div>
        <span class="font-medium">Rated: </span>
        <span>{{ gPiniaDetails.Rated }}</span>
      </div>
      <div>
        <span class="font-medium">Runtime: </span>
        <span>{{ gPiniaDetails.Runtime }}</span>
      </div>
      <div>
        <span class="font-medium">Genre: </span>
        <span>{{ gPiniaDetails.Genre }}</span>
      </div>
      <div>
        <span class="font-medium">Director: </span>
        <span>{{ gPiniaDetails.Director }}</span>
      </div>
      <div>
        <span class="font-medium">Writer: </span>
        <span>{{ gPiniaDetails.Writer }}</span>
      </div>
      <div>
        <span class="font-medium">Actors: </span>
        <span>{{ gPiniaDetails.Actors }}</span>
      </div>
      <div>
        <span class="font-medium">Plot: </span>
        <span>{{ gPiniaDetails.Plot }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useSearchStore } from '../../stores/search';

  const SEARCH_STORE = useSearchStore();
  const { gPiniaDetails } = storeToRefs(SEARCH_STORE);

  const STYLES = {
    details: 'max-w-sm p-4 mx-auto flex flex-col gap-2',
    img: 'max-w-2xs h-auto my-2 mx-auto',
    wrapper: 'flex flex-col h-full min-h-screen bg-gray-900 text-white'
  };
</script>
