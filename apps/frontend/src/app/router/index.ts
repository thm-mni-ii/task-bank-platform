import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/app/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/modules/dashboard/DashboardView.vue'),
      },
      { path: 'items', name: 'items', component: () => import('@/modules/items/ItemListView.vue') },
      {
        path: 'items/:id',
        name: 'item-detail',
        component: () => import('@/modules/items/ItemDetailView.vue'),
        props: true,
      },
      {
        path: 'items/create',
        name: 'item-create',
        component: () => import('@/modules/items/ItemFormView.vue'),
      },
      {
        path: 'items/:id/edit',
        name: 'item-edit',
        component: () => import('@/modules/items/ItemFormView.vue'),
        props: true,
      },
      {
        path: 'authors',
        name: 'authors',
        component: () => import('@/modules/authors/AuthorListView.vue'),
      },
      {
        path: 'licenses',
        name: 'licenses',
        component: () => import('@/modules/licenses/LicenseListView.vue'),
      },
      { path: 'tags', name: 'tags', component: () => import('@/modules/tags/TagListView.vue') },
      {
        path: 'item-types',
        name: 'item-types',
        component: () => import('@/modules/item-types/ItemTypeListView.vue'),
      },
      {
        path: 'item-content-types',
        name: 'item-content-types',
        component: () => import('@/modules/item-content-types/ItemContentTypeListView.vue'),
      },
      {
        path: 'modifiers',
        name: 'modifiers',
        component: () => import('@/modules/modifiers/ModifierListView.vue'),
      },
      {
        path: 'validators',
        name: 'validators',
        component: () => import('@/modules/validators/ValidatorListView.vue'),
      },
      {
        path: 'item-contents',
        name: 'item-contents',
        component: () => import('@/modules/item-contents/ItemContentListView.vue'),
      },
      {
        path: 'templates',
        name: 'templates',
        component: () => import('@/modules/templates/TemplateListView.vue'),
      },
      {
        path: 'collections',
        name: 'collections',
        component: () => import('@/modules/item-collections/CollectionListView.vue'),
      },
      {
        path: 'collections/:id',
        name: 'collection-detail',
        component: () => import('@/modules/item-collections/CollectionDetailView.vue'),
        props: true,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
