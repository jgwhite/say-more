import { helper } from '@ember/component/helper';

export default helper(function([fn]) {
  return function(event) {
    event.preventDefault();
    fn(...arguments);
  };
});
