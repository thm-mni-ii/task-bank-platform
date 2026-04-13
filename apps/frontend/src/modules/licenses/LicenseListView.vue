<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Licenses</h1>
      <v-btn color="primary" @click="showDialog = true"
        ><v-icon start>mdi-plus</v-icon> New License</v-btn
      >
    </div>
    <v-alert v-if="error" type="error" class="mb-4">{{ error.message }}</v-alert>
    <v-data-table :headers="headers" :items="items" :loading="loading" class="elevation-1">
      <template #item.actions="{ item }">
        <v-btn icon size="small" @click="editItem(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon size="small" color="error" @click="confirmDelete(item)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </template>
    </v-data-table>
    <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title>{{ editing ? 'Edit' : 'New' }} License</v-card-title>
        <v-card-text>
          <v-select v-model="form.license" label="License" :items="licenseOptions" required />
        </v-card-text>
        <v-card-actions>
          <v-spacer /><v-btn @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" :loading="saving" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete License?</v-card-title>
        <v-card-actions
          ><v-spacer /><v-btn @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="doDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_LICENSES, CREATE_LICENSE, UPDATE_LICENSE, DELETE_LICENSE } from './graphql';

const showSnackbar = inject<(t: string, c?: string) => void>('showSnackbar')!;
const licenseOptions = [
  'CC0',
  'CC_BY',
  'CC_BY_SA',
  'CC_BY_NC',
  'CC_BY_NC_SA',
  'CC_BY_ND',
  'CC_BY_NC_ND',
];
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'License', key: 'license' },
  { title: 'Actions', key: 'actions', sortable: false, width: 120 },
];
const { result, loading, error, refetch } = useQuery(GET_LICENSES);
const items = ref<any[]>([]);
watch(
  () => result.value,
  (v) => {
    if (v) items.value = v.licenses;
  },
  { immediate: true },
);
const showDialog = ref(false);
const showDeleteDialog = ref(false);
const editing = ref(false);
const editingId = ref('');
const saving = ref(false);
const deleteTarget = ref<any>(null);
const form = ref({ license: '' });
const { mutate: createM } = useMutation(CREATE_LICENSE);
const { mutate: updateM } = useMutation(UPDATE_LICENSE);
const { mutate: deleteM } = useMutation(DELETE_LICENSE);
function editItem(item: any) {
  editing.value = true;
  editingId.value = item.id;
  form.value = { license: item.license };
  showDialog.value = true;
}
function closeDialog() {
  showDialog.value = false;
  editing.value = false;
  form.value = { license: '' };
}
async function save() {
  saving.value = true;
  try {
    if (editing.value) {
      await updateM({ id: editingId.value, input: form.value });
      showSnackbar('Updated');
    } else {
      await createM({ input: form.value });
      showSnackbar('Created');
    }
    await refetch();
    closeDialog();
  } catch (e: any) {
    showSnackbar(e.message, 'error');
  } finally {
    saving.value = false;
  }
}
function confirmDelete(item: any) {
  deleteTarget.value = item;
  showDeleteDialog.value = true;
}
async function doDelete() {
  try {
    await deleteM({ id: deleteTarget.value.id });
    showSnackbar('Deleted');
    await refetch();
  } catch (e: any) {
    showSnackbar(e.message, 'error');
  }
  showDeleteDialog.value = false;
}
</script>
