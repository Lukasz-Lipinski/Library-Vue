import { defineStore } from 'pinia';

export interface UserProps {
  name?: string;
  surname?: string;
  email: string;
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
        isLogged: false,
        user: {
          email: '',
          name: '',
          surname: '',
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
        };
        this.isLogged = false;
      },
    },
  }
);
