<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "blank",
  data() {
    return {};
  },
  methods: {
    openURL
  },
  mounted() {
    this.$axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest"
    };
  }
};
</script>

<style></style>
