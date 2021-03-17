const querystring = require('querystring');
import { POST, GET, DEL } from '../methods'
import apiEngine from "../apiEngine";

export default {
  addInventory: (files) => {
    return apiEngine(POST, '/inventories/add', { files: files})
  },
  updateInventory: (files, id) => {
    return apiEngine(POST, `/inventories/${id}`, { files: files})
  },
  removeInventory: (id) => {
    return apiEngine(DEL, `/inventories/${id}`)
  },
};