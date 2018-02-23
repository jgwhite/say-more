import { click } from '@ember/test-helpers';
import findButton from './find-button';
import { calculateTabsTo } from './tabbability';

export default function clickByLabel(text) {
  let element = findButton(text);

  if (!element) {
    throw new Error(`Could not find a button containing "${text}"`);
  }

  let tabs = calculateTabsTo(element);

  if (tabs < 0) {
    throw new Error(`The user would have to tab backwards to reach the button containing "${text}"`);
  }

  return click(element);
}

