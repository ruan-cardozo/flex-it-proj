import { isDevelopment } from "../utils/is-development";

export const API_URL = isDevelopment() ? 'http://localhost:8030/api/v1/' : 'url_prod' ;