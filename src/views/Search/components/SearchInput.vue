<template>
  <div :class="STYLES.searchInputWrapper">
    <div :class="STYLES.searchInputInner">
      <div :class="STYLES.inputContainer">
        <input
          v-model="DATA.searchInput"
          :class="STYLES.searchInput"
          :placeholder="'Search by title...'"
          type="text"
          @keyup.enter="onClickSubmit"
        />
        <button
          :class="STYLES.submitButton"
          :disabled="PROPS.isLoading || !DATA.searchInput"
          type="button"
          @click="onClickSubmit"
        >
          {{ PROPS.isLoading ? 'Searching...' : 'Submit' }}
        </button>
      </div>
      <div v-if="PROPS.error" :class="STYLES.error">{{ PROPS.error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useSearchStore } from '../../../stores/search';
  import { onMounted, reactive } from 'vue';

  interface Props {
    error?: string;
    isLoading?: boolean;
  }
  const PROPS = defineProps<Props>();
  const SEARCH_STORE = useSearchStore();
  const { gPiniaSearchTerm } = storeToRefs(SEARCH_STORE);

  const EMIT = defineEmits(['submit']);

  const DATA = reactive({
    searchInput: ''
  });

  const STYLES = {
    error: 'text-red-400 text-sm text-center',
    inputContainer: 'flex flex-col gap-4 w-full sm:flex-row',
    searchInput: 'w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none',
    searchInputInner: 'flex flex-col gap-2 p-4 my-4 mx-auto w-full rounded-lg bg-gray-800 max-w-4xl',
    searchInputWrapper: 'w-full px-4 mt-4',
    submitButton:
      'w-full rounded-lg p-2 bg-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 sm:w-30'
  };

  function onClickSubmit() {
    if (!PROPS.isLoading && DATA.searchInput) {
      EMIT('submit', { searchTerm: DATA.searchInput });
    }
  }

  onMounted(() => {
    DATA.searchInput = gPiniaSearchTerm.value ?? '';
  });
</script>
