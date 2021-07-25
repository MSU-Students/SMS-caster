<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-btn
        label="Add document"
        color="dark"
        text-color="white"
        icon-right="note_add"
        dense
        style="min-width: 150px"
        class="q-mb-md"
        @click="addDocsPopups(true)"
      ></q-btn>
      <q-table
        class="my-sticky-dynamic text-black"
        title="Documents"
        :columns="columns"
        :data="data"
        :filter="searchFilter"
        row-key="name"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        style="height: 80vh"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              class="text-black"
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th auto-width class="text-black">Action</q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn
                size="sm"
                color="green"
                icon="edit"
                round
                dense
                class="q-mr-sm"
                @click="editDocument(props.row)"
              >
                <q-tooltip>Edit Document</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="green"
                icon="download"
                round
                dense
                class="q-mr-sm"
                @click="viewDocument(props.row)"
              >
                <q-tooltip>Download Document</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                icon="message"
                round
                dense
                class="q-mr-sm"
                :color="props.row.smsStatus ? 'red' : 'green'"
                @click="sendMessage(props.row)"
              >
                <q-tooltip>
                  <span v-if="!props.row.smsStatus">Send Message</span>
                  <span v-else>Already sent!</span>
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-right>
          <div class="row q-col-gutter-x-md">
            <div class="col-6">
              <q-select
                v-model="selectFilter"
                :options="filterOptions"
                label="Academic Year"
                outlined
                dense
                clearable
                clear-icon
                style="min-width: 150px"
                @input="selectedacadYear($event)"
                @popup-show="clickSelectOption()"
              />
            </div>
            <div class="col-6">
              <q-input
                dense
                debounce="300"
                v-model="searchFilter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </template>
      </q-table>
    </div>
    <SendMessageDialog :document="document" />
    <AddDocsDialog :document="document" @clearData="clearData" />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import AddDocsDialog from 'src/components/AddDocsDialog.vue';
import SendMessageDialog from 'src/components/SendMessageDialog.vue';
import IDocument from 'src/interfaces/document.interface';

@Component({
  components: {
    AddDocsDialog,
    SendMessageDialog
  },
  computed: {
    ...mapState('document', ['documents', 'newDocuments', 'acadYear'])
  },
  methods: {
    ...mapActions('uiNav', ['addDocsPopups', 'sendMessagePopups']),
    ...mapActions('document', [
      'getDocuments',
      'setacademicYear',
      'filteracadYear'
    ])
  }
})
export default class ManageDocument extends Vue {
  document: any = {
    name: '',
    subject: '',
    docType: '',
    date: '',
    smsStatus: false,
    contentType: [],
    docFile: [],
    semester: '',
    acadYear: ''
  };
  pagination = {
    rowsPerPage: 0
  };
  columns = [
    {
      name: 'desc',
      required: true,
      label: 'ID Number',
      align: 'left',
      field: (row: IDocument) => row.name,
      sortable: true
    },
    {
      name: 'subject',
      align: 'left',
      label: 'Subject',
      field: 'subject',
      sortable: 'true'
    },
    {
      name: 'docType',
      align: 'left',
      label: 'Document Type',
      field: 'docType',
      sortable: true
    },
    {
      name: 'date',
      align: 'left',
      label: 'Date Posted',
      field: 'date',
      sortable: true
    },
    {
      name: 'acadYear',
      align: 'left',
      label: 'Academic Year',
      field: 'acadYear',
      sortable: true
    },
    {
      name: 'semester',
      align: 'left',
      label: 'Semester',
      field: 'semester',
      sortable: true
    }
  ];
  data: IDocument[] = [];
  documents!: IDocument[];
  selectFilter = '';
  acadYear!: string[];
  filterOptions: string[] = [];
  newDocuments!: IDocument[];
  searchFilter = '';
  filteracadYear!: (payload: string) => Promise<void>;
  setacademicYear!: () => void;
  addDocsPopups!: (show: boolean) => void;
  sendMessagePopups!: (show: boolean) => void;
  getDocuments!: () => Promise<void>;

  @Watch('documents')
  onDocumentsChanged(val: any) {
    this.data = val;
  }

  async created() {
    await this.getDocuments();
    this.setacademicYear();
    this.data = this.documents;
    this.filterOptions = this.acadYear;
  }

  clearData(val: IDocument) {
    this.document = val;
  }

  sendMessage(document: IDocument) {
    this.document = document;
    this.sendMessagePopups(true);
  }

  editDocument(document: IDocument) {
    this.document = { ...document, onUpdate: true };
    this.addDocsPopups(true);
  }

  viewDocument(payload: any) {
    const linkSource = payload.file;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.click();
  }

  clickSelectOption() {
    this.setacademicYear();
    this.filterOptions = this.acadYear;
    console.log('hello');
  }

  async selectedacadYear(acadYear: string) {
    await this.filteracadYear(acadYear);
    this.data = this.newDocuments;
  }
}
</script>

<style lang="sass" scoped>
.my-sticky-dynamic
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #d2b50d

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
