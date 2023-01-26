<template>
  <form
    @submit.prevent="onSubmit"
    class="customForm"
  >
    <FormKit
      type="email"
      name="email"
      id="email"
      validation="required|email"
      help="Wprowadź adres email"
      v-model="email"
    ></FormKit>
    <FormKit
      type="password"
      id="password"
      name="password"
      validation="required|length:7"
      v-model="password"
      help="Wprowadź hasło"
    ></FormKit>
    <FormKit
      type="text"
      id="name"
      name="name"
      validation="required"
      v-model="name"
      help="Wprowadź swoje imię"
    ></FormKit>
    <FormKit
      type="text"
      id="surname"
      name="surname"
      validation="required"
      v-model="surname"
      help="Wprowadź swoje nazwisko"
    ></FormKit>
    <FormKit
      type="submit"
      :disabled="!isValid"
    >
      <div
        v-if="isLoading"
        class="spinner-border spinner-border-sm pe-1"
        role="status"
      >
        <span class="visually-hidden"
          >Loading...</span
        >
      </div>
      <span>Register</span>
    </FormKit>
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
  Response,
  sendRequest,
  sendUserData,
} from '@/services';

interface RegistrationFormState {
  isValid: boolean;
  errors: Array<string>;
  email: string;
  password: string;
  name: string;
  surname: string;
  isLoading: boolean;
}

export default defineComponent({
  setup() {
    const { login } = useUserSlicer();

    return {
      login,
    };
  },
  data(): RegistrationFormState {
    return {
      name: '',
      surname: '',
      isValid: false,
      errors: [
        'email',
        'password',
        'name',
        'surname',
      ],
      email: '',
      password: '',
      isLoading: false,
    };
  },
  watch: {
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
    password() {
      this.errors = filterErrors(
        this.errors,
        'password'
      );

      this.isValid = clearErrors(
        'password',
        () => {
          this.password.trim().length < 7 &&
            this.errors.push('password');
        },
        this.errors
      );
    },
    name() {
      this.errors = filterErrors(
        this.errors,
        'name'
      );
      this.isValid = clearErrors(
        'name',
        () => {
          !this.name.trim().length &&
            this.errors.push('name');
        },
        this.errors
      );
    },
    surname() {
      this.errors = filterErrors(
        this.errors,
        'surname'
      );

      this.isValid = clearErrors(
        'surname',
        () => {
          !this.surname.trim().length &&
            this.errors.push('surname');
        },
        this.errors
      );
    },
  },
  methods: {
    getPlaceholder(label: string): string {
      return `Please assign your ${label}`;
    },
    async onSubmit() {
      if (this.isValid) {
        this.isLoading = true;
        let user: { [key: string]: any } = {};

        user = {
          password: this.password,
          email: this.email,
        };

        const response = await sendRequest({
          ...user,
        } as Omit<Request, 'returnSecureToken'>);

        if (+response.status === 200) {
          this.isLoading = false;

          console.log(response);

          const userData: UserProps = {
            email: this.email,
            name: this.name,
            surname: this.surname,
            localId: (response.data as Response)
              .localId,
          };

          await sendUserData(userData);
          this.login({ ...userData });
        }
      }
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
