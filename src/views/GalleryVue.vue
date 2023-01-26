<template>
  <div class="container fadein">
    <h1 class="h2 py-3 text-center">Galeria</h1>
    <div class="container-fluid">
      <ul
        class="list-unstyled d-flex flex-wrap justify-content-center align-items-center"
      >
        <ImgComponent
          v-for="index of imgNumbers"
          :key="index"
          :imgIndex="index"
          @openInModal="setModal"
        ></ImgComponent>
      </ul>
    </div>
  </div>
  <ModalComponent
    v-if="isModal"
    @closeModal="setModal"
  >
    <template #body><GalleryListComponent
      :index="selectedImgIndex"
      @changeImg="onChangeImg"
    ></GalleryListComponent></template>
  </ModalComponent>
</template>

<script lang="ts">
import GalleryListComponent from '@/components/GalleryListComponent.vue';
import ImgComponent from '@/components/ImgComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GalleryComponent',
  components: {
    ImgComponent,
    ModalComponent,
    GalleryListComponent,
  },
  data: () => ({
    imgNumbers: 6,
    isModal: false,
    selectedImgIndex: 0,
  }),
  methods: {
    setModal(event: boolean, imgIndex: number) {
      this.selectedImgIndex = imgIndex;
      this.isModal = event;
    },
    onChangeImg(event: number) {
      this.selectedImgIndex += event;
    },
  },
});
</script>

<style lang="scss"></style>
