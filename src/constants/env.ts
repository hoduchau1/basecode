const envConfigs = process.env

export const isProduction = process.env.NODE_ENV === 'production' ? true : false
export const port = envConfigs.PORT || 3000
export const corsOrigins = envConfigs.CORS_ORIGINS?.split(',')

export default envConfigs
