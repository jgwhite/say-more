import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  labels: readOnly('loadLabels.last.value'),

  loadLabels: task(function * () {
    let store = this.get('store');
    let labels = yield store.findAll('label');

    return labels;
  }).drop().on('init'),

  createIssue: task(function * (attrs) {
    let store = this.get('store');

    attrs.labels = attrs.labels.map(id => store.peekRecord('label', id));

    let issue = store.createRecord('issue', attrs);

    yield issue.save();

    this.transitionToRoute('issues.issue', issue);
  }).drop()
});
