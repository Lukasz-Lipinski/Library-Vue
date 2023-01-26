<template>
  <div
    class="container py-3 border-top py-5 fadein"
    data-testid="footer-component"
  >
    <div class="row px-2">
      <div class="col-4">
        <p class="pb-3 fw-bold">
          Miejska Biblioteka Publiczna
        </p>
        <p>ul. XYZ 1/1</p>
        <p>tel. 111-111-111/71 111-11-11</p>
        <p>
          email: biblioteka.example@example.com
        </p>
        <p>REGON: 1111111111</p>
        <p>NIP: 111 11 11 1 111 1</p>
      </div>

      <div class="col-4 px-2">
        <a
          href="#"
          class="link-secondary"
        >
          BIP Miejskiej Biblioteki Publicznej
        </a>
      </div>

      <div class="col-4 px-2">
        <NewsletterComponent
          @snackbar="setToast($event)"
        ></NewsletterComponent>
      </div>
    </div>
  </div>
  <div
    class="d-flex justify-content-center"
    v-if="isToast"
  >
    <ToastComponent
      :is-toast="isToast"
      @onHide="setToast($event)"
      @snackbar="setToast($event)"
    >
    <template #header>Udało się!</template>
    <template #body>Twój email został dodany do newslettera</template>
  </ToastComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewsletterComponent from './NewsletterComponent.vue';
import ToastComponent from './ToastComponent.vue';

export default defineComponent({
  data: () => ({
    isToast: false,
  }),
  components: {
    NewsletterComponent,
    ToastComponent,
  },
  methods: {
    setToast(event: boolean) {
      console.log(event);
      
      this.isToast = event;
    },
  },
});
</script>

<style lang="scss"></style>
