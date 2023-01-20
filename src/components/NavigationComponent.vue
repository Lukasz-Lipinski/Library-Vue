<template>
  <nav class="nav navbar bg-light">
    <div class="d-flex flex-row">
      <router-link
        :class="
          link.href === '/'
            ? 'navbar-brand nav-link'
            : 'nav-link'
        "
        active-class="text-secondary"
        v-for="(link, index) in links"
        :to="link.href"
        :key="index"
        >{{ link.label }}</router-link
      >
    </div>
    <div
      class="d-flex"
      v-if="isLogged"
    >
      <h5
        class="h5 align-self-center text-center text-primary px-5"
      >
        Cześć {{ user.name }} !
      </h5>
      <router-link
        v-for="(link, index) in linksForLogged"
        active-class="text-secondary"
        class="nav-link"
        :key="index"
        :to="link.href"
        @click="
          link.label === 'Wyloguj' && logout()
        "
      >
        {{ link.label }}
      </router-link>
    </div>
    <div
      class="d-flex"
      v-if="!isLogged"
    >
      <router-link
        v-for="(link, index) in linksForNotLogged"
        active-class="text-secondary"
        class="nav-link"
        :key="index"
        :to="link.href"
        >{{ link.label }}</router-link
      >
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserSlicer } from '@/store/useUserSlicer';

interface Link {
  href: string;
  label: string;
}

interface State {
  links: Link[];
  linksForLogged: Link[];
  linksForNotLogged: Link[];
}

export default defineComponent({
  setup(props, ctx) {
    const { getUser, getUserStatus } =
      storeToRefs(useUserSlicer());

    const { logout } = useUserSlicer();

    return {
      isLogged: getUserStatus,
      user: getUser,
      logout,
    };
  },
  data(): State {
    return {
      links: [
        { href: '/', label: 'Strona główna' },
        { href: '/about', label: 'O nas' },
      ],
      linksForLogged: [
        { href: '/books', label: 'Zbiory' },
        { href: '/account', label: 'Konto' },
        { href: '/signin', label: 'Wyloguj' },
      ],
      linksForNotLogged: [
        { href: '/signin', label: 'Zaloguj' },
        {
          href: '/registration',
          label: 'Rejestracja',
        },
      ],
    };
  },
});
</script>

<style lang="scss"></style>
