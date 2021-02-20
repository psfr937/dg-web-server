import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import nextCookie from "next-cookies";
import getApiUrl from "@utils/getApiUrl";


export default (method, path, { params, data, files, query, cache, ctx } = {}) => {
  const content = {
    method,
    url: getApiUrl(path, query),
    withCredentials: true
  };

  const headers = {};
  const config = {};
  const credentials = {};
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
    const { token, info } = nextCookie(ctx);
      Object.assign(credentials, 'include');
      Object.assign(headers, { 'cookie': `token=${token}` })
  }

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


