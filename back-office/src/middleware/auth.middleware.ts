import { TOKEN } from '@/enums';
import { checkToken } from '@/helpers';
import { useUserStore } from '@/stores';

export const authMiddleware = async (): Promise<boolean> => {
  const userStore = useUserStore();
  const token = localStorage.getItem(TOKEN.BEARER);
  if (checkToken(token)) {
    if (userStore.isConnected) return true;
    const res = await userStore.loadContextUser();

    if (!res?.success) {
      localStorage.removeItem(TOKEN.BEARER);
      return false;
    }
    return true;
  }
  return false;
};
