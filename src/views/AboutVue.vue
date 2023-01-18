<template>
  <div class="container-fluid">
    <h2 class="h2 text-center py-4">O Nas</h2>
    <div class="row">
      <section class="container-fluid col-6 p-4">
        <h2 class="h2 pb-3">Biblioteka</h2>
        <p class="fs-5 ps-2">
          Nasza bilioteka mieści się w we
          Wrocławiu przy ulicy XYZ 1/1.
        </p>
        <p class="fs-5 ps-2">
          Tel. 111-111-111/71 111-11-11
        </p>
        <p class="fs-5 ps-2">
          Email: biblioteka.example@example.com
        </p>
      </section>
      <div class="col-6">
        <div class="card shadow-lg">
          <img
            src="@/assets/building.jpg"
            class="img-fluid"
            alt="building"
          />
        </div>
      </div>
    </div>
    <div
      class="row mt-5 p-2 d-flex justify-content-center"
    >
      <section class="col-4 d-flex">
        <div
          class="card shadow align-self-center"
        >
          <img
            src="@/assets/regulations.jpg"
            alt="rules"
            class="img-thumbnail"
          />
        </div>
      </section>
      <section class="container-fluid col-6">
        <h3
          class="h3 text-center text-decoration-underline pb-2"
        >
          Regulamin
        </h3>
        <div>
          <p>
            Z biblioteki szkolnej mogą korzystać:
            uczniowie, nauczyciele oraz inni
            pracownicy szkoły.
          </p>
          <ul data-testid="clients-list">
            <li
              v-for="client of clients"
              :key="client"
            >
              {{ client }}
            </li>
          </ul>
        </div>
        <div>
          <p>
            Biblioteka składa się z wypożyczalni
            oraz czytelni i gromadzi następujące
            materiały:
          </p>
          <ul data-testid="material-list">
            <li
              v-for="item of separateToList()"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    clients: [
      'uczniowie',
      'nauczyciele',
      'pracownicy szkoły',
      'dorośli',
      'dzieci po założeniu karty przez prawnego opiekuna',
    ],
    bookCategories: `wydawnictwa informacyjne, podręczniki i programy szkolne dla nauczycieli, podręczniki szkolne do księgozbioru podręcznego, lektury podstawowe do języka polskiego i innych przedmiotów nauczania, lektury uzupełniające do języka polskiego,
            literaturę popularnonaukową i naukową, wybrane pozycje z literatury pięknej, wydawnictwa albumowe z dziedziny sztuki i krajoznawstwa, odpowiednią prasę dla dzieci i młodzieży oraz nauczycieli,
            podstawowe wydawnictwa z psychologii, filozofii, socjologii, pedagogiki i dydaktyki różnych przedmiotów nauczania, materiały audiowizualne.`,
  }),
  methods: {
    separateToList(): string[] {
      const items =
        this.bookCategories.split(', ');
      return items;
    },
  },
});
</script>

<style lang="scss"></style>
