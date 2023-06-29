// import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';
import { TOAST_TYPE } from '@/enums';

interface Toast {
  message: string;
  type: TOAST_TYPE;
}
export const useToastStore = defineStore('toastStore', () => {
  const $toast = useToast();

  const createToast = ({ message, type = TOAST_TYPE.DEFAULT }: Toast) => {
    $toast.open({
      message,
      type
    });
  };

  return { createToast };
});
