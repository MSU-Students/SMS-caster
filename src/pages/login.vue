<template>
  <q-page class="bg-grey-12 flex flex-center">
    <div class="row">
      <div class="col-6">
        <q-card class="q-pa-xl">
          <img
            class="__card bg-white q-py-lg"
            height="400px"
            width="400px"
            src="~assets/msuu.png"
          />
          <div class="text-subtitle2 text-center">
            Mindanao State University - Marawi City
          </div>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="__card q-py-lg">
          <q-card-section class="q-gutter-y-md">
            <q-input
              v-model="user.username"
              outlined
              label="Username"
              bg-color="white"
              color="black"
              ><template v-slot:prepend> <q-icon name="person" /></template>
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
              <template v-slot:prepend> <q-icon name="lock" /></template>
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

<script>
export default {
  data() {
    return {
      user: {},
      hidePassword: false,
    };
  },
  methods: {
    login() {
      if (this.user.username == "abs" && this.user.password == "abs") {
        this.$router.push("/");
      } else {
        // alert("Invalid Username or Password");
        
          this.$q.notify({
           type: 'warning',
           
            message: `Invalid Username or Password.`
          })
        };
    },
  },
};
</script>

<style scoped>
.__card {
  width: 350px;
}
</style>