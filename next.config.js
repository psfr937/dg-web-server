const withPlugins = require('next-compose-plugins');
const withStyles = require('@webdeb/next-styles')
const path = require('path')

const configs = {
  // Target must be serverless
  target: "serverless",
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

// module.exports = withPlugins(
//   [
//     [withStyles, {
//       sass: true, // use .scss files
//       modules: true, // style.(m|module).css & style.(m|module).scss for module files
//     }]
//   ],
//   configs
// );

module.exports = configs
