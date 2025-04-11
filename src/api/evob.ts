import axios, { AxiosHeaders } from 'axios';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import https from 'https';

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 100, 
  keepAliveMsecs: 10000 
});

const agentCode = process.env.DEVAPLAY_AGENT_CODE!;
const privateKey = process.env.PRIVATE_KEY_EVO_B!.replace(/\n/g, '\n');
const baseURL = process.env.DEVAPLAY_API_URL!;

const AUTH_SCHEME = 'DEVAPLAY-SHA256-RSA2048';

const createSignature = (method: string, url: string, timestamp: string, nonce: string) => {
  const stringToSign = `${method} ${url} ${timestamp} ${nonce}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(stringToSign);
  signer.end();
  return signer.sign(privateKey, 'base64');
};

export const axiosClientDevaplay = axios.create({
  baseURL,
  timeout: 30000,
  httpsAgent, //keepalive connection
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  Accept: 'application/json'},
  // todo: implement keepalive, connection pool

});

axiosClientDevaplay.interceptors.request.use(
  async (config) => {
    const method = config.method?.toUpperCase() || 'GET';
    const url = config.url?.toLowerCase() || ''.toLowerCase();
    const timestamp = Date.now().toString();
    const nonce = uuidv4();
    // const body = config.data ? JSON.stringify(config.data) : '';
    console.log(method, url, timestamp, nonce)
    const signature = createSignature(method, url, timestamp, nonce);
    const authHeader = `${AUTH_SCHEME} ${agentCode},${timestamp},${nonce},${signature}`;

    console.log(authHeader)
    config.headers = AxiosHeaders.from({
    Authorization: authHeader,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    });


    console.log(`\u{1F680} [DEVAPLAY] ${method} ${url} | Request`);
    return config;
  },
  (error) => {
    console.error('[DEVAPLAY Request Error]', error.message);
    return Promise.reject(error);
  }
);

axiosClientDevaplay.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    console.log(`\u2705 [DEVAPLAY] ${method?.toUpperCase()} ${url} | Response: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('[DEVAPLAY Response Error]', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);
