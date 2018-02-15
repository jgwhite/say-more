import { click, findAll } from '@ember/test-helpers';

export default function clickByLabel(text) {
  let element = findElement(text);

  return click(element);
}

function findElement(text) {
  let selector = 'button,a[href],[role="button"]';
  let element = findAll(selector).find(matches(text));

  if (!element) {
    throw new Error(`Could not find a button containing "${text}"`);
  }

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
