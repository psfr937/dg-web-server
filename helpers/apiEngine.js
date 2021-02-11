import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import { apiServerHost, apiServerPublicPort, hasDomainName, domainName } from '../config/index';
import nextCookie from "next-cookies";
import getApiUrl from "../utils/getApiUrl";

const methods = ['get', 'post', 'put', 'patch', 'del'];


/*
const tough = require('tough-cookie');

const cookieJar = new tough.CookieJar();

if(typeof window === 'object') {
  const axiosCookieJarSupport = require('axios-cookiejar-support').default;

  cookieJar.setCookieSync(document.cookie, 'http://localhost:3000');
}
*/

class ApiEngine {
  constructor(ctx) {
    methods.forEach(method => {
      this[method] = (path, { params, data, files, query } = {}, { cache } = {}) => {
        const content = {
          method,
          url: getApiUrl(path, query),
          withCredentials: true
        };
        console.log(method)
        const headers = {}
        const config = {}
        const credentials = {}
        if (cache) {
          Object.assign(headers, { 'Cache-Control': 'no-cache' })
          Object.assign(config, {
            adapter: cacheAdapterEnhancer(axios.defaults.adapter, true)
          })
        }

        if (params) {
          Object.assign(content, { params });
        }
        if (data) {
          if(params)
          Object.assign(headers, { 'Content-Type': 'application/json' });
          Object.assign(content, { data });
        }
      //  console.log('apiEngine nextCookie(ctx).token')
      //  console.log( nextCookie(ctx).token )
        if (!(typeof window === 'object')) {
          const { token, info } = nextCookie(ctx)
            Object.assign(credentials, 'include')
            Object.assign(headers, { 'cookie': `token=${token}` })
        }

        /*  if(typeof window === 'object' && document.cookie !== null){
            Object.assign(headers, { 'Cookie': document.cookie });
          } */

        if (files) {
          const formData = new FormData();
          Object.keys(files).forEach(name => {
            formData.append(name, files[name]);
          })
          Object.assign(headers, { 'Content-Type': 'multipart/form-data' });
          Object.assign(content, { data: formData });
        }
        if(Object.getOwnPropertyNames(headers).length !== 0) {
          Object.assign(content, {headers});
        }
        if(Object.getOwnPropertyNames(credentials).length !== 0) {
          Object.assign(content, {credentials});
        }
        if(Object.getOwnPropertyNames(config).length !== 0) {
          Object.assign(content, {config});
        }
        return axios(content);
      };
    });
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  static empty() {}
}


export default ApiEngine;