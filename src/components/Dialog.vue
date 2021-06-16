<template>
  <q-dialog v-model="isShow">
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar>
          <img src="~assets/addperson.png" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold"
          >ADD NEW OFFICER</q-toolbar-title
        >
      </q-toolbar>
      <q-card-section class="q-gutter-y-md">
        <q-input v-model="officer.name" filled label="ID Number" />
        <q-input v-model="officer.fName" filled label="First Name" />
        <q-input v-model="officer.lName" filled label="Last Name" />
        <q-input v-model="officer.contactNum" filled label="Contact Number" />
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Create"
            color="grey-9"
            text-color="white"
            @click="addOfficer()"
          ></q-btn>
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Cancel"
            color="grey-9"
            text-color="white"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState('uiNav', ['isShow'])
  }
})
export default class Dialog extends Vue {
  isShow!: boolean;
  officer = {
    name: '',
    fName: '',
    lName: '',
    contactNum: ''
  };
  shouldShow = false;

  created() {
    this.shouldShow = this.isShow;
  }

  async addOfficer() {
    await this.$store.dispatch('officer/addOfficer', this.officer);
    await this.$store.dispatch('uiNav/dialogPopup', false);
    this.officer = { name: '', fName: '', lName: '', contactNum: '' };
  }
}
</script>

<style scoped>
.__card {
  width: 500px;
}
</style>
