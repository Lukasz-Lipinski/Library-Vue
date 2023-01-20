<template>
  <div
    class="modal showModal modal"
    tabindex="-1"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">
            Zarezerwowane książki
          </h4>
          <button
            @click="onCloseModal"
            class="btn btn-close"
          ></button>
        </div>

        <div class="modal-body">
          <p
            v-for="book in books"
            :key="book.isbn13"
            class="d-flex justify-content-between align-items-center py-2 border-bottom"
          >
            <span>{{ book.title }}</span>
            <button
              @click="onPutDown(book)"
              class="btn btn-danger btn-sm"
            >
              Odłóż
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserSlicer } from '@/store/useUserSlicer';
import { Book } from '@/views/BooksVue.vue';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

interface ReservedBooksListProps {
  books: Book[];
}

export default defineComponent({
  setup() {
    const {
      getReservedBooks: reservedBooks,
      getReservedBooksQuantity,
    } = storeToRefs(useUserSlicer());
    const { putDownBook } = useUserSlicer();

    return {
      putDownBook,
      reservedBooks,
      q: getReservedBooksQuantity,
    };
  },
  data(): ReservedBooksListProps {
    return {
      books: [],
    };
  },
  created() {
    this.books = this.reservedBooks as Book[];
  },
  methods: {
    onCloseModal() {
      this.$emit('onHideModal', false);
    },
    onPutDown(book: Book) {
      this.putDownBook(book);

      this.books = this.books.filter(
        (reservedBook) =>
          reservedBook.isbn13 !== book.isbn13
      );
      console.log(this.q);
    },
  },
});
</script>

<style lang="scss" scoped>
.showModal {
  display: block;
  background: rgba(0, 0, 0, 0.7);
}
</style>
