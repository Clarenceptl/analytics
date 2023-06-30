import { TOKEN } from '@/enums';
import { checkToken } from '@/helpers';
import { useUserStore } from '@/stores';

export const authMiddleware = async (): Promise<boolean> => {
  const userStore = useUserStore();
  const token = localStorage.getItem(TOKEN.BEARER);
  if (checkToken(token)) {
    await userStore.loadContextUser();
    return true;
  }
  return false;
};
