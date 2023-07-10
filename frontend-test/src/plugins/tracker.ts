import FingerprintJS from '@fingerprintjs/fingerprintjs';
import UAParser from 'ua-parser-js';
import type { App } from 'vue';
import type { Router } from 'vue-router';

const sendEvent = (data) => {
  console.log('sendEvent', data);
  const url = 'http://localhost:3080/v1/event/front';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};


export default async function tracker(Vue: App<Element>, options: any, router: Router): Promise<void> {
  const inactivityTimeout = options.inactivityTimeout || 3000;

  if (!options.APP_ID) {
    throw new Error('Please provide the APP_ID');
  }

  const uaParser = new UAParser();
  const idVisitor = (await (await FingerprintJS.load()).get()).visitorId;

  if (!idVisitor) {
    throw new Error('Error id visitor');
  }
  const configData = {
    APP_ID: options.APP_ID,
    service: options.service || 'website',
    visitorId: idVisitor,
    uaParser: uaParser.getResult(),
    session: 1
    // api endpoint
  };

  router.afterEach((to, from) => {
    const { fullPath, meta, query } = to;
    sendEvent({
      ...configData,
      type: 'pageview',
      data: {
        fullPath,
        meta,
        query
      }
    });
    // resetInactivityTimer();
  });
  const eventListeners: Record<string, any> = {};

  Vue.directive('track', {
    mounted(el, binding) {
      eventListeners[binding.arg as string] = () => {
        // resetInactivityTimer();
        console.log('send data');
        sendEvent({
          ...configData,
          event: binding.modifiers,
          tag: binding.arg
        });
      };
      for (const modifier in binding.modifiers) {
        el.addEventListener(modifier, eventListeners[binding.arg as string]);
      }
    },
    unmounted(el, binding) {
      for (const modifier in binding.modifiers) {
        el.removeEventListener(modifier, eventListeners[binding.arg as string]);
      }
      delete eventListeners[binding.arg as string];
    }
  });
}

// export { sendEvent }
