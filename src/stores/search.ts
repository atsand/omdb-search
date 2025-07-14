// stores/search.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import type { Detail, Preview } from '../types/search';

const API_KEY = '3f66eca5';
const URL_BASE = 'http://www.omdbapi.com/';

export const useSearchStore = defineStore('search', {
  state: () => ({
    detail: {} as Detail,
    pageCurrent: 1,
    searchResults: [] as Preview[],
    searchTerm: '',
    totalResults: 0
  }),

  getters: {
    gPiniaDetails: (state): Detail => state.detail ?? {},
    gPiniaPageCurrent: (state): number => state.pageCurrent ?? 1,
    gPiniaPagesTotal: (state): number => Math.ceil(state.totalResults / 10),
    gPiniaSearchResults: (state): Preview[] =>
      Array.isArray(state.searchResults) ? state.searchResults : [],
    gPiniaSearchTerm: (state): string => state.searchTerm ?? '',
    gPiniaTotalSearchResults: (state): number => state.totalResults ?? 0
  },

  actions: {
    async aPiniaGetDetail(imdbID: string): Promise<void|Error> {
      try {
        const REQUEST_URL = `${URL_BASE}?apikey=${API_KEY}&i=${imdbID}`;
        const RESPONSE = await axios.get(REQUEST_URL);

        if (RESPONSE.status === 200 && RESPONSE.data?.Response === 'True') {
          this.detail = RESPONSE.data;
        } else {
          this.detail = {} as Detail;

          throw new Error(RESPONSE.data?.Error ?? 'Error getting details');
        }
      } catch (error) {
        this.detail = {} as Detail;

        throw new Error('Error getting details');
      }
    },

    async aPiniaGetSearch(searchTerm: string, page: number = 1): Promise<void|Error> {
      try {
        const REQUEST_URL = `${URL_BASE}?apikey=${API_KEY}&s=${searchTerm}&page=${page}`;
        const { data } = await axios.get(REQUEST_URL);

        if (data?.Response === 'True') {
          this.pageCurrent = page;
          this.searchResults = data.Search ?? [];
          this.searchTerm = searchTerm;
          this.totalResults = !Number.isNaN(parseInt(data.totalResults))
            ? parseInt(data.totalResults)
            : 0;
        } else {
          this.pageCurrent = page;
          this.searchResults = [];
          this.totalResults = 0;

          throw new Error(data.Error ?? 'Error getting search results');
        }
      } catch (error) {
        this.pageCurrent = 1;
        this.searchResults = [];
        this.totalResults = 0;

        throw new Error('Error getting search results');
      }
    }
  }
});
