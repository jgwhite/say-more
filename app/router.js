import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('issues', function() {
    this.route('new');
    this.route('issue', { path: ':issue_id' });
  });
});

export default Router;
