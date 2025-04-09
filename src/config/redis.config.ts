import dotenv from 'dotenv';
dotenv.config();

export default {
    mode: process.env.REDIS_MODE || 'standalone', // 'standalone' | 'cluster'
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    clusterNodes: process.env.REDIS_CLUSTER_NODES || '', // dạng 'host1:port1,host2:port2'
    username: process.env.REDIS_USERNAME || undefined,
    password: process.env.REDIS_PASSWORD || undefined,
};
