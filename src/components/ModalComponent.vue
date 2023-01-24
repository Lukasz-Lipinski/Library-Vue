<template>
  <div class="modal showElement">
    <div
      class="modal-dialog modal-dialog-centered modal-fullscreen"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            class="btn btn-close"
            @click="onCloseModal"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalComponent',
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
