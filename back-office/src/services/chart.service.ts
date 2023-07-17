import { TOKEN } from '@/enums';
import { EventSourcePolyfill } from 'event-source-polyfill';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export class ChartService {
  static getPageviews(): EventSourcePolyfill {
    return new EventSourcePolyfill(`${VITE_API_URL}/event/pageviews`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem(TOKEN.BEARER)}`
      }
    });
  }
}
