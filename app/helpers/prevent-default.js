import { helper } from '@ember/component/helper';

export default helper(([fn]) => {
  return (event, ...rest) => {
    event.preventDefault();

    if (fn) {
      fn(event, ...rest);
    } else {
      return event;
    }
  };
});
