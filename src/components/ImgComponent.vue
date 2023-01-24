<template>
  <img
    :src="setImgPath"
    class="img-thumbnail w-25 h-75 m-3 shadow btn"
    @click="onOpenInModal"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ImageComponent',
  props: {
    imgIndex: {
      type: Object as PropType<number>,
      required: true,
    },
  },
  methods: {
    onOpenInModal() {
      this.$emit(
        'openInModal',
        true,
        this.imgIndex
      );
    },
  },
  computed: {
    setImgPath() {
      return require(`@/assets/gallery/library-${this.imgIndex}.jpg`);
    },
  },
});
</script>

<style lang="scss" scoped></style>
