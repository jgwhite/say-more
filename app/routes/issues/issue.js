import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model({ issue_id: id }) {
    let store = this.get('store');
    return store.findRecord('issue', id, { include: 'labels' });
  }
});
