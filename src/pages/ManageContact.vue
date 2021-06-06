<template>
  <q-page class="bg-grey-12">
    <div class="q-pa-md">
      <q-table
        title="Contacts"
        :data="data"
        :columns="columns"
        row-key="name"
        dark
        color="amber"
      />
    </div>
  </q-page>
</template>