const {addBabelPlugin, override} = require('customize-cra');
const packageJSON = require('./package');

module.exports = override(
  addBabelPlugin([
    'search-and-replace',
    {
      rules: [
        {
          search: '__PACKAGE_VERSION__',
          replace: packageJSON.version
        }
      ]
    }
  ])
);
