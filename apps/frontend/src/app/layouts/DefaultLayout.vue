<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list-item title="Task Bank" subtitle="Platform" class="pa-4" />
      <v-divider />
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { provide } from 'vue';

const navItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
  { title: 'Items', icon: 'mdi-file-document', to: '/items' },
  { title: 'Authors', icon: 'mdi-account-group', to: '/authors' },
  { title: 'Licenses', icon: 'mdi-license', to: '/licenses' },
  { title: 'Tags', icon: 'mdi-tag-multiple', to: '/tags' },
  { title: 'Item Types', icon: 'mdi-shape', to: '/item-types' },
  { title: 'Content Types', icon: 'mdi-file-cog', to: '/item-content-types' },
  { title: 'Modifiers', icon: 'mdi-tune', to: '/modifiers' },
  { title: 'Validators', icon: 'mdi-check-decagram', to: '/validators' },
  { title: 'Item Contents', icon: 'mdi-file-multiple', to: '/item-contents' },
  { title: 'Templates', icon: 'mdi-file-code', to: '/templates' },
  { title: 'Collections', icon: 'mdi-folder-multiple', to: '/collections' },
];

const snackbar = reactive({ show: false, text: '', color: 'success' });

function showSnackbar(text: string, color = 'success') {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.show = true;
}

provide('showSnackbar', showSnackbar);
</script>
