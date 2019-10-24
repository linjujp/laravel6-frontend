import { LocalStorage } from "quasar";

export function setToken(state, token) {
  state.token = token;
  LocalStorage.set("token", token);
}

export function setTokenExpiresAt(state, date) {
  state.token_expires_at = date;
  LocalStorage.set("token_expires_at", date);
}
