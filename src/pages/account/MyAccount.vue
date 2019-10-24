<template>
  <q-page padding>
    <div class="row">
      <div class="col-12" v-if="user">
        <div class="text-body1">
          {{ user ? user.name : "" }}
        </div>
        <div class="text-body1">
          {{ user ? user.email : "" }}
        </div>
        <div class="text-body1">Member Since: {{ memberSince }}</div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "MyAccount",
  data() {
    return {
      user: null
    };
  },
  computed: {
    url: {
      get() {
        return this.$store.state.settings.url;
      }
    },
    memberSince() {
      return this.user
        ? this.$moment(this.user.created_at).format("MMMM Do, YYYY")
        : "";
    }
  },
  methods: {
    getUser() {
      this.$axios
        .get(this.url + "user")
        .then(response => {
          this.user = response.data;
        })
        .catch(() => {
          this.$q.notify({
            message: "Unable to get user information.",
            type: "negative"
          });
        });
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>
