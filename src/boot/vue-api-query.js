import { Model } from "vue-api-query";
import axios from "axios";

// "async" is optional
export default async () => {
  Model.$http = axios;
};
