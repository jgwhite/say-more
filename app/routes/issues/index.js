import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model() {
    let store = this.get('store');
    return store.findAll('issue');
  }
});
