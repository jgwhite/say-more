import { findAll } from '@ember/test-helpers';

export function calculateTabsTo(targetElement) {
  let { activeElement } = document;
  // TODO: Make this less naive
  let tabbables = findAll('*').filter(e => e.tabIndex >= 0);
  let activeIndex = tabbables.indexOf(activeElement);
  let targetIndex = tabbables.indexOf(targetElement);

  if (targetIndex === -1) {
    throw new Error('The target element is not tabbable, try setting tabindex');
  }

  return targetIndex - activeIndex;
}
