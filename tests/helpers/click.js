import { click, findAll } from '@ember/test-helpers';

export default function clickByLabel(text) {
  let element = findElement(text);

  if (!element) {
    throw new Error(`Could not find a button containing "${text}"`);
  }

  let tabs = calculateTabsTo(element);

  if (tabs < 0) {
    throw new Error(`The user would have to tab backwards to reach the button containing "${text}"`);
  }

  return click(element);
}

function findElement(text) {
  let selector = 'button,a[href],[role="button"]';
  let element = findAll(selector).find(matches(text));

  return element;
}

function matches(text) {
  return element => matchesInnerText(element, text) ||
                    matchesTitle(element, text) ||
                    matchesAriaLabel(element, text);
}

function matchesInnerText(element, text) {
  return element.innerText.includes(text);
}

function matchesTitle(element, text) {
  return element.title && element.title.includes(text);
}

function matchesAriaLabel(element, text) {
  let ariaLabel = element.getAttribute('aria-label');
  return ariaLabel && ariaLabel.includes(text);
}

function calculateTabsTo(targetElement) {
  let { activeElement } = document;
  // TODO: Make this less naive
  let tabbables = findAll('*').filter(e => e.tabIndex >= 0);
  let activeIndex = tabbables.indexOf(activeElement);
  let targetIndex = tabbables.indexOf(targetElement);

  return targetIndex - activeIndex;
}
