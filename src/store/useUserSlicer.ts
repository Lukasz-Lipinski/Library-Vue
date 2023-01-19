import { Book } from '@/views/BooksVue.vue';
import { defineStore } from 'pinia';

export interface UserProps {
  name?: string;
  surname?: string;
  email: string;
  reservedBooks?: Book[];
}

interface UserSlicerProps {
  isLogged: boolean;
  user: UserProps;
}

export const useUserSlicer = defineStore(
  'userSlicer',
  {
    state(): UserSlicerProps {
      return {
        isLogged: true,
        user: {
          email: '',
          name: '',
          surname: '',
          reservedBooks: [],
        },
      };
    },
    actions: {
      login(payload: UserProps) {
        this.user = payload;
        this.isLogged = true;
      },
      logout() {
        this.user = {
          email: '',
          name: '',
          surname: '',
          reservedBooks: [],
        };
        this.isLogged = false;
      },
      reserveBook(payload: Book) {
        this.user.reservedBooks?.push(payload);
      },
    },
  }
);
