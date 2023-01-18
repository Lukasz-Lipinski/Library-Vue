<template>
  <li class="col-4 my-2">
    <div class="card p-3 customHeight">
      <div class="card-body">
        <h5 class="card-title">
          {{ oneNews?.title }}
        </h5>
        <p class="card-text">
          {{ oneNews?.description }}
        </p>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface NewsTieProps {
  title: string;
  description: string;
}

export default defineComponent({
  props: {
    oneNews: {
      type: Object as PropType<NewsTieProps>,
    },
  },
});
</script>

<style lang="scss">
.customHeight {
  height: 200px !important;
}
</style>
