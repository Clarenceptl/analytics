import { TOKEN } from '@/enums';
import type { ApiDTO, LoginVM, UserDTO } from '@/models';

const API_URL = import.meta.env.VITE_API_URL;
const authToken = localStorage.getItem(TOKEN.BEARER) ?? '';

export class AuthService {
  static async registerUser(user: UserDTO): Promise<ApiDTO | any> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      return await response.json();
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  }

  static async loginUser(data: LoginVM): Promise<ApiDTO | any> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  }

  static async verifyUser(id: string) {
    try {
      const response = await fetch(`${API_URL}/auth/verify-account`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Autorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(id)
      });
      return await response.json();
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  }
}
