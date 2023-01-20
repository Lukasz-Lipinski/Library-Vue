<template>
  <div class="row py-5">
    <div
      class="container-fluid border p-3 col-4 rounded shadow"
    >
      <h4 class="h4 text-center pb-3">
        Twoje dane
      </h4>
      <p
        v-for="(value, name) of user"
        :key="name"
        class="lead"
      >
        <span
          >{{ setLabel(name) }}: {{ value }}</span
        >
      </p>
    </div>

    <div
      class="container-fluid col-6 p-3 text-center"
    >
      <h4 class="h4 text-center pb-3">
        Wypożyczone książki
      </h4>
      <ReservedBooksComponent
        @booksListEmitter="setReservedBooksList"
      ></ReservedBooksComponent>
    </div>
  </div>

  <ReservedBooksList
    v-if="show"
    @onHideModal="setReservedBooksList"
  >
  </ReservedBooksList>
</template>

<script lang="ts">
import ReservedBooksComponent from '@/components/ReservedBooksComponent.vue';
import ReservedBooksList from '@/components/ReservedBooksList.vue';
import { useUserSlicer } from '@/store/useUserSlicer';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

interface AccountVueState {
  show: boolean;
}

export default defineComponent({
  components: {
    ReservedBooksComponent,
    ReservedBooksList,
  },
  setup() {
    const { getUser, getUserStatus } =
      storeToRefs(useUserSlicer());

    const {
      email,
      name,
      surname,
      reservedBooks,
    } = getUser.value;

    return {
      isLogged: getUserStatus,
      user: {
        email,
        name,
        surname,
      },
      reservedBooks,
    };
  },
  data: (): AccountVueState => ({
    show: false,
  }),
  methods: {
    setLabel(name: string) {
      switch (name) {
        case 'email':
          return 'Twój email';
        case 'name':
          return 'Twoje imię';
        case 'surname':
          return 'Twoje nazwisko';
        default:
          return '';
      }
    },

    setReservedBooksList(
      shouldBeEmerged: boolean
    ) {
      this.show = shouldBeEmerged;
    },
  },
  beforeCreate() {
    if (!this.isLogged) {
      this.$router.push('/');
    }
  },
});
</script>

<style lang="scss" scoped></style>
