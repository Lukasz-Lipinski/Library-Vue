<template>
  <div
    id="carouselExampleFade"
    class="carousel carousel-dark slide carousel-fade"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          :src="getImg"
          class="img-fluid"
          alt="picture"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="prev"
      @click="onChangeImg('prev')"
    >
      <span
        class="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden"
        >Previous</span
      >
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="next"
      @click="onChangeImg('next')"
    >
      <span
        class="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    index: {
      type: Object as PropType<number>,
      required: true,
    },
  },
  methods: {
    onChangeImg(flag: 'next' | 'prev') {
      flag === 'next' &&
        this.index < 6 &&
        this.$emit('changeImg', 1);
      flag === 'prev' &&
        this.index > 1 &&
        this.$emit('changeImg', -1);
    },
  },
  computed: {
    getImg() {
      return require(`@/assets/gallery/library-${this.index}.jpg`);
    },
  },
});
</script>

<style lang="scss" scoped></style>
