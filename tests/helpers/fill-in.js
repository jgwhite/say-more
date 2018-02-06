import { findAll, fillIn } from '@ember/test-helpers';

export default function(label, value) {
  let control = findControlForLabel(label);
  return fillIn(control, value);
}

function findControlForLabel(text) {
  let label = findAll('label').find(label => label.innerText.includes(text));
  if (!label) {
    throw new Error(`Could not find a label containing "${text}"`);
  }
  let { control } = label;
  if (!control) {
    throw new Error(`Found a label containing "${text}" but no associated control`);
  }

  // TODO:
  // - title
  // - aria-label
  // - aria-labelled-by
  // - placeholder

  return control;
}
