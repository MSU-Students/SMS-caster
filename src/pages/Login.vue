<template>
  <q-page class="flex flex-center bg-secondary">
    <div class="row">
      <div class="col-7">
        <q-card flat class="fit">
          <img src="~assets/LoginPic1.png" class="__imag __card1" />
        </q-card>
      </div>
      <div class="col-5">
        <q-card elevated flat bordered class="__card bg-negative">
          <q-card-section class="q-gutter-y-md  flex flex-center outlined">
            <q-img class="__img" src="~assets/Login.png" />
            <div class="text-white text-overline">Log in your account</div>
            <q-input
              style="width: 300px"
              class="center"
              v-model="user.username"
              outlined
              rounded
              label="ID Number"
              bg-color="white"
              mask="#########"
              color="black"
              ><template v-slot:prepend> <q-icon name="person"/></template>
            </q-input>
            <q-input
              style="width: 300px"
              v-model="user.password"
              outlined
              rounded
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
          <q-card-actions class="flex flex-center">
            <q-btn
              class="__btn q-py-xs"
              rounded
              size="md"
              label="login"
              color="white"
              text-color="negative"
              @click="login()"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { OfficersReq } from 'src/services/rest-api';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

interface User {
  username: string;
  password: string;
}

@Component({
  computed: {
    ...mapState('officer', ['officers'])
  },
  methods: {
    ...mapActions('officer', ['getOfficers', 'updateOfficer'])
  }
})
export default class Login extends Vue {
  officers!: OfficersReq[];
  getOfficers!: () => Promise<void>;
  updateOfficer!: (payload: any) => Promise<void>;
  user: User = {
    username: '',
    password: ''
  };
  hidePassword = false;
  async login(): Promise<void> {
    await this.getOfficers();
    if (
      this.officers.find(
        o =>
          this.user.password == o.password &&
          this.user.username == o.name &&
          o.accountType == 'admin'
      )
    ) {
      this.$q.notify({
        type: 'success',
        message: 'Logged in as Admin'
      });
      await this.updateOfficer({
        ...this.officers.find(
          o =>
            this.user.password == o.password &&
            this.user.username == o.name &&
            o.accountType == 'admin'
        ),
        session: true
      });
      await this.getOfficers();
      await this.$store.dispatch('uiNav/isAdminLogin', true);
      await this.$router.push('/');
    } else if (
      this.officers.find(
        o =>
          this.user.password == o.password &&
          this.user.username == o.name &&
          o.accountType == 'officer'
      )
    ) {
      await this.getOfficers();
      await this.updateOfficer({
        ...this.officers.find(
          o =>
            this.user.password == o.password &&
            this.user.username == o.name &&
            o.accountType == 'officer'
        ),
        session: true
      });
      this.$q.notify({
        type: 'success',
        message: 'Logged in as Officer'
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
.__card1{
  background-image: url('~assets/LoginPic.jpg');
}
.__card {
  width: 400px;
  height: 500px;
}
.__btn {
  width: 250px;
}
.__img {
  height: 200px;
}
.__imgg {
  width: 600px;
  height: 500px;
}
.__imag {
  height: 500px;
}
</style>
