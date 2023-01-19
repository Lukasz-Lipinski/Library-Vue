<template>
  <ul class="list-unstyled">
    <BookTieComponent
      v-for="book in books"
      :key="book.isbn13"
      :book="book"
    ></BookTieComponent>
  </ul>
</template>

<script lang="ts">
import { Book } from '@/views/BooksVue.vue';
import { defineComponent, PropType } from 'vue';
import BookTieComponent from './BookTieComponent.vue';

export default defineComponent({
  components: { BookTieComponent },
  props: {
    books: {
      required: true,
      type: Array as PropType<Book[]>,
    },
  },
});
</script>

<style lang=""></style>
