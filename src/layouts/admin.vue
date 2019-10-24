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
                <q-item clickable v-close-popup :to="{ name: 'account' }">
                  <q-item-section label>Account</q-item-section>
                  <q-item-section side right
                    ><q-icon name="account_circle"
                  /></q-item-section>
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
    }
  },
  async mounted() {
    this.setTime();
  }
};
</script>
