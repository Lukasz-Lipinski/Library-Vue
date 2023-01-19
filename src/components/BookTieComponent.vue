<template>
  <li class="border p-3 lead row">
    <div class="col-10">
      <p>
        Tytuł: {{ book.title }},
        {{ book.subtitle }}
      </p>
      <p>Numer ISBN: {{ book.isbn13 }}</p>
    </div>
    <div class="col-auto">
      <button class="btn btn-success">
        Zarezerwuj
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { Book } from '@/views/BooksVue.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    book: {
      required: true,
      type: Object as PropType<Book>,
    },
  },
});
</script>

<style lang=""></style>
