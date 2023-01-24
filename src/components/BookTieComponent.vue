<template>
  <li
    class="border p-3 lead row gap-4"
    :class="isLast ? 'mb-0' : 'mb-3'"
  >
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
        <span
          v-if="checkIfAdded"
          class="text-danger"
        >
          Książka już jest zarezerwowana
        </span>
        <button
          v-else
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
import { Book } from '@/shared/interfaces';
import { useUserSlicer } from '@/store/useUserSlicer';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BookTieComponent',
  setup(props, ctx) {
    const { reserveBook, getReservedBooks } =
      useUserSlicer();

    return {
      reservedBooks: getReservedBooks,
      reserveBook,
    };
  },
  computed: {
    checkIfAdded(): boolean {
      const isCurrentBookReserved =
        this.reservedBooks!.find(
          (book: Book) =>
            book.isbn13 === this.book.isbn13
        );

      if (isCurrentBookReserved) return true;
      return false;
    },
  },
  methods: {
    onReserveBook() {
      const isCurrentBookReserved =
        this.reservedBooks!.find(
          (book: Book) =>
            book.isbn13 === this.book.isbn13
        );

      if (!isCurrentBookReserved) {
        this.reserveBook(this.book);
        this.$emit('snackbar', true);
        return;
      }
    },
  },
  props: {
    isLast: {
      required: true,
      type: Boolean,
    },
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
