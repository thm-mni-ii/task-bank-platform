<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Item Contents</h1>
      <v-btn color="primary" @click="showDialog = true"><v-icon start>mdi-plus</v-icon> New</v-btn>
    </div>
    <v-alert v-if="error" type="error" class="mb-4">{{ error.message }}</v-alert>
    <v-data-table :headers="headers" :items="items" :loading="loading" class="elevation-1">
      <template #item.actions="{ item }">
        <v-btn icon size="small" @click="editItem(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon size="small" color="error" @click="confirmDelete(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title>{{ editing ? 'Edit' : 'New' }} Item Content</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.authorId" label="Author ID" required />
          <v-text-field v-model="form.licenseId" label="License ID" required />
          <v-text-field v-model="form.itemMaterialTypeId" label="Content Type ID" required />
          <v-textarea v-model="form.jsonSerializedContent" label="JSON Content" rows="4" />
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
import { ref, watch, inject } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_ITEM_CONTENTS, CREATE_ITEM_CONTENT, UPDATE_ITEM_CONTENT, DELETE_ITEM_CONTENT } from './graphql';
const showSnackbar = inject<(t: string, c?: string) => void>('showSnackbar')!;
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Author ID', key: 'authorId' },
  { title: 'License ID', key: 'licenseId' },
  { title: 'Content Type ID', key: 'itemMaterialTypeId' },
  { title: 'Actions', key: 'actions', sortable: false, width: 120 },
];
const { result, loading, error, refetch } = useQuery(GET_ITEM_CONTENTS);
const items = ref<any[]>([]);
watch(() => result.value, (v) => { if (v) items.value = v.itemContents; }, { immediate: true });
const showDialog = ref(false); const showDeleteDialog = ref(false);
const editing = ref(false); const editingId = ref(''); const saving = ref(false); const deleteTarget = ref<any>(null);
const form = ref({ authorId: '', licenseId: '', itemMaterialTypeId: '', jsonSerializedContent: '' });
const { mutate: createM } = useMutation(CREATE_ITEM_CONTENT);
const { mutate: updateM } = useMutation(UPDATE_ITEM_CONTENT);
const { mutate: deleteM } = useMutation(DELETE_ITEM_CONTENT);
function editItem(i: any) { editing.value = true; editingId.value = i.id; form.value = { authorId: i.authorId, licenseId: i.licenseId, itemMaterialTypeId: i.itemMaterialTypeId, jsonSerializedContent: i.jsonSerializedContent || '' }; showDialog.value = true; }
function closeDialog() { showDialog.value = false; editing.value = false; form.value = { authorId: '', licenseId: '', itemMaterialTypeId: '', jsonSerializedContent: '' }; }
async function save() {
  saving.value = true;
  try {
    const input: any = { ...form.value };
    if (input.jsonSerializedContent) { try { input.jsonSerializedContent = JSON.parse(input.jsonSerializedContent); } catch { /* keep as string */ } }
    else { delete input.jsonSerializedContent; }
    if (editing.value) { await updateM({ id: editingId.value, input }); } else { await createM({ input }); }
    showSnackbar('Saved'); await refetch(); closeDialog();
  } catch (e: any) { showSnackbar(e.message, 'error'); } finally { saving.value = false; }
}
function confirmDelete(i: any) { deleteTarget.value = i; showDeleteDialog.value = true; }
async function doDelete() { try { await deleteM({ id: deleteTarget.value.id }); showSnackbar('Deleted'); await refetch(); } catch (e: any) { showSnackbar(e.message, 'error'); } showDeleteDialog.value = false; }
</script>
