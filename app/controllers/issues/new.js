import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  createIssue: task(function * (attrs) {
    let store = this.get('store');
    let issue = store.createRecord('issue', attrs);

    try {
      yield issue.save();
      this.transitionToRoute('issues.issue', issue);
    } catch(error) {
      // TODO
    }
  }).drop()
});
