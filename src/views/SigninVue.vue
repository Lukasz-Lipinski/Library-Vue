<template>
  <div
    class="container-fluid d-flex flex-column align-items-center signinFormContainer"
  >
    <h2 class="header p-3">Logowanie</h2>
    <signin-form></signin-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import SigninForm from '@/components/SigninForm.vue';
import { storeToRefs } from 'pinia';
import { useUserSlicer } from '@/store/useUserSlicer';

export default defineComponent({
  setup() {
    const { getUserStatus: isLogged } =
      storeToRefs(useUserSlicer());

    return {
      isLogged,
    };
  },
  components: { SigninForm },
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
