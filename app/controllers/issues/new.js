import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  createIssue: task(function * (form) {
    let store = this.get('store');
    let issue = store.createRecord('issue', {
      title: form.title.value,
      body: form.body.value,
      assignees: form.assignees.value,
      labels: form.labels.value,
      project: form.project.value,
      milestone: form.milestone.value,
    });

    try {
      yield issue.save();
      this.transitionToRoute('issues.issue', issue);
    } catch(error) {
      // TODO
    }
  }).drop()
});
