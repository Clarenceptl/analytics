import { TOKEN } from '@/enums';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';

interface Token {
  exp: number;
  id: string;
  iat: number;
}

export const now = dayjs();

export const clearToken = () => {
  localStorage.removeItem(TOKEN.BEARER);
};

export const checkToken = (token: string | null): boolean => {
  if (!token) return false;
  const accessToken: Token = jwtDecode(token);
  const { exp } = accessToken;

  if (!exp) return false;
  if (exp < now.unix()) {
    clearToken();
    return false;
  }
  return true;
};
