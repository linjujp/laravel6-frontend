<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-bar class="q-py-lg">
        <div class="cursor-pointer" :to="{ name: 'dashboard' }">
          Default
        </div>
        <q-space />

        <div>
          <q-btn icon="account_box" round flat color="white" size="md">
            <q-menu fit square>
              <q-list dense class="no-border-radius text-right">
                <q-item v-if="user" class="q-my-md" :title="user.email">
                  <q-item-section class="text-left">
                    <div>
                      {{ user.name }}
                    </div>
                    <div class="text-caption text-grey">
                      {{ user.roles ? user.roles[0].name : "" }}
                    </div>
                  </q-item-section>
                  <q-item-section side right>
                    <q-icon name="account_box" color="primary" size="2em" />
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section label>Log Out</q-item-section>
                  <q-item-section side right
                    ><q-icon name="exit_to_app"
                  /></q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-bar>

      <div class="row flex items-center">
        <q-btn flat class="text-capitalize text-weight-light">
          File
          <q-menu>
            <q-list dense style="min-width: 200px" class="no-border-radius">
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-space />
        <div class="text-caption q-px-md">{{ time }}</div>
      </div>
    </q-header>

    <q-page-container>
      <transition
        name="transitions"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <router-view :key="$route.fullPath" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      time: null
    };
  },
  computed: {
    title: {
      get() {
        return this.$store.state.settings.title;
      }
    },
    url: {
      get() {
        return this.$store.state.settings.url;
      }
    },
    user: {
      get() {
        return this.$store.state.authorization.user;
      },
      set(data) {
        this.$store.commit("authorization/setUser", data);
        this.$q.localStorage.set("user", data);
      }
    },
    memberSince() {
      return this.user
        ? this.$moment(this.user.created_at).format("MMMM Do, YYYY")
        : "";
    }
  },
  methods: {
    logout() {
      this.$axios.post(this.url + "logout").then(response => {
        console.log(response);
      });
      this.$q.localStorage.clear();
      this.$router.go("login");
    },
    setTime() {
      var self = this;
      this.time = self.$moment().format("MMMM Do, YYYY h:mm:ss A");
      setTimeout(self.setTime, 1000);
    },
    getUser() {
      if (this.user === null) {
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
    }
  },
  async mounted() {
    this.setTime();
    this.getUser();
  }
};
</script>
