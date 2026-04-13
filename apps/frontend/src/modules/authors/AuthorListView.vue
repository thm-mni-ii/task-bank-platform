<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Authors</h1>
      <v-btn color="primary" @click="showDialog = true">
        <v-icon start>mdi-plus</v-icon> New Author
      </v-btn>
    </div>

    <v-alert v-if="error" type="error" class="mb-4">{{ error.message }}</v-alert>

    <v-data-table :headers="headers" :items="authors" :loading="loading" class="elevation-1">
      <template #item.actions="{ item }">
        <v-btn icon size="small" @click="editItem(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon size="small" color="error" @click="confirmDelete(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title>{{ editing ? 'Edit Author' : 'New Author' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.descriptor" label="Descriptor" required />
          <v-text-field v-model="form.mail" label="Mail" type="email" required />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" :loading="saving" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Author?</v-card-title>
        <v-card-text>Are you sure you want to delete "{{ deleteTarget?.descriptor }}"?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="doDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_AUTHORS, CREATE_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR } from './graphql';

const showSnackbar = inject<(text: string, color?: string) => void>('showSnackbar')!;

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Descriptor', key: 'descriptor', sortable: true },
  { title: 'Mail', key: 'mail', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, width: 120 },
];

const { result, loading, error, refetch } = useQuery(GET_AUTHORS);
const authors = ref<any[]>([]);
import { watch } from 'vue';
watch(
  () => result.value,
  (val) => {
    if (val) authors.value = val.authors;
  },
  { immediate: true },
);

const showDialog = ref(false);
const showDeleteDialog = ref(false);
const editing = ref(false);
const editingId = ref('');
const saving = ref(false);
const deleteTarget = ref<any>(null);
const form = ref({ descriptor: '', mail: '' });

const { mutate: createMutation } = useMutation(CREATE_AUTHOR);
const { mutate: updateMutation } = useMutation(UPDATE_AUTHOR);
const { mutate: deleteMutation } = useMutation(DELETE_AUTHOR);

function editItem(item: any) {
  editing.value = true;
  editingId.value = item.id;
  form.value = { descriptor: item.descriptor, mail: item.mail };
  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
  editing.value = false;
  editingId.value = '';
  form.value = { descriptor: '', mail: '' };
}

async function save() {
  saving.value = true;
  try {
    if (editing.value) {
      await updateMutation({ id: editingId.value, input: form.value });
      showSnackbar('Author updated');
    } else {
      await createMutation({ input: form.value });
      showSnackbar('Author created');
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
    await deleteMutation({ id: deleteTarget.value.id });
    showSnackbar('Author deleted');
    await refetch();
  } catch (e: any) {
    showSnackbar(e.message, 'error');
  }
  showDeleteDialog.value = false;
}
</script>
