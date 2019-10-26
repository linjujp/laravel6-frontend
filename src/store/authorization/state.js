import { LocalStorage } from "quasar";

export default {
  token:
    LocalStorage.has("token") & !LocalStorage.isEmpty("token")
      ? LocalStorage.getItem("token")
      : null,

  token_expires_at:
    LocalStorage.has("token_expires_at") &
    !LocalStorage.isEmpty("token_expires_at")
      ? LocalStorage.getItem("token_expires_at")
      : null,

  user:
    LocalStorage.has("user") & !LocalStorage.isEmpty("user")
      ? LocalStorage.getItem("user")
      : null
};
