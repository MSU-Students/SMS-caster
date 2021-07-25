<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-black bg-info"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="delivered" label="Message Logs" />
          <q-tab name="contact" label="Contacts" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="delivered">
            <q-table
              class="my-sticky-dynamic text-black"
              title="Logs"
              :data="logs"
              :columns="columnsms"
              row-key="date"
              virtual-scroll
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
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                </q-tr>
              </template>
              <template v-slot:top-right>
                <div class="q-col-gutter-x-md">
                  <div>
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
          </q-tab-panel>

          <q-tab-panel name="contact">
            <div class="row">
              <div class="col-10">
                <q-btn
                  label="Import Data"
                  color="dark"
                  text-color="white"
                  icon-right="upload"
                  dense
                  style="min-width: 150px"
                  class="q-mb-md"
                  @click="uploadContactsPopups(true)"
                >
                </q-btn>
              </div>
              <div class="col-2">
                <q-btn
                  label="Archive"
                  color="dark"
                  text-color="white"
                  icon-right="archive"
                  dense
                  style="min-width: 150px"
                  class="q-mb-md"
                  @click="exportTable"
                >
                </q-btn>
              </div>
            </div>
            <q-table
              class="my-sticky-dynamic text-black"
              title="Contacts"
              :data="data"
              :columns="columns"
              :filter="searchFilter"
              row-key="contact"
              virtual-scroll
              :pagination.sync="pagination"
              :rows-per-page-options="[0]"
              style="height: 80vh"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    class="text-black size-md"
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                  <q-th auto-width class="text-black"></q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                  <q-td auto-width> </q-td>
                </q-tr>
              </template>
              <template v-slot:top-right>
                <div class="row q-col-gutter-x-md">
                  <div class="col-6">
                    <q-select
                      v-model="selectFilter"
                      :options="filterOptions"
                      label="Offices/Colleges"
                      outlined
                      dense
                      clearable
                      clear-icon
                      style="min-width: 150px"
                      @input="selectedCollege($event)"
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
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <UploadContactsDialog />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import UploadContactsDialog from 'src/components/UploadContactsDialog.vue';
import IRecipient from 'src/interfaces/recipient.interface';
import IMessage from 'src/interfaces/message.interface';

@Component({
  components: {
    UploadContactsDialog
  },
  computed: {
    ...mapState('recipient', ['recipients', 'newRecipients', 'institution']),
    ...mapState('message', ['messages'])
  },
  methods: {
    ...mapActions('recipient', [
      'setInstitution',
      'getContacts',
      'filterInstitution'
    ]),
    ...mapActions('message', ['GetMessages']),
    ...mapActions('uiNav', ['uploadContactsPopups'])
  }
})
export default class ManageContact extends Vue {
  pagination = {
    rowsPerPage: 0
  };
  tab = 'delivered';
  recipients!: IRecipient[];
  messages!: IMessage[];
  newRecipients!: IRecipient[];
  institution!: string[];
  searchFilter = '';
  selectFilter = '';
  filterOptions: string[] = [];
  setInstitution!: () => void;
  uploadContactsPopups!: (show: boolean) => void;
  getContacts!: () => Promise<any[]>;
  GetMessages!: () => Promise<any[]>;
  filterInstitution!: (payload: string) => Promise<void>;
  columns = [
    {
      name: 'desc',
      required: true,
      label: 'Contact No.',
      align: 'left',
      field: (row: IRecipient) => row.contact,
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
      name: 'status',
      align: 'left',
      label: 'Status',
      field: 'status',
      sortable: true
    },
    {
      name: 'institution',
      align: 'left',
      label: 'Office / College',
      field: 'institution',
      sortable: true
    }
  ];
  columnsms = [
    {
      name: 'desc',
      required: true,
      label: 'Date',
      align: 'left',
      field: 'date',
      sortable: true
    },
    {
      name: 'recipient',
      align: 'left',
      label: 'Recipient',
      field: 'recipient',
      sortable: true
    },
    {
      name: 'subject',
      align: 'left',
      label: 'Document Subject',
      field: 'subject',
      sortable: true
    },
    {
      name: 'message',
      align: 'left',
      label: 'Message',
      field: 'message',
      sortable: true
    }
  ];
  data: IRecipient[] = [];
  logs: IMessage[] = [];
  async created() {
    await this.getContacts();
    await this.GetMessages();
    this.setInstitution();
    this.data = this.recipients;
    this.logs = this.messages;
    this.filterOptions = this.institution;
  }

  clickSelectOption() {
    this.setInstitution();
    this.filterOptions = this.institution;
    console.log('hello');
  }

  async selectedCollege(institution: string) {
    await this.filterInstitution(institution);
    this.data = this.newRecipients;
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
