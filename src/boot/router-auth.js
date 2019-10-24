import axios from "axios";
import moment from "moment";
import { LocalStorage } from "quasar";

export default ({ router, store }) => {
  let is_expired = null;
  if (
    store.state.authorization.token_expires_at !== null &&
    store.state.authorization.token !== null
  ) {
    is_expired = moment().isAfter(store.state.authorization.token_expires_at);
    if (is_expired) {
      axios.post(store.state.settings.url + "logout");
      LocalStorage.clear();
      store.state.authorization.token_expires_at = null;
      store.state.authorization.token = null;
    }
  }

  console.log(moment().isAfter(store.state.authorization.token_expires_at));

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.state.authorization.token) {
        next({
          name: "login",
          params: { nextUrl: to.fullPath }
        });
      } else {
        axios.defaults.headers.common = {
          Authorization: "Bearer " + store.state.authorization.token
        };
        next();
      }
    } else if (to.matched.some(record => record.meta.guest)) {
      if (!store.state.authorization.token) {
        next();
      } else {
        axios.defaults.headers.common = {
          Authorization: "Bearer " + store.state.authorization.token
        };
        next({
          name: "account",
          params: { nextUrl: to.fullPath }
        });
      }
    }
  });
};
