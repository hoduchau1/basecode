import { config as SqlConfig } from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Check bắt buộc biến môi trường
['DB_USER', 'DB_PASSWORD', 'DB_SERVER', 'DB_DATABASE'].forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`❌ Missing env: ${key}`);
    }
});

export const mssqlConfig: SqlConfig & {
    retry: {
        maxAttempts: number;
        initialDelay: number;
        maxDelay: number;
    };
} = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_SERVER!,
    database: process.env.DB_DATABASE!,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
    },
    connectionTimeout: process.env.DB_CONN_TIMEOUT
        ? parseInt(process.env.DB_CONN_TIMEOUT, 10)
        : 15000,
    requestTimeout: process.env.DB_REQ_TIMEOUT
        ? parseInt(process.env.DB_REQ_TIMEOUT, 10)
        : 15000,

    // Retry cấu hình cho helper dùng
    retry: {
        maxAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '5', 10),
        initialDelay: parseInt(process.env.DB_RETRY_DELAY || '1000', 10),
        maxDelay: parseInt(process.env.DB_RETRY_MAX_DELAY || '10000', 10)
    }
};
