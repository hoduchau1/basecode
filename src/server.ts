import app from './app';
import { mongoDB } from './databases/mongoDb.database'
import { db } from './databases/mssql.database'
import redisClient, { connectRedis } from './databases/redis.database';



// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);

// });



(async () => {
    try {
        await mongoDB.getConnection()
        await db.getPool();
        await connectRedis();
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server chạy tại http://localhost:${process.env.PORT}`);
        });

    } catch (error: any) {
        console.error('🔥 Lỗi khi khởi động ứng dụng:', error);
        process.exit(1);
    }
})();
