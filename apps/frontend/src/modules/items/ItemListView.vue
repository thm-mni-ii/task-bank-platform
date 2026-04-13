<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Items</h1>
      <v-btn color="primary" :to="{ name: 'item-create' }"><v-icon start>mdi-plus</v-icon> New Item</v-btn>
    </div>
    <v-alert v-if="error" type="error" class="mb-4">{{ error.message }}</v-alert>
    <v-data-table :headers="headers" :items="items" :loading="loading" class="elevation-1">
      <template #item.actions="{ item }">
        <v-btn icon size="small" :to="{ name: 'item-detail', params: { id: item.id } }"><v-icon>mdi-eye</v-icon></v-btn>
        <v-btn icon size="small" :to="{ name: 'item-edit', params: { id: item.id } }"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon size="small" color="error" @click="confirmDelete(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card><v-card-title>Delete Item?</v-card-title>
        <v-card-actions><v-spacer /><v-btn @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="doDelete">Delete</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_ITEMS, DELETE_ITEM } from './graphql';

const showSnackbar = inject<(t: string, c?: string) => void>('showSnackbar')!;
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Author ID', key: 'authorId' },
  { title: 'License ID', key: 'licenseId' },
  { title: 'Item Type ID', key: 'itemTypeId' },
  { title: 'Template ID', key: 'itemTemplateId' },
  { title: 'Root Item ID', key: 'rootItemId' },
  { title: 'Actions', key: 'actions', sortable: false, width: 150 },
];
const { result, loading, error, refetch } = useQuery(GET_ITEMS);
const items = ref<any[]>([]);
watch(() => result.value, (v) => { if (v) items.value = v.items; }, { immediate: true });
const showDeleteDialog = ref(false);
const deleteTarget = ref<any>(null);
const { mutate: deleteM } = useMutation(DELETE_ITEM);
function confirmDelete(i: any) { deleteTarget.value = i; showDeleteDialog.value = true; }
async function doDelete() {
  try { await deleteM({ id: deleteTarget.value.id }); showSnackbar('Item deleted'); await refetch(); }
  catch (e: any) { showSnackbar(e.message, 'error'); }
  showDeleteDialog.value = false;
}
</script>
