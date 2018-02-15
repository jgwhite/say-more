import { find, findAll, fillIn } from '@ember/test-helpers';

export default function fillInByLabel(label, value) {
  let control = findControlForLabel(label);
  return fillIn(control, value);
}

function findControlForLabel(text) {
  let label = findLabel(text);

  if (label && label.control) {
    return label.control;
  }

  let control = findControl(text);

  if (control) {
    return control;
  }

  if (label && !label.control) {
    throw new Error(`Found the label "${label.innerText}" but no associated form control`);
  }

  throw new Error(`Could not find a form control labelled "${text}"`);
}

function findLabel(text) {
  return findAll('label').find(label => label.innerText.includes(text));
}

function findControl(text) {
  let selectors = [];

  for (let tag of ['input', 'textarea', 'select']) {
    for (let attr of ['title', 'aria-label', 'placeholder']) {
      selectors.push(`${tag}[${attr}="${text}"]`);
    }
  }

  return find(selectors.join(','));
}
