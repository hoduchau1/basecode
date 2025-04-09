import { createClient, createCluster } from 'redis';
import config from '../config/redis.config';

type RedisClient = ReturnType<typeof createClient> | ReturnType<typeof createCluster>;
let redisClient: RedisClient;

export async function connectRedis() {
    if (config.mode === 'cluster') {
        const nodes = config.clusterNodes.split(',').map((node) => {
            const [host, port] = node.split(':');
            return { url: `redis://${host}:${port}` };
        });

        redisClient = createCluster({
            rootNodes: nodes,
            defaults: {
                username: config.username,
                password: config.password,
            },
        });
    } else {
        redisClient = createClient({
            url: `redis://${config.host}:${config.port}`,
            username: config.username,
            password: config.password,
        });
    }

    redisClient.on('error', (err) => console.error('❌ Redis Error:', err));
    redisClient.on('connect', () => console.log('🔌 Connecting to Redis...'));
    redisClient.on('ready', () => console.log(`✅ Redis connected in ${config.mode} mode`));

    await redisClient.connect();
}

export default () => redisClient;
