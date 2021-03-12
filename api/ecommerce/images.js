import apiEngine from "../apiEngine";
import { POST, GET } from "../methods"

export default {
  upload: (files) => {
    return apiEngine(POST, `/api/images`, {files})
  },
};