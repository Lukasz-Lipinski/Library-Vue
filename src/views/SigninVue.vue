<template>
  <div
    class="container-fluid d-flex flex-column align-items-center signinFormContainer"
  >
    <h2 class="header p-3">Logowanie</h2>
    <signin-form @error="setError"></signin-form>
  </div>
  <ToastComponent :is-toast="isError" @onHide="setError" @snackbar="setError">
    <template #header>Błąd</template>
    <template #body>Nie ma takiego konta!</template>
  </ToastComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import SigninForm from '@/components/SigninForm.vue';
import { storeToRefs } from 'pinia';
import { useUserSlicer } from '@/store/useUserSlicer';
import ToastComponent from '@/components/ToastComponent.vue';

export default defineComponent({
  setup() {
    const { getUserStatus: isLogged } =
    storeToRefs(useUserSlicer());

    return {
      isLogged,
    };
  },
  data: () => ({
    isError: false,
  }),
  methods: {
    setError(event: boolean) {
      this.isError = event;
    }
  },
  components: { SigninForm, ToastComponent },
  beforeCreate() {
    this.isLogged && this.$router.push('/');
  },
});
</script>

<style lang="scss">
.signinFormContainer {
  padding-top: 5%;
}
</style>
