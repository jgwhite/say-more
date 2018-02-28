import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  links(issue) {
    return {
      labels: {
        related: `/issues/${issue.id}/labels`
      }
    };
  }
});
