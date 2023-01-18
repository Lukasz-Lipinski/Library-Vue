<template>
  <form
    @submit.prevent="onSubmit"
    class="position-relative bg-secondary px-3 py-5"
  >
    <h2
      class="position-absolute customPosition left-0 d-flex justify-content-center w-100"
    >
      Newsletter
    </h2>

    <FormKit
      name="email"
      type="email"
      v-model="email"
      validation="required|email"
      :validation-messages="{
        required: 'Pole jest wymagane',
        email: 'Niepoprawny adres email',
      }"
    ></FormKit>
    <FormKit
      type="checkbox"
      name="acceptation"
      label="Wyrażam zgodę na przetwarzanie moich danych osobowych na potrzeby newslettera."
      validation="accepted"
      :validation-messages="{
        accepted: 'Zgoda musi być zaakceptowana',
      }"
      v-model="acceptation"
    ></FormKit>
    <div class="d-flex justify-content-center">
      <FormKit
        type="submit"
        label="Zapisz"
        :disabled="!isValid"
      ></FormKit>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    email: 'Adres email',
    acceptation: false,
  }),
  computed: {
    isValid() {
      const regex =
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

      if (
        this.email.trim() &&
        regex.test(this.email) &&
        this.acceptation
      )
        return true;

      return false;
    },
  },
  methods: {
    setDefault() {
      this.email = 'Adres email';
      this.acceptation = false;
    },
    onSubmit() {
      this.$emit('snackbar', true);
      this.setDefault();
    },
  },
});
</script>

<style lang="scss">
.customPosition {
  top: -1.4rem;
}
</style>
