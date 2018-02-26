import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { fillIn, click } from 'say-more/tests/helpers/all';

module('Acceptance | say more', function(hooks) {
  setupApplicationTest(hooks);

  test('filing an issue', async function(assert) {
    server.logging = true;

    await visit('/issues/new');
    await fillIn('Title', 'Example');
    await fillIn('Body', 'This is my issue…');
    await fillIn('Assignees', 'Alice');
    await fillIn('Labels', 'Feature');
    await fillIn('Project', 'Some Project');
    await fillIn('Milestone', 'v1');
    await click('Submit');

    assert.dom('h1').hasText('Example');
  });
});
