<template>
  <div>
    <div class="d-flex align-center mb-4">
      <v-btn icon variant="text" :to="{ name: 'items' }"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <h1 class="text-h4 ml-2">Item Detail</h1>
    </div>
    <v-progress-linear v-if="loading" indeterminate class="mb-4" />
    <v-alert v-if="error" type="error" class="mb-4">{{ error.message }}</v-alert>
    <template v-if="item">
      <v-card class="mb-4">
        <v-card-title>Item {{ item.id }}</v-card-title>
        <v-card-text>
          <v-list density="compact">
            <v-list-item><strong>Author ID:</strong>&nbsp;{{ item.authorId }}</v-list-item>
            <v-list-item><strong>License ID:</strong>&nbsp;{{ item.licenseId }}</v-list-item>
            <v-list-item><strong>Item Type ID:</strong>&nbsp;{{ item.itemTypeId }}</v-list-item>
            <v-list-item><strong>Template ID:</strong>&nbsp;{{ item.itemTemplateId }}</v-list-item>
            <v-list-item v-if="item.rootItemId"><strong>Root Item ID:</strong>&nbsp;{{ item.rootItemId }}</v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :to="{ name: 'item-edit', params: { id: item.id } }">Edit</v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="mb-4">
        <v-card-title>Tags</v-card-title>
        <v-card-text>
          <v-chip v-for="t in tags" :key="t.id" class="ma-1" closable @click:close="removeTag(t.id)">{{ t.tag }}</v-chip>
          <div class="mt-2 d-flex align-center" style="max-width: 400px">
            <v-select v-model="newTagId" :items="availableTags" item-title="tag" item-value="id" label="Add Tag" density="compact" hide-details class="mr-2" />
            <v-btn size="small" @click="addTag">Add</v-btn>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mb-4">
        <v-card-title>Modifiers</v-card-title>
        <v-card-text>
          <v-chip v-for="m in modifiers" :key="m.id" class="ma-1" closable @click:close="removeModifier(m.id)">{{ m.modifier }}</v-chip>
          <div class="mt-2 d-flex align-center" style="max-width: 400px">
            <v-select v-model="newModId" :items="availableMods" item-title="modifier" item-value="id" label="Add Modifier" density="compact" hide-details class="mr-2" />
            <v-btn size="small" @click="addMod">Add</v-btn>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mb-4">
        <v-card-title>Validators</v-card-title>
        <v-card-text>
          <v-chip v-for="v in validators" :key="v.id" class="ma-1" closable @click:close="removeValidator(v.id)">{{ v.validator }}</v-chip>
          <div class="mt-2 d-flex align-center" style="max-width: 400px">
            <v-select v-model="newValId" :items="availableVals" item-title="validator" item-value="id" label="Add Validator" density="compact" hide-details class="mr-2" />
            <v-btn size="small" @click="addVal">Add</v-btn>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Assigned Contents</v-card-title>
        <v-card-text>
          <v-data-table :headers="contentHeaders" :items="contents" density="compact" />
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import {
  GET_ITEM, ADD_TAG_TO_ITEM, REMOVE_TAG_FROM_ITEM,
  ADD_MODIFIER_TO_ITEM, REMOVE_MODIFIER_FROM_ITEM,
  ADD_VALIDATOR_TO_ITEM, REMOVE_VALIDATOR_FROM_ITEM,
  GET_TAGS_SIMPLE, GET_MODIFIERS_SIMPLE, GET_VALIDATORS_SIMPLE,
} from './graphql';

const route = useRoute();
const itemId = computed(() => route.params.id as string);
const showSnackbar = inject<(t: string, c?: string) => void>('showSnackbar')!;

const { result, loading, error, refetch } = useQuery(GET_ITEM, () => ({ id: itemId.value }));
const item = ref<any>(null);
const tags = ref<any[]>([]);
const modifiers = ref<any[]>([]);
const validators = ref<any[]>([]);
const contents = ref<any[]>([]);
watch(() => result.value, (v) => {
  if (v) {
    item.value = v.item;
    tags.value = v.tagsByItem || [];
    modifiers.value = v.modifiersByItem || [];
    validators.value = v.validatorsByItem || [];
    contents.value = v.itemContentsByItem || [];
  }
}, { immediate: true });

const contentHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'Content ID', key: 'itemMaterialId' },
  { title: 'Purpose', key: 'purpose' },
];

// Lookups
const { result: tagsRes } = useQuery(GET_TAGS_SIMPLE);
const { result: modsRes } = useQuery(GET_MODIFIERS_SIMPLE);
const { result: valsRes } = useQuery(GET_VALIDATORS_SIMPLE);
const availableTags = computed(() => tagsRes.value?.tags || []);
const availableMods = computed(() => modsRes.value?.modifiers || []);
const availableVals = computed(() => valsRes.value?.validators || []);

const newTagId = ref('');
const newModId = ref('');
const newValId = ref('');

const { mutate: addTagM } = useMutation(ADD_TAG_TO_ITEM);
const { mutate: rmTagM } = useMutation(REMOVE_TAG_FROM_ITEM);
const { mutate: addModM } = useMutation(ADD_MODIFIER_TO_ITEM);
const { mutate: rmModM } = useMutation(REMOVE_MODIFIER_FROM_ITEM);
const { mutate: addValM } = useMutation(ADD_VALIDATOR_TO_ITEM);
const { mutate: rmValM } = useMutation(REMOVE_VALIDATOR_FROM_ITEM);

async function addTag() { if (!newTagId.value) return; try { await addTagM({ itemId: itemId.value, tagId: newTagId.value }); newTagId.value = ''; await refetch(); } catch (e: any) { showSnackbar(e.message, 'error'); } }
async function removeTag(tagId: string) { try { await rmTagM({ itemId: itemId.value, tagId }); await refetch(); } catch (e: any) { showSnackbar(e.message, 'error'); } }
async function addMod() { if (!newModId.value) return; try { await addModM({ itemId: itemId.value, modifierId: newModId.value }); newModId.value = ''; await refetch(); } catch (e: any) { showSnackbar(e.message, 'error'); } }
async function removeModifier(modifierId: string) { try { await rmModM({ itemId: itemId.value, modifierId }); await refetch(); } catch (e: any) { showSnackbar(e.message, 'error'); } }
async function addVal() { if (!newValId.value) return; try { await addValM({ itemId: itemId.value, validatorId: newValId.value }); newValId.value = ''; await refetch(); } catch (e: any) { showSnackbar(e.message, 'error'); } }
async function removeValidator(validatorId: string) { try { await rmValM({ itemId: itemId.value, validatorId }); await refetch(); } catch (e: any) { showSnackbar(e.message, 'error'); } }
</script>
