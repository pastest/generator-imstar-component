'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const moment = require('moment');
const path = require('path');
const getName = require('imweb-git-user-name');
const validation = require('../../lib/validation');
const namePre = 'star-';

function hyphenToCamel(hyphen, firstUpper) {
  const toUpper = function (match, letter) {
    return letter.toUpperCase();
  };

  if (firstUpper) {
    return hyphen.replace(/-(\w)/g, toUpper) // 中划后字母大写
    .replace(/^(\w)/g, toUpper); // 首字母大写
  } else {
    return hyphen.replace(/-(\w)/g, toUpper);
  }
}

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.distPath = path.resolve(this.destinationPath(`packages/`));
  },
  prompting: function () {
    this.userName = getName() || getName(true);

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Input the name of the package:',
        validate: v => {
          if (!validation.isHyphen(v)) {
            return 'Must input hyphen name(eg. packname, m-packname)';
          }

          if (validation.nameConflict(`${namePre}${v}`, this.distPath)) {
            return `package ${namePre}${v} has already exists, please create a new package`;
          }

          return true;
        }
      },
      {
        type: 'input',
        name: 'author',
        message: 'Input the author of the package:',
        validate: v => {
          if (validation.notEmpty(v)) {
            return true;
          }

          return 'Author can not be null';
        },
        when: () => {
          return !this.userName
        }
      },
      {
        type: 'confirm',
        name: 'es6lint',
        message: 'Is this package use es6?',
        default: true
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.lowerName = hyphenToCamel(this.props.name.replace('m-', ''), false);
      this.props.upperName = hyphenToCamel(this.props.name.replace('m-', ''), true);
      this.props.fullName = `${namePre}${this.props.name}`;
      this.props.date = moment().format('YYYY-MM-DD');

      if (!this.props.author) {
        this.props.author = this.userName;
      }
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      path.resolve(this.distPath, `${this.props.fullName}`),
      this.props
    );

    this.fs.move(
      path.resolve(this.distPath, `${this.props.fullName}/src/$lowerName.js`),
      path.resolve(this.distPath, `${this.props.fullName}/src/${this.props.lowerName}.js`)
    );

    this.fs.move(
      path.resolve(this.distPath, `${this.props.fullName}/eslintrc.js`),
      path.resolve(this.distPath, `${this.props.fullName}/.eslintrc.js`)
    );
  },

  end: function () {
    this.log(`create package ${chalk.green(this.props.fullName)} success!`);
    this.log(`package loacated in dir: ${chalk.green(path.resolve(this.distPath, `${this.props.fullName}`))}`);
  }
});
