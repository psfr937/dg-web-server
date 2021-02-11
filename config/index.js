/* @flow */

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
  console.log('hi1');
  console.log(process.env.NEXT_PUBLIC_DEV_API_URL)
  module.exports = require('./default');
} else {
  console.log('hi2');
  module.exports = require('./prod');
}
