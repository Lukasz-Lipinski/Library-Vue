<template>
  <li class="border p-3 lead row gap-4">
    <div
      class="row col-md-10 col-sm-12 d-flex justify-content-md-between align-items-center justify-content-sm-center"
    >
      <div class="col-6">
        <p class="fw-semibold">
          Tytuł:
          {{ book.title }}
        </p>
        <p>
          {{ book.subtitle }}
        </p>
        <p>Numer ISBN: {{ book.isbn13 }}</p>
      </div>
      <div
        class="row col-md-4 col-sm-12 d-flex justify-content-sm-center"
      >
        <img
          class="img-fluid"
          :src="book.image"
          :alt="book.title"
        />
      </div>
    </div>
    <div
      class="col-2 d-flex align-items-md-center justify-content-md-end customCenter"
    >
      <div>
        <button
          class="btn btn-success btn-lg"
          @click="onReserveBook"
        >
          Zarezerwuj
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { useUserSlicer } from '@/store/useUserSlicer';
import { Book } from '@/views/BooksVue.vue';
import { storeToRefs } from 'pinia';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  setup(props, ctx) {
    const store = storeToRefs(useUserSlicer());
    const userSlicer = useUserSlicer();

    return {
      client: store.user,
      ...userSlicer,
    };
  },
  methods: {
    onReserveBook() {
      const isCurrentBookReserved =
        this.user.reservedBooks?.find(
          (book) =>
            book.isbn13 === this.book.isbn13
        );

      !isCurrentBookReserved &&
        this.reserveBook(this.book);
    },
  },
  props: {
    book: {
      required: true,
      type: Object as PropType<Book>,
    },
  },
});
</script>

<style lang="scss" scoped>
.customCenter {
  @media only screen and (max-width: 767px) {
    justify-content: center;
    width: 100%;
  }
}
</style>
