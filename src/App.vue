<template>
  <NavigationComponent></NavigationComponent>
  <div class="container-fluid py-4">
    <router-view class="fadein"></router-view>
  </div>
  <component :is="{ ...setFooter }"></component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import FooterComponent from './components/FooterComponent.vue';
import NavigationComponent from './components/NavigationComponent.vue';

export default defineComponent({
  data: () => ({
    fc: FooterComponent,
  }),
  components: {
    NavigationComponent,
    FooterComponent,
  },
  computed: {
    setFooter() {
      const url = this.$route.name;

      if (
        url !== 'signin' &&
        url !== 'registration' &&
        url !== 'gallery'
      )
        return this.fc;
      return null;
    },
  },
});
</script>

<style lang="scss"></style>
