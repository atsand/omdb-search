<template>
  <div :class="STYLES.wrapper">
    <div :class="STYLES.resultsCount">{{ gPiniaTotalSearchResults }} results for "{{ gPiniaSearchTerm }}"</div>
    <div :class="STYLES.results">
      <!-- There are some duplicate entries being returned so I use the title, year, and index to create a unique key -->
      <ResultPreview
        v-for="(result, index) in PROPS.results"
        :key="result.Title + result.Year + index"
        :preview="result"
        @view-detail="onViewDetail"
      />
    </div>
    <Pagination
      v-if="gPiniaPagesTotal > 1"
      :page-current="gPiniaPageCurrent"
      :pages-total="gPiniaPagesTotal"
      @page-update="onPageUpdate"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Preview } from '../../../types/search';
  import { useSearchStore } from '../../../stores/search';
  import { storeToRefs } from 'pinia';
  import Pagination from '../../../components/Pagination.vue';
  import ResultPreview from './ResultPreview.vue';

  interface Props {
    results: Preview[];
  }
  const PROPS = defineProps<Props>();
  const SEARCH_STORE = useSearchStore();
  const { gPiniaPageCurrent, gPiniaPagesTotal, gPiniaSearchTerm, gPiniaTotalSearchResults } = storeToRefs(SEARCH_STORE);

  const STYLES = {
    results: 'w-full mx-auto mb-4 flex justify-center gap-4 flex-wrap max-w-[80%]',
    resultsCount: 'max-w-[80%] mx-auto mb-4',
    wrapper: 'w-full px-2 pb-4 flex flex-col overflow-auto'
  };

  const EMITS = defineEmits(['page-update', 'view-detail']);

  function onPageUpdate(page: number) {
    EMITS('page-update', page);
  }

  function onViewDetail(imdbID: string) {
    EMITS('view-detail', imdbID);
  }
</script>
