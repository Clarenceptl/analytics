import FingerprintJS from '@fingerprintjs/fingerprintjs';
import type { App } from 'vue';
// const sendEvent = (data) => {
//   const url = 'https://localhost:3000/api/events';
//   fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };
export default async function tracker(Vue: App<Element>, options: any): Promise<void> {
  if (!options.APP_ID) {
    throw new Error('Please provide the APP_ID');
  }

  const idVisitor = (await (await FingerprintJS.load()).get()).visitorId;

  if (!idVisitor) {
    throw new Error('Error id visitor');
  }
  const configData = {
    APP_ID: options.APP_ID,
    service: options.service || 'website',
    visitorId: idVisitor
    // TODO
    // id session d'analitycs timestamp
    // api endpoint
  };
  const eventListeners = {};
  console.log('configData', configData);

  Vue.directive('track', {
    mounted(el, binding) {
      eventListeners[binding.arg] = () => {
        console.log('send data', {
          ...configData,
          event: binding.modifiers,
          tag: binding.arg,
          modifier: binding.modifiers,
          binding: binding
        });
        // sendEvent({
        //   ...configData,
        //   event: binding.modifiers,
        //   tag: binding.arg,
        //   modifier: binding.modifiers
        // })
      };
      for (const modifier in binding.modifiers) {
        el.addEventListener(modifier, eventListeners[binding.arg]);
      }
      // el.addEventListener('click', eventListeners[binding.arg]);
    },
    unmounted(el, binding) {
      for (const modifier in binding.modifiers) {
        el.removeEventListener(modifier, eventListeners[binding.arg]);
      }
      delete eventListeners[binding.arg];
      // el.removeEventListener('click', eventListeners[binding.arg]);
    }
  });
}

// export { sendEvent }
