<template>
  <div class="container-fluid">
    <div class="input-group">
      <input
        class="form-control"
        type="search"
        v-model="searcher"
        @keypress="onFind"
      />
      <button
        data-test-id="searcher-btn"
        class="btn btn-outline-light"
        @click="onFind"
        :disabled="setDisabled"
      >
        Szukaj
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    searcher: '',
  }),
  computed: {
    setDisabled(): boolean {
      return !this.searcher;
    },
  },
  methods: {
    onFind(event: Event) {
      if (event instanceof KeyboardEvent) {
        event.code === 'Enter' &&
          this.searcher &&
          this.$emit('searcher', this.searcher);
        return;
      }

      this.$emit('searcher', this.searcher);
    },
  },
});
</script>

<style lang="scss" scoped></style>
