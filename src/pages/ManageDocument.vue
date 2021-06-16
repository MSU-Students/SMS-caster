<template>
  <q-page class="bg-brown-1">
    <div class="q-pa-md">
      <q-btn
        label="Add document"
        color="grey-9"
        text-color="white"
        icon-right="note_add"
        dense
        style="min-width: 150px"
        class="q-mb-md"
      ></q-btn>
      <q-table 
        title="Documents" 
        :columns="columns" 
        row-key="name">
         </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class ManageDocument extends Vue {
  columns = [
    {
      name: 'doc',
      label: 'Document No.',
      align: 'left'
    },
    {
      name: 'file',
      label: 'File',
      align: 'left',
      field: 'file'
    },
    {
      name: 'type',
      label: 'Document Type',
      align: 'left',
      field: 'type'
    },
    {
      name: 'status',
      label: 'Status',
      align: 'left',
      field: 'status'
    }
  ];
}
</script>
