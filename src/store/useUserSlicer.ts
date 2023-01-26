import { Book } from '@/shared/interfaces';
import { defineStore } from 'pinia';

export interface UserProps {
  name?: string;
  surname?: string;
  email: string;
  reservedBooks?: Book[];
  id?: string;
}

interface UserSlicerProps {
  isLogged: boolean;
  user: UserProps;
}

export const useUserSlicer = defineStore(
  'userSlicer',
  {
    state: (): UserSlicerProps => {
      return {
        isLogged: true,
        user: {
          email: '',
          name: '',
          surname: '',
          reservedBooks: [],
          id: '',
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
          id: '',
          reservedBooks: [],
        };
        this.isLogged = false;
      },
      reserveBook(payload: Book) {
        this.user.reservedBooks?.push(payload);
      },
      putDownBook(payload: Book) {
        this.user.reservedBooks =
          this.user.reservedBooks?.filter(
            (book) =>
              book.isbn13 !== payload.isbn13
          );
      },
    },
    getters: {
      getReservedBooksQuantity: (state) =>
        state.user.reservedBooks?.length,
      getReservedBooks: (state) =>
        state.user.reservedBooks,
      getUser: (state) => state.user,
      getUserStatus: (state) => state.isLogged,
    },
  }
);
