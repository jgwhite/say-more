import Controller from '@ember/controller';
import { task, all } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  createIssue: task(function * (attrs) {
    let store = this.get('store');
    let allLabels = yield store.findAll('label');
    attrs.labels = yield all(attrs.labels.map(name =>
      allLabels.findBy('name', name) || store.createRecord('label', { name }).save()
    ));
    let issue = store.createRecord('issue', attrs);

    yield issue.save();

    this.transitionToRoute('issues.issue', issue.get('id'));
  }).drop()
});
