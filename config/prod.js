
const merge = require('lodash/fp/merge');

const defaultConfig = require('./default');

module.exports = merge(defaultConfig,{
  apiUrl: process.env.NEXT_PUBLIC_PROD_API_URL,
  stripe: process.env.NEXT_PUBLIC_STRIPE_LIVE
});
