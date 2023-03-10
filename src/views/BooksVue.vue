<template>
  <div class="container py-3">
    <SearcherComponent
      @searcher="onFindBooks($event)"
    ></SearcherComponent>

    <div
      v-if="isLoading"
      class="container d-flex justify-content-center"
    >
      <div
        class="spinner-grow text-primary"
        role="status"
      >
        <span class="visually-hidden"
          >Loading...</span
        >
      </div>
    </div>

    <div
      v-else
      class="container"
    >
      <BooksListComponent
        :books="books"
      ></BooksListComponent>
    </div>
  </div>
</template>

<script lang="ts">
import BooksListComponent from '@/components/BooksListComponent.vue';
import SearcherComponent from '@/components/SearcherComponent.vue';
import { Book } from '@/shared/interfaces';
import { useUserSlicer } from '@/store/useUserSlicer';
import axios from 'axios';
import { defineComponent } from 'vue';

interface BooksComponentState {
  books: Array<Book>;
  isLoading: boolean;
}

interface ResponseWithBooks {
  error: string;
  total: string;
  page: string;
  books: Book[];
}

export default defineComponent({
  components: {
    SearcherComponent,
    BooksListComponent,
  },
  setup() {
    const { getUserStatus: isLogged } =
      useUserSlicer();

    return { isLogged };
  },
  data: (): BooksComponentState => ({
    books: [],
    isLoading: false,
  }),
  beforeCreate() {
    !this.isLogged &&
      this.$router.push('/signin');
  },
  beforeMount() {
    this.isLoading = true;
    const url = `${process.env.VUE_APP_BOOKS_API}new`;

    axios
      .get<ResponseWithBooks>(url)
      .then((req) => {
        this.books = req.data.books;
        this.isLoading = false;
      });
  },
  methods: {
    async findBook(query: string) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_BOOKS_API}search/${query}`;

      const req =
        await axios.get<ResponseWithBooks>(url);

      if (req.data.books.length) {
        this.books = req.data.books;
        this.isLoading = false;
      }
    },
    async onFindBooks(title: string) {
      await this.findBook(title);
    },
  },
});
</script>

<style
  lang="scss
"
></style>
