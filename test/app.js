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
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'packages/m-test/index.js',
      'packages/m-test/package.json',
      'packages/m-test/README.md',
      'packages/m-test/.eslintrc.js',
      'packages/m-test/test/index.js'
    ]);
  });

});
