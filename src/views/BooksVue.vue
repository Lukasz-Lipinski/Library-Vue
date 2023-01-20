<template>
  <div class="container py-3">
    <SearcherComponent
      @searcher="onFindBooks($event)"
    ></SearcherComponent>

    <div class="container">
      <BooksListComponent
        :books="books"
      ></BooksListComponent>
    </div>
  </div>
</template>

<script lang="ts">
import BooksListComponent from '@/components/BooksListComponent.vue';
import SearcherComponent from '@/components/SearcherComponent.vue';
import { useUserSlicer } from '@/store/useUserSlicer';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

interface BooksComponentState {
  books: Array<Book>;
}

interface ResponseWithBooks {
  error: string;
  total: string;
  page: string;
  books: Book[];
}

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export default defineComponent({
  components: {
    SearcherComponent,
    BooksListComponent,
  },
  setup() {
    const { getUserStatus: isLogged } =
      storeToRefs(useUserSlicer());

    return { isLogged };
  },
  data: (): BooksComponentState => ({
    books: [],
  }),
  beforeCreate() {
    !this.isLogged &&
      this.$router.push('/signin');
  },
  beforeMount() {
    const url = `${process.env.VUE_APP_BOOKS_API}new`;
    axios
      .get<ResponseWithBooks>(url)
      .then((req) => {
        this.books = req.data.books;
      });
  },
  methods: {
    async findBook(query: string) {
      const url = `${process.env.VUE_APP_BOOKS_API}search/${query}`;
      const req =
        await axios.get<ResponseWithBooks>(url);
      if (req.data.books.length) {
        this.books = req.data.books;
      }
    },
    onFindBooks(title: string) {
      this.findBook(title);
    },
  },
});
</script>

<style
  lang="scss
"
></style>
