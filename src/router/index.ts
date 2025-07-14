import { createRouter, createWebHistory } from 'vue-router';
import DetailView from '../views/Search/DetailView.vue';
import SearchView from '../views/Search/SearchView.vue';

const ROUTES = [
  {
    component: SearchView,
    path: '/',
  },
  {
    component: DetailView,
    path: '/detail'
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: ROUTES
})