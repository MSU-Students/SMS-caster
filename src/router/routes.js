import MainLayout from "src/layouts/MainLayout.vue";
import homePage from "src/pages/homePage.vue";
import login from "src/pages/login.vue";
import ManageAccount from "src/pages/ManageAccount.vue";
import ManageDocument from "src/pages/ManageDocument.vue";
import ManageContact from "src/pages/ManageContact.vue";

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: "",
        name: "homepage",
        component: homePage
      },

      {
        path: "login",
        name: "login-page",
        component: login
      },

      {
        path: "ManageAccount",
        name: "manageaccount-page",
        component: ManageAccount
      },

      {
        path: "ManageDocument",
        name: "managedocument-page",
        component: ManageDocument
      },

      {
        path: "ManageContact",
        name: "managecontact-page",
        component: ManageContact
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
