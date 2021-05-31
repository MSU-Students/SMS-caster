import MainLayout from "src/layouts/MainLayout.vue";
import mainpage from "src/pages/mainpage.vue";
import login from "src/pages/login.vue";

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: "",
        component: mainpage
      },

      {
        path: "login",
        name: "login-page",
        component: login
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
