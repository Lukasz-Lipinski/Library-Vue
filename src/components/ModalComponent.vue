<template>
  <div class="modal showElement bg-opacity-50 bg-black">
    <div
      class="modal-dialog modal-dialog-centered"
      :class="isFullscreen"
    >
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
          <button
            class="btn btn-close"
            @click="onCloseModal"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalComponent',
  props: {
    isFullscreen: {
      default: "modal-fullscreen",
      required: false,
      type: Boolean
    }
  },
  methods: {
    onCloseModal() {
      this.$emit('closeModal', false);
    },
  },
});
</script>

<style lang="scss" scoped>
.showElement {
  display: block;
}
</style>
