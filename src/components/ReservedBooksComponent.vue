<template>
  <div v-if="quantity">
    <p>
      Aktualna liczba wypożyczonych książek:
      <span class="fw-semibold">{{
        quantity
      }}</span>
    </p>
    <button
      class="btn btn-outline-light"
      @click="onShowList"
    >
      Lista książek
    </button>
  </div>
  <p v-else>Nie masz żadnych książek</p>
</template>

<script lang="ts">
import { useUserSlicer } from '@/store/useUserSlicer';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

interface ReservedBooksState {
  quantity: number;
}

export default defineComponent({
  setup(props, ctx) {
    const { getReservedBooksQuantity: quantity } =
      storeToRefs(useUserSlicer());

    return {
      quantity,
    };
  },
  methods: {
    onShowList() {
      this.$emit('booksListEmitter', true);
    },
  },
});
</script>

<style lang=""></style>
