import { focus, triggerEvent, triggerKeyEvent } from '@ember/test-helpers';
import findButton from './find-button';
import { calculateTabsTo } from './tabbability';

const KEY_RETURN = 13;

export default async function keyboardClick(text) {
  let element = findButton(text);

  if (!element) {
    throw new Error(`Could not find a button containing "${text}"`);
  }

  let tabs = calculateTabsTo(element);

  if (tabs < 0) {
    throw new Error(`The user would have to tab backwards to reach the button containing "${text}"`);
  }

  await focus(element);
  await triggerKeyEvent(element, 'keydown', KEY_RETURN);
  await triggerKeyEvent(element, 'keypress', KEY_RETURN);
  await triggerKeyEvent(element, 'keyup', KEY_RETURN);

  if (element.type === 'submit' && element.form) {
    await triggerEvent(element.form, 'submit');
  }
}
