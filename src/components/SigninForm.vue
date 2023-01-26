<template>
  <form
    @submit.prevent="signin"
    class="customForm"
  >
    <FormKit
      name="email"
      type="email"
      validation="required|email"
      v-model="email"
      help="Wprowadź email"
    ></FormKit>
    <FormKit
      type="password"
      name="password"
      validation="required"
      v-model="password"
      help="Wprowadź hasło"
    ></FormKit>

    <div
      class="d-flex justify-content-center pt-3"
    >
      <FormKit
        type="submit"
        :disabled="!isValid"
      >
        <div
          class="spinner-border"
          v-if="isLoading"
        >
          <span class="sr-only"></span>
        </div>
        <span v-if="!isLoading"> Zaloguj </span>
      </FormKit>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  UserProps,
  useUserSlicer,
} from '@/store/useUserSlicer';
import {
  clearErrors,
  filterErrors,
  Request,
} from '@/services';
import axios from 'axios';

export default defineComponent({
  setup() {
    const { login } = useUserSlicer();

    return {
      login,
    };
  },
  data: () => ({
    email: '',
    password: '',
    errors: ['email', 'password'],
    isValid: false,
    isLoading: false,
  }),
  watch: {
    password() {
      this.errors = filterErrors(
        this.errors,
        'password'
      );
      this.isValid = clearErrors(
        'password',
        () => {
          !this.password.trim().length &&
            this.errors.push('password');
        },
        this.errors
      );
    },
    email() {
      this.errors = filterErrors(
        this.errors,
        'email'
      );

      this.isValid = clearErrors(
        'email',
        () => {
          !this.email.trim().length &&
            !this.email.includes('@') &&
            this.errors.push('email');
        },
        this.errors
      );
    },
  },
  methods: {
    async sendUserData() {
      const url = `${process.env.VUE_APP_DB_URL_SIGNIN}${process.env.VUE_APP_API_KEY}`;
      const loginData: Request = {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      };
      const req = await axios
        .post(url, loginData)
        .catch((error) => {
          this.isLoading = false;
          this.isValid = true;

          return error;
        });

      if (+req.status === 200) {
        this.isLoading = false;
        const { data } = await axios.get(
          `${process.env.VUE_APP_DB_URL}/users.json`
        );

        const userData: UserProps = {
          ...(Object.values(
            data
          )[0] as UserProps),
          reservedBooks: [],
          id: Object.keys(data)[0],
        };

        this.login(userData);
        this.$router.push('account');
      }
    },
    signin() {
      this.isLoading = true;
      this.isValid = false;
      this.sendUserData();
    },
  },
});
</script>

<style lang="scss" scoped>
.customForm {
  display: flex;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
