import mongoose from 'mongoose'
import dotenv from 'dotenv'
export const mongoDBConfig = {
    uri: `mongodb://localhost:27017/database_name`,
    // uri: `mongodb://${process.env.DBUSERNAME_MONGO}:${process.env.DBPW_MONGO}@${process.env.HOST_MONGO}`,
    options: {
        autoCreate: true,
        autoIndex: true,
        maxPoolSize: 10,
        minPoolSize: 5,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 5000
    } satisfies mongoose.ConnectOptions
} as const
