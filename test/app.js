'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-imstar-component:app', function () {
  this.timeout(5000);

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'm-test',
        author: 'shirlyzhang',
        es6lint: true
      });
  });

  it('creates files', function () {
    assert.file([
      'packages/star-m-test/index.js',
      'packages/star-m-test/package.json',
      'packages/star-m-test/README.md',
      'packages/star-m-test/.eslintrc.js',
      'packages/star-m-test/test/index.js',
      'packages/star-m-test/src/test.js'
    ]);
  });

});
