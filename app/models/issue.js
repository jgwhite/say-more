import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  title: attr('string'),
  body: attr('string'),
  assignees: attr(),
  labels: attr(),
  project: attr('string'),
  milestone: attr('string')
});
