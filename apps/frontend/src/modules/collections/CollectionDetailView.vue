<template>
  <div>
    <div class="d-flex align-center mb-4">
      <v-btn icon variant="text" :to="{ name: 'collections' }"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <h1 class="text-h4 ml-2">Collection Detail</h1>
    </div>
    <v-progress-linear v-if="loading" indeterminate class="mb-4" />
    <v-alert v-if="error" type="error" class="mb-4">{{ error.message }}</v-alert>
    <template v-if="collection">
      <v-card class="mb-4">
        <v-card-title>Collection {{ collection.id }}</v-card-title>
        <v-card-text>
          <v-list density="compact">
            <v-list-item><strong>Parent Item ID:</strong>&nbsp;{{ collection.parentItemId }}</v-list-item>
            <v-list-item><strong>Order:</strong>&nbsp;{{ collection.order || 'None' }}</v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Sub-Items</v-card-title>
        <v-card-text>
          <v-data-table :headers="subHeaders" :items="subItems" density="compact">
            <template #item.actions="{ item }">
              <v-btn icon size="small" color="error" @click="removeSub(item)"><v-icon>mdi-delete</v-icon></v-btn>
            </template>
          </v-data-table>
          <v-divider class="my-3" />
          <div class="d-flex align-center" style="max-width: 500px">
            <v-select v-model="newSubItemId" :items="availableItems" item-title="id" item-value="id" label="Item" density="compact" hide-details class="mr-2" />
            <v-text-field v-model.number="newPosition" label="Position" type="number" density="compact" hide-details style="max-width: 100px" class="mr-2" />
            <v-btn @click="addSub">Add</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_COLLECTION, ADD_SUB_ITEM, REMOVE_SUB_ITEM, GET_ITEMS_SIMPLE } from './graphql';

const route = useRoute();
const collectionId = computed(() => route.params.id as string);
const showSnackbar = inject<(t: string, c?: string) => void>('showSnackbar')!;

const { result, loading, error, refetch } = useQuery(GET_COLLECTION, () => ({ id: collectionId.value }));
const collection = ref<any>(null);
const subItems = ref<any[]>([]);
watch(() => result.value, (v) => {
  if (v) { collection.value = v.itemCollection; subItems.value = v.subItemsByCollection || []; }
}, { immediate: true });

const subHeaders = [
  { title: 'Sub-Item ID', key: 'subitemId' },
  { title: 'Position', key: 'position' },
  { title: 'Actions', key: 'actions', sortable: false, width: 80 },
];

const { result: itemsRes } = useQuery(GET_ITEMS_SIMPLE);
const availableItems = computed(() => itemsRes.value?.items || []);
const newSubItemId = ref('');
const newPosition = ref(0);

const { mutate: addSubM } = useMutation(ADD_SUB_ITEM);
const { mutate: rmSubM } = useMutation(REMOVE_SUB_ITEM);

async function addSub() {
  if (!newSubItemId.value) return;
  try {
    await addSubM({ input: { itemCollectionId: collectionId.value, subitemId: newSubItemId.value, position: newPosition.value } });
    newSubItemId.value = ''; newPosition.value = 0;
    await refetch();
  } catch (e: any) { showSnackbar(e.message, 'error'); }
}

async function removeSub(item: any) {
  try { await rmSubM({ itemCollectionId: collectionId.value, subitemId: item.subitemId }); await refetch(); }
  catch (e: any) { showSnackbar(e.message, 'error'); }
}
</script>
