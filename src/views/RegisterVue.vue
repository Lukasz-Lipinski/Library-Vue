<template>
  <div
    class="container-fluid customPadding text-center"
  >
    <h2 class="header">Rejestracja</h2>
    <RegistrationForm></RegistrationForm>
  </div>
</template>

<script lang="ts">
import RegistrationForm from '@/components/RegistrationForm.vue';
import { useUserSlicer } from '@/store/useUserSlicer';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { isLogged } = storeToRefs(
      useUserSlicer()
    );

    return {
      isLogged,
    };
  },
  components: {
    RegistrationForm,
  },
  beforeCreate() {
    this.isLogged && this.$router.push('/');
  },
});
</script>

<style lang="scss">
div.customPadding {
  padding-top: 5%;
}
</style>
