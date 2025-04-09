import mongoose from 'mongoose'
import { mongoDBConfig } from '../config/mongoDb.config'

class MongoDBHelper {
    private static instance: MongoDBHelper
    private isConnected = false
    private connectPromise: Promise<typeof mongoose> | null = null

    private constructor() { }

    public static getInstance(): MongoDBHelper {
        if (!MongoDBHelper.instance) {
            MongoDBHelper.instance = new MongoDBHelper()
        }
        return MongoDBHelper.instance
    }

    public async connectWithRetry(retries = 5, delay = 2000): Promise<typeof mongoose> {
        let lastError: any
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`MongoDB: Đang kết nối lần ${attempt}...`)
                const db = await mongoose.connect(mongoDBConfig.uri, mongoDBConfig.options)
                this.isConnected = true
                console.log('✅ MongoDB: Kết nối thành công.')
                return db
            } catch (err) {
                lastError = err
                console.error(`❌ MongoDB: Lỗi kết nối lần ${attempt}:`, err)
                if (attempt < retries) {
                    await new Promise(res => setTimeout(res, delay))
                }
            }
        }

        console.error('❌ MongoDB: Đã hết số lần retry, không thể kết nối.')
        throw lastError
    }

    public async getConnection(): Promise<typeof mongoose> {
        if (this.isConnected && this.connectPromise) {
            return this.connectPromise
        }

        this.connectPromise = this.connectWithRetry()
        return this.connectPromise
    }

    public async disconnect(): Promise<void> {
        if (this.isConnected) {
            await mongoose.disconnect()
            this.isConnected = false
            console.log('🔌 MongoDB: Đã ngắt kết nối.')
        }
    }
}

export const mongoDB = MongoDBHelper.getInstance()
