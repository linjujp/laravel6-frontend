<template>
  <q-page padding class="flex flex-center ">
    <div class="row flex fullscreen items-center justify-center">
      <div class="col-sm-12 justify-center flex">
        <q-card class="q-py-lg" flat style="width: 300px">
          <q-card-section>
            <q-input
              outlined
              dense
              v-model="form.email"
              label="Email"
              required
              type="email"
              :error="$v.form.email.$error"
              error-message="Email is required."
              @keyup="$v.form.email.$touch"
              @keyup.enter="login"
            />

            <q-input
              outlined
              dense
              type="password"
              v-model="form.password"
              label="Password"
              :error="$v.form.password.$error"
              error-message="Password is required."
              @keyup="$v.form.password.$touch"
              @keyup.enter="login"
            />

            <div>
              <q-btn
                label="Login"
                type="submit"
                color="primary"
                class="full-width"
                :disabled="$v.form.$anyError || $v.form.$pending"
                @click="login"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="fixed-bottom-right q-pa-md text-grey z-top text-right">
      Need an account?<br />
      <q-btn dense flat size="xs" color="primary" :to="{ name: 'register' }"
        >Click Here.</q-btn
      >
    </div>
  </q-page>
</template>

<style></style>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  computed: {
    url: {
      get() {
        return this.$store.state.settings.url;
      }
    },
    token_expires_at: {
      get() {
        return this.$store.state.authorization.token_expires_at;
      },
      set(data) {
        this.$store.commit("authorization/setTokenExpiresAt", data);
        this.$q.localStorage.set("token_expires_at", data);
      }
    },
    token: {
      get() {
        return this.$store.state.authorization.token;
      },
      set(data) {
        this.$store.commit("authorization/setToken", data);
        this.$q.localStorage.set("token", data);
      }
    }
    // user: {
    //   get() {
    //     return this.$store.state.authorization.user;
    //   },
    //   set(data) {
    //     this.$store.commit("authorization/setUser", data);
    //     this.$q.localStorage.set("user", data);
    //   }
    // },
  },
  methods: {
    login() {
      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) return;
      this.$q.loading.show();
      this.$axios
        .post(this.url + "login", this.form)
        .then(response => {
          this.$q.loading.hide();
          this.token_expires_at = this.$moment(
            response.data.expires_at
          ).format();
          this.token = response.data.token;
          this.$router.push({ name: "account" });
        })
        .catch(error => {
          console.error(error);
          this.$q.loading.hide();
          this.$q.notify({
            message: "Incorrect email or password",
            type: "negative"
          });
        });
    }
  }
};
</script>
