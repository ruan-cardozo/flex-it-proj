import { isDevelopment } from "../utils/is-development";

export const API_URL = isDevelopment() ? 'http://172.18.0.6:8030/api/v1/' : 'url_prod' ;