<template>
  <ul class="list-unstyled">
    <BookTieComponent
      v-for="(book, index) in books"
      :key="book.isbn13"
      :book="book"
      :isLast="index === books.length - 1"
    ></BookTieComponent>
  </ul>
</template>

<script lang="ts">
import { Book } from '@/shared/interfaces';
import { defineComponent, PropType } from 'vue';
import BookTieComponent from './BookTieComponent.vue';

export default defineComponent({
  name: 'BooksListComponent',
  components: { BookTieComponent },
  props: {
    books: {
      required: true,
      type: Array as PropType<Book[]>,
    },
  },
});
</script>

<style lang="scss"></style>
