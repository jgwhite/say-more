import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, fillIn } from '@ember/test-helpers';

module('Acceptance | say more', function(hooks) {
  setupApplicationTest(hooks);

  test('filing an issue', async function(assert) {
    await visit('/issues/new');
    await fillIn('input[name="title"]', 'Example');
    await fillIn('textarea[name="body"]', 'This is my issue…');
    await fillIn('select[name="assignees"]', 'Alice');
    await fillIn('select[name="labels"]', 'Feature');
    await fillIn('select[name="project"]', 'Some Project');
    await fillIn('select[name="milestone"]', 'v1');
    await click('button[type="submit"]');

    assert.dom('h1').hasText('Example');
  });
});
