<template>
  <div :class="STYLES.wrapper">
    <SearchInput :error="DATA.error" :is-loading="DATA.isLoading" @submit="onSearch" />
    <SearchResults
      v-if="gPiniaSearchResults?.length"
      :results="gPiniaSearchResults"
      @page-update="onPageUpdate"
      @view-detail="onViewDetail"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Search } from '../../types/search';
  import { reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useSearchStore } from '../../stores/search';
  import SearchInput from './components/SearchInput.vue';
  import SearchResults from './components/SearchResults.vue';

  const ROUTER = useRouter();
  const SEARCH_STORE = useSearchStore();
  const { gPiniaSearchResults, gPiniaSearchTerm } = storeToRefs(SEARCH_STORE);

  const STYLES = {
    wrapper: 'flex flex-col h-full bg-gray-900 text-white'
  };

  const DATA = reactive({
    error: '',
    isLoading: false
  });

  function onSearch(event: Search) {
    DATA.error = '';
    DATA.isLoading = true;

    SEARCH_STORE.aPiniaGetSearch(event.searchTerm, event.page)
      .catch((error: Error) => {
        DATA.error = error.message;
      })
      .finally(() => {
        DATA.isLoading = false;
      });
  }

  function onPageUpdate(page: number) {
    onSearch({
      page,
      searchTerm: gPiniaSearchTerm.value
    });
  }

  function onViewDetail(imdbID: string) {
    SEARCH_STORE.aPiniaGetDetail(imdbID)
      .then(() => ROUTER.push('detail'))
      .catch((error: Error) => {
        DATA.error = error.message;
      });
  }
</script>
