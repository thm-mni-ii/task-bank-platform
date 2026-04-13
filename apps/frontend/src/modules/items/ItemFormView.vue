<template>
  <div>
    <div class="d-flex align-center mb-4">
      <v-btn icon variant="text" :to="{ name: 'items' }"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <h1 class="text-h4 ml-2">{{ isEdit ? 'Edit Item' : 'Create Item' }}</h1>
    </div>
    <v-progress-linear v-if="loadingItem" indeterminate class="mb-4" />
    <v-card max-width="700">
      <v-card-text>
        <v-select v-model="form.authorId" :items="authorOptions" item-title="descriptor" item-value="id" label="Author" required />
        <v-select v-model="form.licenseId" :items="licenseOptions" item-title="license" item-value="id" label="License" required />
        <v-select v-model="form.itemTypeId" :items="typeOptions" item-title="itemTypeName" item-value="id" label="Item Type" required />
        <v-select v-model="form.itemTemplateId" :items="templateOptions" item-title="id" item-value="id" label="Template" required />
        <v-text-field v-model="form.rootItemId" label="Root Item ID (optional)" clearable />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :to="{ name: 'items' }">Cancel</v-btn>
        <v-btn color="primary" :loading="saving" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import {
  GET_ITEM, CREATE_ITEM, UPDATE_ITEM,
  GET_AUTHORS_SIMPLE, GET_LICENSES_SIMPLE, GET_ITEM_TYPES_SIMPLE, GET_TEMPLATES_SIMPLE,
} from './graphql';

const route = useRoute();
const router = useRouter();
const showSnackbar = inject<(t: string, c?: string) => void>('showSnackbar')!;

const isEdit = computed(() => !!route.params.id);
const itemId = computed(() => route.params.id as string | undefined);

const form = ref({ authorId: '', licenseId: '', itemTypeId: '', itemTemplateId: '', rootItemId: '' });
const saving = ref(false);

// Load existing item when editing
const { result: itemRes, loading: loadingItem } = useQuery(GET_ITEM, () => ({ id: itemId.value }), () => ({ enabled: isEdit.value }));
watch(() => itemRes.value, (v) => {
  if (v?.item) {
    const i = v.item;
    form.value = { authorId: i.authorId, licenseId: i.licenseId, itemTypeId: i.itemTypeId, itemTemplateId: i.itemTemplateId, rootItemId: i.rootItemId || '' };
  }
}, { immediate: true });

// Lookup data
const { result: authRes } = useQuery(GET_AUTHORS_SIMPLE);
const { result: licRes } = useQuery(GET_LICENSES_SIMPLE);
const { result: typeRes } = useQuery(GET_ITEM_TYPES_SIMPLE);
const { result: tmplRes } = useQuery(GET_TEMPLATES_SIMPLE);
const authorOptions = computed(() => authRes.value?.authors || []);
const licenseOptions = computed(() => licRes.value?.licenses || []);
const typeOptions = computed(() => typeRes.value?.itemTypes || []);
const templateOptions = computed(() => tmplRes.value?.itemRepresentationTemplates || []);

const { mutate: createM } = useMutation(CREATE_ITEM);
const { mutate: updateM } = useMutation(UPDATE_ITEM);

async function save() {
  saving.value = true;
  try {
    const input: any = { ...form.value };
    if (!input.rootItemId) delete input.rootItemId;
    if (isEdit.value) {
      await updateM({ id: itemId.value, input });
      showSnackbar('Item updated');
      router.push({ name: 'item-detail', params: { id: itemId.value } });
    } else {
      const res = await createM({ input });
      showSnackbar('Item created');
      router.push({ name: 'item-detail', params: { id: res?.data?.createItem?.id } });
    }
  } catch (e: any) { showSnackbar(e.message, 'error'); }
  finally { saving.value = false; }
}
</script>
