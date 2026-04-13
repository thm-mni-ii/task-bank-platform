<template>
  <div>
    <h1 class="text-h4 mb-4">Dashboard</h1>
    <v-row>
      <v-col v-for="card in cards" :key="card.title" cols="12" sm="6" md="4" lg="3">
        <v-card :to="card.to" class="pa-4" hover>
          <v-card-item>
            <template #prepend>
              <v-icon :icon="card.icon" size="40" color="primary" />
            </template>
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-6 pa-4">
      <v-card-title>About Task Bank Platform</v-card-title>
      <v-card-text>
        <p>
          This platform manages tasks (Items) in a learning system. Each Item represents exactly one
          task. Items can have variants (horizontal variation via Modifiers and derivation) and can
          be composed into collections (vertical composition via Item_Collection).
        </p>
        <p class="mt-2">Use the navigation to manage all entities in the system.</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const cards = [
  { title: 'Items', subtitle: 'Manage tasks', icon: 'mdi-file-document', to: '/items' },
  { title: 'Authors', subtitle: 'Manage authors', icon: 'mdi-account-group', to: '/authors' },
  { title: 'Tags', subtitle: 'Classify items', icon: 'mdi-tag-multiple', to: '/tags' },
  {
    title: 'Collections',
    subtitle: 'Group items',
    icon: 'mdi-folder-multiple',
    to: '/collections',
  },
  { title: 'Modifiers', subtitle: 'Task variants', icon: 'mdi-tune', to: '/modifiers' },
  {
    title: 'Validators',
    subtitle: 'Validation rules',
    icon: 'mdi-check-decagram',
    to: '/validators',
  },
  { title: 'Licenses', subtitle: 'License types', icon: 'mdi-license', to: '/licenses' },
  { title: 'Item Types', subtitle: 'Type categories', icon: 'mdi-shape', to: '/item-types' },
];
</script>
