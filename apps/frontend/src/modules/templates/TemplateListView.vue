<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Representation Templates</h1>
      <v-btn color="primary" @click="showDialog = true"><v-icon start>mdi-plus</v-icon> New</v-btn>
    </div>
    <v-alert v-if="error" type="error" class="mb-4">{{ error.message }}</v-alert>
    <v-data-table :headers="headers" :items="items" :loading="loading" class="elevation-1">
      <template #item.template="{ item }">
        <code>{{ JSON.stringify(item.template).substring(0, 80) }}{{ JSON.stringify(item.template).length > 80 ? '...' : '' }}</code>
      </template>
      <template #item.actions="{ item }">
        <v-btn icon size="small" @click="editItem(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon size="small" color="error" @click="confirmDelete(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title>{{ editing ? 'Edit' : 'New' }} Template</v-card-title>
        <v-card-text>
          <v-textarea v-model="templateJson" label="Template (JSON)" rows="6" required :error-messages="jsonError" />
        </v-card-text>
        <v-card-actions><v-spacer /><v-btn @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" :loading="saving" @click="save">Save</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card><v-card-title>Delete?</v-card-title>
        <v-card-actions><v-spacer /><v-btn @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="doDelete">Delete</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, computed } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_TEMPLATES, CREATE_TEMPLATE, UPDATE_TEMPLATE, DELETE_TEMPLATE } from './graphql';
const showSnackbar = inject<(t: string, c?: string) => void>('showSnackbar')!;
const headers = [{ title: 'ID', key: 'id' }, { title: 'Template', key: 'template' }, { title: 'Actions', key: 'actions', sortable: false, width: 120 }];
const { result, loading, error, refetch } = useQuery(GET_TEMPLATES);
const items = ref<any[]>([]);
watch(() => result.value, (v) => { if (v) items.value = v.itemRepresentationTemplates; }, { immediate: true });
const showDialog = ref(false); const showDeleteDialog = ref(false);
const editing = ref(false); const editingId = ref(''); const saving = ref(false); const deleteTarget = ref<any>(null);
const templateJson = ref('{}');
const jsonError = computed(() => { try { JSON.parse(templateJson.value); return []; } catch { return ['Invalid JSON']; } });
const { mutate: createM } = useMutation(CREATE_TEMPLATE);
const { mutate: updateM } = useMutation(UPDATE_TEMPLATE);
const { mutate: deleteM } = useMutation(DELETE_TEMPLATE);
function editItem(i: any) { editing.value = true; editingId.value = i.id; templateJson.value = JSON.stringify(i.template, null, 2); showDialog.value = true; }
function closeDialog() { showDialog.value = false; editing.value = false; templateJson.value = '{}'; }
async function save() {
  if (jsonError.value.length) return;
  saving.value = true;
  try {
    const input = { template: JSON.parse(templateJson.value) };
    if (editing.value) { await updateM({ id: editingId.value, input }); } else { await createM({ input }); }
    showSnackbar('Saved'); await refetch(); closeDialog();
  } catch (e: any) { showSnackbar(e.message, 'error'); } finally { saving.value = false; }
}
function confirmDelete(i: any) { deleteTarget.value = i; showDeleteDialog.value = true; }
async function doDelete() { try { await deleteM({ id: deleteTarget.value.id }); showSnackbar('Deleted'); await refetch(); } catch (e: any) { showSnackbar(e.message, 'error'); } showDeleteDialog.value = false; }
</script>
