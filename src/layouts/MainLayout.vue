<template>
  <q-layout>
    <q-header elevated class="bg-red-10">
      <q-toolbar>
        <!-- Menu
        <q-btn icon="menu" flat round size="sm"></q-btn> -->

        <!-- Title -->
        <!-- <q-toolbar-title>SMS CASTER</q-toolbar-title> -->
        <!-- Menu -->
        <q-btn
          v-if="$route.name != 'login-page'"
          icon="person"
          label="account"
          color="white"
          text-color="black"
        >
          <q-menu fit :offset="[0, 5]">
            <q-btn
              class="full-width"
              label="logout"
              color="white"
              text-color="black"
              to="/login"
            >
            </q-btn>
          </q-menu>
        </q-btn>
        <!-- Menu end -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>