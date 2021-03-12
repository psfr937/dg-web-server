import apiEngine from "../apiEngine";
import { GET } from "../methods";

export default {
  list: () => apiEngine(GET, '/tags')
}