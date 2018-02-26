import { click } from '@ember/test-helpers';
import findButton from './find-button';
import { calculateTabsTo } from './tabbability';

export default async function clickByLabel(text) {
  let element = findButton(text);

  if (!element) {
    throw new Error(`Could not find a button containing "${text}"`);
  }

  let tabs = calculateTabsTo(element);

  if (tabs < 0) {
    throw new Error(`The user would have to tab backwards to reach the button containing "${text}"`);
  }

  let { handledRequests } = server.pretender;
  let before = handledRequests.length;

  await click(element);

  let requestCount = handledRequests.length - before;

  if (requestCount > 1) {
    let msg = `The application made ${requestCount} requests after clicking "${text}"`;
    for (let request of handledRequests.slice(before)) {
      msg += `\n==> ${request.method} ${request.url}`;
      if (request.requestBody) {
        msg += ` with ${request.requestBody}`;
      }
    }
    throw new Error(msg);
  }
}

