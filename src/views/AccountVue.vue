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

    <div class="container-fluid col-6 p-3">
      <h4 class="h4 text-center pb-3">
        Wypożyczone książki
      </h4>
    </div>
  </div>
</template>

<script lang="ts">
import {
  UserProps,
  useUserSlicer,
} from '@/store/useUserSlicer';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { isLogged, user } = storeToRefs(
      useUserSlicer()
    );

    const { email, surname, name } = user.value;

    return {
      isLogged,
      user: {
        email,
        surname,
        name,
      },
    };
  },
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
  },
  beforeCreate() {
    if (!this.isLogged) {
      this.$router.push('/');
    }
  },
});
</script>

<style lang="scss"></style>
