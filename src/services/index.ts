import { Book } from '@/shared/interfaces';
import { UserProps } from '@/store/useUserSlicer';
import axios from 'axios';

//INTERFACES

export interface Request {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface Response {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export const sendRequest = async (
  user: Omit<Request, 'returnSecureToken'>
) => {
  const url = `${process.env.VUE_APP_DB_URL_SIGNUP}${process.env.VUE_APP_API_KEY}`;
  const req = await axios
    .post(url, {
      ...user,
      returnSecureToken: true,
    })
    .catch((err) => err);

  const { data, status } = req;

  return {
    status,
    data,
  };
};

export const sendUserData = async (
  userData: UserProps
) => {
  const url = `${process.env.VUE_APP_DB_URL}/users/${userData.id}.json`;
  await axios.post<Response>(url, {
    ...userData,
  });
};

export const updateDataOnBackend = async (
  userData: UserProps
) => {
  const url = `${process.env.VUE_APP_DB_URL}/users/${userData.id}.json`;
  await axios.put(url, userData);
};

export const clearErrors = (
  type: string,
  functionCondition: Function,
  errors: Array<string>
) => {
  functionCondition();

  if (!errors.length) {
    return true;
  }

  return false;
};

export const filterErrors = (
  errorsArray: Array<string>,
  flag: string
) => {
  return errorsArray.filter(
    (error) => error !== flag
  );
};
