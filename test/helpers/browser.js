var addPath = require('app-module-path').addPath;
// Add paths so tests can import modules easily
addPath(__dirname + '/../../src');
addPath(__dirname + '/../../config');

// Setup babel
var conf = require('babel.dev');
require('babel-core/register')(conf);

// Setup chai and enzyme
var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');
chai.use(chaiEnzyme());
