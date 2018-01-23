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
      assignees: getValue(form.assignees),
      labels: getValue(form.labels),
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

function map(c, f) {
  return Array.prototype.map.call(c, f);
}

function getValue(control) {
  if (control instanceof HTMLSelectElement && control.multiple) {
    let selected = control.querySelectorAll('option:checked');
    return map(selected, option => option.value);
  } else {
    return control.value;
  }
}
