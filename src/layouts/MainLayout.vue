<template>
  <q-layout>
    <q-header elevated class="bg-red-10">
      <q-toolbar>
        <q-toolbar-title>SMS CASTER</q-toolbar-title>
        <q-btn
          v-if="$route.name != 'login-page'"
          rounded          
          icon="person"
          icon-right="arrow_drop_down"
          color="white"
          text-color="black"
        >
          <q-menu fit :offset="[0, 5]">
              <q-btn
                flat
                align="left" 
                class="q-pa-sm full-width"       
                label="Account Settings"
                color="white"
                size="md"
                icon="settings"
                text-color="black"
                >
              </q-btn>
              <q-btn
                flat
                align="left" 
                class="q-pa-sm full-width"        
                label="logout"
                color="white"
                size="md"
                icon="logout"
                text-color="black"
                to="/login"
              >
              </q-btn>
          </q-menu>
        </q-btn>
        <!-- Menu end -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$route.name != 'login-page'"
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="500"
      bordered
      content-class="bg-white"
    >
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="dashboard" size="md" />
        </q-item-section>

        <q-item-section class="text-subtitle2t="> 
          Dashboard 
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="contacts" size="md" />
        </q-item-section>
        <q-item-section class="text-subtitle2">
          Manage Contacts
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="topic" size="md" />
        </q-item-section>
        <q-item-section class="text-subtitle2">
          Manage Documents
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="manage_accounts" size="md" />
        </q-item-section>
        <q-item-section class="text-subtitle2">
          Manage Accounts
        </q-item-section>
      </q-item>
    </q-drawer>
    <q-footer elevated class="bg-red-10">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle2 text-center">Copyrights 2021</q-toolbar-title>
      </q-toolbar>
    </q-footer>
    
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>