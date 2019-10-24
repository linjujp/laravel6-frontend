export default {
  path: "/dashboard",
  component: () => import("layouts/admin.vue"),
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("pages/dashboard/Dashboard.vue")
    }
  ]
};
