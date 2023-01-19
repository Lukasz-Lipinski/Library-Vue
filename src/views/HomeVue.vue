<template>
  <div class="container">
    <section>
      <h2 class="h2 pb-3">Aktualności</h2>
      <ul class="list-unstyled row">
        <NewsTieComponent
          v-for="oneNews in news"
          :key="oneNews.title"
          :oneNews="oneNews"
        >
        </NewsTieComponent>
      </ul>
    </section>
    <div>Partnerzy: ...</div>
  </div>
</template>

<script lang="ts">
import NewsTieComponent from '@/components/NewsTieComponent.vue';
import SearcherComponent from '@/components/SearcherComponent.vue';
import { defineComponent } from 'vue';

interface HomePageState {
  news: Array<{
    title: string;
    description: string;
  }>;
}

export default defineComponent({
  data: (): HomePageState => ({
    news: [
      {
        title: 'Klub książki',
        description:
          'Dni oraz godziny spotkań, tematyka oraz pogaduszki na temat książek w gronie innych pasjonatów czytania.',
      },
      {
        title: 'Nowości w bibliotece',
        description:
          'Sprawdź nowości w naszych książkach! Staramy się regularnie poszerzać nasze zbiory, aby czytelnicy mogli czytać książki o różnej tematyce',
      },
      {
        title: 'Karta czytelnika',
        description:
          'Wyrób kartę i wypożyczaj książki! Wyrobienie karty jest bezpłatne. Wypożyczone książki mają termin zwrotu do 30 dni, jednak w niektórych przypadkach termin może ulec zmianie',
      },
      {
        title: 'Zajęcia z dziećmi',
        description:
          'Różne wydarzenia dla dzieci oraz ich rodziców. Każdego dnia organizujemy różne zajęcia dodatkowe dla najmłodszych, aby zapewnić im rozrywkę oraz intergrację z innymi dziećmi.',
      },
      {
        title:
          'Komputery z dostępem do internetu dla czytelników',
        description:
          'Zapraszamy do korzystania z komputerów w naszej czytelni. Posidają dostęp do internetu i drukarki, dzięki czemu można przygotować sobie dokumenty oraz je wydrukować',
      },
      {
        title: 'Kabiny z dostępem do internetu',
        description:
          'Można zarezerwować kabinę, aby móc uczyć się w grupie. Są one wytłumione dzięki czemu rozmowy nie będą przeszkadzać innym czytelnikom oraz dostęp do internetu',
      },
    ],
  }),
  components: {
    NewsTieComponent,
    SearcherComponent,
  },
});
</script>

<style lang="scss"></style>
