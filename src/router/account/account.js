export default {
  path: "/account",
  component: () => import("layouts/admin.vue"),
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: "/",
      name: "account",
      component: () => import("pages/account/MyAccount.vue")
    }
  ]
};
