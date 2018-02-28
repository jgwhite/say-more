import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['labels'],

  links(issue) {
    return {
      labels: {
        related: `/issues/${issue.id}/labels`
      }
    };
  }
});
