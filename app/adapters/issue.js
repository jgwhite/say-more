import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  findHasMany() {
    return this._super(...arguments);
  }
});
