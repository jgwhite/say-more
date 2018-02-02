import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import fillIn from 'say-more/tests/helpers/fill-in';
import { visit, click } from '@ember/test-helpers';

module('Acceptance | say more', function(hooks) {
  setupApplicationTest(hooks);

  test('filing an issue', async function(assert) {
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
