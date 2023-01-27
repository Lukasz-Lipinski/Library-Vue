<template>
  <div class="row py-5">
    <div
      class="container-fluid border p-3 col-4 rounded shadow"
    >
      <h4 class="h4 text-center pb-3">
        Twoje dane
      </h4>
      <p
        v-for="(value, name) of userData"
        :key="name"
        class="lead"
      >
        <span
          >{{ setLabel(name) }}: {{ value }}</span
        >
      </p>
      <div
        class="container-fluid d-flex justify-content-center"
      >
        <button
          @click="setModal(true)"
          class="btn btn-outline-danger"
        >
          Usuń konto
        </button>
      </div>
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

  <ModalComponent
    v-if="isModal"
    :is-fullscreen="false"
    @closeModal="setModal"
  >
    <template #header
      ><span class="h5"
        >Czy na pewno chcesz usunąć konto?</span
      ></template
    >
    <template #body>
      <p
        class="lead"
        v-if="!spinner"
      >
        Kliknięcie przycisku "Usuń" spowoduje
        trwałe usunięcie konta.
      </p>
      <p
        class="lead"
        v-if="!spinner"
      >
        Czy na pewno chcesz to zrobić?
      </p>
      <div
        v-else
        class="d-flex justify-content-center"
      >
        <div
          class="spinner-border"
          role="status"
        >
          <span class="visually-hidden"
            >Loading...</span
          >
        </div>
      </div>
    </template>
    <template #footer>
      <div
        class="modal-footer d-flex justify-content-center"
      >
        <button
          class="btn btn-outline-danger"
          @click="onDeleteAccount"
        >
          Usuń
        </button>
      </div>
    </template>
  </ModalComponent>
</template>

<script lang="ts">
import ModalComponent from '@/components/ModalComponent.vue';
import ReservedBooksComponent from '@/components/ReservedBooksComponent.vue';
import ReservedBooksList from '@/components/ReservedBooksList.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import { useUserSlicer } from '@/store/useUserSlicer';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { computed, defineComponent } from 'vue';

interface AccountVueState {
  show: boolean;
  isModal: boolean;
  spinner: boolean;
}

export default defineComponent({
  components: {
    ReservedBooksComponent,
    ReservedBooksList,
    ToastComponent,
    ModalComponent,
  },
  setup() {
    const { logout } = useUserSlicer();
    const {
      getUserData,
      getUserStatus,
      getReservedBooks,
      getUser,
    } = storeToRefs(useUserSlicer());

    const userData = getUserData.value;

    return {
      isLogged: getUserStatus,
      user: getUser,
      userData: userData,
      reservedBooks: getReservedBooks,
      logout,
    };
  },
  data: (): AccountVueState => ({
    show: false,
    isModal: false,
    spinner: false,
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
          break;
      }
    },
    setModal(state: boolean) {
      this.isModal = state;
    },
    setReservedBooksList(
      shouldBeEmerged: boolean
    ) {
      this.show = shouldBeEmerged;
    },
    async deleteFromBackend() {
      const url = `${process.env.VUE_APP_DB_URL}users/${this.user.id}.json`;

      await axios.delete(url);
    },
    async onDeleteAccount() {
      this.spinner = true;
      const url = `${process.env.VUE_APP_DB_URL_DELETE}${process.env.VUE_APP_API_KEY}`;

      const req = await axios.post(url, {
        idToken: this.user.idToken,
      });

      if (req.status === 200) {
        await this.deleteFromBackend();
        this.spinner = false;
        this.logout();
        this.$router.push('/');
      } else {
        this.spinner = false;
      }
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
