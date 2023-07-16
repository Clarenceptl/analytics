import { trackFrontend } from '@sdk/vue-tracker';
import { throttle } from 'lodash';
import { onMounted, onUnmounted, ref } from 'vue';

export default function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  const updateMousePosition = throttle(async (event) => {
    x.value = event.clientX;
    y.value = event.clientY;
    trackFrontend({
      config: {
        APP_ID: 'API_ID_123',
        type: 'mouse'
      },
      data: {
        x: event.clientX,
        y: event.clientY
      }
    });
  }, 1000);

  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition);
  });

  return { x, y };
}
