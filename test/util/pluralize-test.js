'use strict';

describe('hostNameFromUrl', function() {
  let pluralize = require('../../src/js/util/pluralize');

  it('pluralize correctly', function() {
    expect(pluralize(1, 'post')).to.equal('1 post');
    expect(pluralize(21, 'post')).to.equal('21 posts');
    expect(pluralize(10, 'turkey')).to.equal('10 turkeys');
  });
});
