<template>
  <div
    data-testid="toast-component"
    class="toast-container position-fixed bottom-0"
    :class="isToast && 'fadein'"
    v-if="isToast"
  >
    <div
      class="toast show"
      role="alert"
      aria-atomic="true"
    >
      <div
        class="toast-header d-flex justify-content-between p-2"
      >
        <slot name="header"></slot>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          @click="onHideToast"
        ></button>
      </div>
      <div class="toast-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface ToastComponentState {
  timer: number;
}

export default defineComponent({
  data: (): ToastComponentState => ({
    timer: 0,
  }),
  methods: {
    onHideToast() {
      this.$emit('onHide', false);
    },
  },
  props: {
    isToast: Boolean,
  },
  mounted() {
    if (this.isToast) {
      this.timer = setTimeout(() => {
        this.$emit('snackbar', false);
      }, 3000);
    }
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
});
</script>

<style lang=""></style>
