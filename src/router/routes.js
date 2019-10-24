import auth from "./auth/auth.js";
import dashboard from "./dashboard/dashboard.js";
import account from "./account/account.js";

const routes = [
  {
    path: "/",
    redirect: { name: "login" }
  },
  auth,
  dashboard,
  account
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
