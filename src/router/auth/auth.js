export default {
  path: "/auth",
  component: () => import("layouts/blank.vue"),
  meta: {
    guest: true
  },
  children: [
    {
      path: "login",
      name: "login",
      component: () => import("pages/auth/Login.vue")
    },
    {
      path: "register",
      name: "register",
      component: () => import("pages/auth/Register.vue")
    }
  ]
};
