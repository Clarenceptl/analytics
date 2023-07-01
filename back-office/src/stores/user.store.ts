import { TOKEN, USER_ROLE } from '@/enums';
import type { LoginVM, RegisterDTO, User } from '@/models';
import { AuthService, UserService } from '@/services';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  //#region values
  const contextUser = reactive<{ user: User | null }>({
    user: null
  });
  //#endregion

  //#region getters
  const getContextUser = computed(() => contextUser.user);
  const isConnected = computed(() => !!contextUser.user);
  const isAdmin = computed(() => contextUser.user?.roles?.includes(USER_ROLE.ADMIN));
  //#endregion

  //#region Services methods
  const loadContextUser = async () => {
    if (!contextUser.user?._id) {
      const token = localStorage.getItem(TOKEN.BEARER);

      if (!token) return null;

      const res = await UserService.getSelfUser();
      if (res?.success) {
        contextUser.user = res.data;
      }
      return res;
    }
  };

  const getUsers = async () => {
    const res = await UserService.getUsers();
    return res;
  };

  const register = async (user: RegisterDTO) => {
    return await AuthService.registerUser(user);
  };

  const login = async (data: LoginVM) => {
    const res = await AuthService.loginUser(data);
    if (res?.success) {
      localStorage.setItem(TOKEN.BEARER, res.data?.accessToken ?? '');
    }

    return res;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN.BEARER);
    contextUser.user = null;
  };

  const verifyEmail = async (id: string) => {
    return await AuthService.verifyUser(id);
  };
  //#endregion
  return {
    register,
    verifyEmail,
    login,
    loadContextUser,
    getContextUser,
    isConnected,
    logout,
    getUsers,
    isAdmin
  };
});
