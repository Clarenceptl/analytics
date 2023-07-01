import { TOKEN } from '@/enums';
import type { ApiDTO } from '@/models';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export class UserService {
  static async getUser(id) {
    try {
      const response = await fetch(`${VITE_API_URL}/users/${id.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(TOKEN.BEARER)}`
        }
      });
      return await response.json();
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  }

  static async getUsers(): Promise<ApiDTO | string> {
    try {
      const response = await fetch(`${VITE_API_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(TOKEN.BEARER)}`
        }
      });

      return await response.json();
    } catch (error: any) {
      console.error(error);
      return error.message;
    }
  }
  static async getSelfUser() {
    try {
      const response = await fetch(`${VITE_API_URL}/users/getSelf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem(TOKEN.BEARER)}`
        }
      });
      return await response.json();
    } catch (error: any) {
      console.error(error.message);
      return error.response;
    }
  }
}
