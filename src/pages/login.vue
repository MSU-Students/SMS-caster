<template>
  <q-page class="fixed-center q-pt-xl">
    <q-card class="__card bg-red-10 text-white q-py-xl">
      <div class="text-center text-h4">Send SMS</div>
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
          label="login"
          color="white"
          text-color="black"
          @click="login()"
        ></q-btn>
      </q-card-actions>
    </q-card>
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
      login(){
          if(this.user.username == "abs" && this.user.password == "motkab"){
              this.$router.push("/");
          } else{
              alert("Invalid Username or Password");
          }
      }
  }
};
</script>

<style scoped>
.__card {
  width: 300px;
}
</style>