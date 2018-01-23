import { helper } from '@ember/component/helper';

export default helper(([fn]) => {
  return (event, ...rest) => {
    let form = event.target;
    let result = {};

    forEach(form.elements, element => {
      result[element.name] = getValue(element);
    });

    if (fn) {
      fn(result, ...rest);
    } else {
      return result;
    }
  }
});

function getValue(control) {
  if (control instanceof HTMLSelectElement && control.multiple) {
    let selected = control.querySelectorAll('option:checked');
    return map(selected, option => option.value);
  } else {
    return control.value;
  }
}

function map(c, f) {
  return Array.prototype.map.call(c, f);
}

function forEach(c, f) {
  return Array.prototype.forEach.call(c, f);
}
