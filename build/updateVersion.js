var fs = require('fs');
var util = require('util');
var semver = require('semver');
var join = require('path').join;
var inc = process.env.inc || 'patch';
var version = semver.inc(require('../package.json').version, inc);

console.log(version)

updateDocs();
updateIndex();
['../package.json', '../bower.json'].forEach(updateConfig);

function updateDocs() {
  var config = read('../docs/_config.yml');
  config = config.replace(/current_version: .*/, util.format("current_version: %s", version));
  write('../docs/_config.yml', config);
}

function updateIndex() {
  var index = read('../index.js');
  index = index.replace(/version: '.*'/, util.format("version: '%s'", version));
  write('../index.js', index);
}

function updateConfig(path) {
  var config = JSON.parse(read(path));
  config.version = version;
  write(path, JSON.stringify(config, null, 2));
}

function write(path, data) {
  fs.writeFileSync(join(__dirname, path), data);
}

function read(path) {
  return fs.readFileSync(join(__dirname, path), 'utf-8');
}