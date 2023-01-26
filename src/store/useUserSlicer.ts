import { Book } from '@/shared/interfaces';
import { defineStore } from 'pinia';

export interface UserProps {
  name?: string;
  surname?: string;
  email: string;
  reservedBooks?: Book[];
  localId?: string;
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
        isLogged: false,
        user: {
          email: '',
          name: '',
          surname: '',
          reservedBooks: [],
          localId: '',
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
          localId: '',
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
      getUserData: (state) => {
        const { email, name, surname } =
          state.user;
        const userData: Omit<
          UserProps,
          'reservedBooks' | 'id' | 'localId'
        > = {
          email,
          name,
          surname,
        };
        return userData;
      },
      getUser: (state) => state.user,
      getUserStatus: (state) => state.isLogged,
    },
  }
);
