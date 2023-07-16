import { TagService } from '@/services';
import { defineStore } from 'pinia';

export const useTagStore = defineStore('tagStore', {
  state: () => ({
    tags: []
  }),
  actions: {
    async getTags() {
      const res = await TagService.getTags();
      if (res?.success) {
        this.tags = res.data;
      }
      return res;
    },
    async createTag(comment: string | undefined) {
      const res = await TagService.createTag(comment);
      if (res?.success) {
        this.tags = res.data;
      }
      return res;
    }
  }
});
