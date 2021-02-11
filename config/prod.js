
const merge = require('lodash/fp/merge');

const defaultConfig = require('./default');

module.exports = merge(defaultConfig,{
  apiUrl: process.env.PROD_API_URL,
  listenTo: process.env.PROD_LISTEN_TO,
  host: process.env.PROD_NODE_HOST, // Define your host from 'package.json'
  port: process.env.PROD_PORT,
  publicPort: process.env.PROD_PUBLIC_PORT,
  apiServerHost: process.env.PROD_API_SERVER_HOST,
  apiServerPublicPort: process.env.PROD_API_SERVER_PUBLIC_PORT,
  apiServerProtocol: process.env.PROD_API_SERVER_PROTOCOL,
  domainName: process.env.PROD_DOMAIN_NAME,
  hasDomainName: process.env.PROD_HAS_DOMAIN_NAME == 'true',
  stripe: process.env.NEXT_PUBLIC_STRIPE_LIVE
});
