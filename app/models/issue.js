import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  body: attr('string'),
  assignees: attr(),
  project: attr('string'),
  milestone: attr('string'),

  labels: hasMany()
});
