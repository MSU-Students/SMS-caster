<template>
  <q-page class="bg-brown-1 flex flex-center">
    <div class="row">
      <div class="col-8 text-center">
        <img
          class="__card q-ma-lg"
          height="350px"
          width="350px"
          src="~assets/msu-logo.png"
        />
        <q-card class="q-ml-xlm">
          <div class="text-subtitle2 text-center q-ma-lg">
            Mindanao State University - Marawi City
            <br />
            Office of Information, Press and Publication
            <br /><br />
            {{ definition }}
          </div>
        </q-card>
      </div>
      <div class="col-4 q-pa-xl">
        <q-card class="__card q-py-lg">
          <q-card-section class="q-gutter-y-md">
            <q-input
              v-model="user.username"
              outlined
              label="ID Number"
              bg-color="white"
              mask="#########"
              color="black"
              ><template v-slot:prepend> <q-icon name="person"/></template>
            </q-input>
            <q-input
              v-model="user.password"
              outlined
              label="Password"
              bg-color="white"
              color="black"
              :type="hidePassword ? '' : 'password'"
              @keypress.enter="login()"
            >
              <template v-slot:prepend> <q-icon name="lock"/></template>
              <template v-slot:append>
                <q-icon
                  :name="hidePassword ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="hidePassword = !hidePassword"
                ></q-icon
              ></template>
            </q-input>
          </q-card-section>
          <q-card-actions>
            <q-btn
              class="full-width"
              size="lg"
              label="login"
              color="red-10"
              text-color="white"
              @click="login()"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';

interface User {
  username: string;
  password: string;
}

interface Officers {
  name: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  password: string;
  accountType: string;
}

@Component({
  computed: {
    ...mapState('officer', ['officers'])
  }
})
export default class Login extends Vue {
  officers!: Officers[];
  user: User = {
    username: '',
    password: ''
  };
  hidePassword = false;
  definition = `Office of Information, Press and Publication was republished in the year 1970, dated August 15, 
        1970 it was an office recommended by the president and successfully approved during that time, 
        until now Office of Information, Press and Publications is under the command of the Office of the President.`;

  async login(): Promise<void> {
    if (
      this.officers.find(
        o =>
          this.user.password == o.password &&
          this.user.username == o.name &&
          o.accountType == 'Admin'
      )
    ) {
      this.$q.notify({
        type: 'success',
        message: 'Logged in as Admin'
      });
      await this.$store.dispatch('uiNav/isAdminLogin', true);
      await this.$router.push('/');
    } else if (
      this.officers.find(
        o =>
          this.user.password == o.password &&
          this.user.username == o.name &&
          o.accountType == 'Logged in as Officer'
      )
    ) {
      this.$q.notify({
        type: 'success',
        message: 'Officer'
      });
      await this.$store.dispatch('uiNav/isAdminLogin', false);
      await this.$router.push('/');
    } else {
      this.$q.notify({
        type: 'warning',
        message: 'Invalid Username or Password.'
      });
    }
  }
}
</script>

<style scoped>
.__card {
  width: 350px;
}
</style>
