/* eslint-env node */
'use strict';

var Config = require('./lib/config');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-service-worker-no-cookie-requests',

  included: function(app) {
    this._super.included && this._super.included.apply(this, arguments);
    this.app = app;
    this.app.options = this.app.options || {};
    this.app.options['esw-no-cookie-requests'] = this.app.options['esw-no-cookie-requests'] || {};
  },

  treeForServiceWorker(swTree, appTree) {
    var options = this.app.options['esw-no-cookie-requests'];
    var configFile = new Config([appTree], options);

    return mergeTrees([swTree, configFile]);
  }
};
