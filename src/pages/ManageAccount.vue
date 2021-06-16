<template>
  <q-page class="bg-brown-1">
    <div class="q-pa-md">
      <q-btn
        label="Add Officer"
        color="grey-9"
        text-color="white"
        icon-right="person"
        dense
        style="min-width: 150px"
        class="q-mb-md"
        @click="dialogPopup(true)"
      >
      </q-btn>

      <q-table title="Officers" :data="data" :columns="columns" row-key="name">
      </q-table>
    </div>
    <Dialog />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import Dialog from 'components/Dialog.vue';

@Component({
  components: {
    Dialog
  },
  computed: {
    ...mapState('officer', ['officers'])
  },
  methods: {
    ...mapActions('uiNav', ['dialogPopup'])
  }
})
export default class ManageAccount extends Vue {
  officers!: { [key: string]: string }[];
  columns = [
    {
      name: 'desc',
      required: true,
      label: 'ID Number',
      align: 'left',
      field: (row: { [key: string]: string }) => row.name,
      sortable: true
    },
    {
      name: 'firstName',
      align: 'left',
      label: 'First Name',
      field: 'firstName',
      sortable: true
    },
    {
      name: 'lastName',
      align: 'left',
      label: 'Last Name',
      field: 'lastName',
      sortable: true
    },
    {
      name: 'contactNumber',
      align: 'left',
      label: 'Contact Number',
      field: 'contactNumber',
      sortable: true
    }
  ];
  data: { [key: string]: string }[] = [];
  dialogPopup!: (isShow: boolean) => void;

  created() {
    this.data = this.officers;
  }
}
</script>
