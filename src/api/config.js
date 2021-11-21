import is_production from 'src/utils/is_production';

const LOCALHOST_API_ENDPOINT_BASE = 'http://localhost/jobbook-laravel/api';
const PRODUCTION_API_ENDPOINT_BASE = 'https://pureudon.com/demo/jobbook-laravel/api';

let API_ENDPOINT_BASE = is_production ? PRODUCTION_API_ENDPOINT_BASE : LOCALHOST_API_ENDPOINT_BASE;

const DATATYPES_ENDPOINT = `${API_ENDPOINT_BASE}/datatypes`;

export { API_ENDPOINT_BASE, DATATYPES_ENDPOINT };
