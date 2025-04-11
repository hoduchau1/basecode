const envConfigs = process.env

export const isProduction = process.env.NODE_ENV === 'production' ? true : false
export const port = envConfigs.PORT || 3000
export const corsOrigins = envConfigs.CORS_ORIGINS?.split(',')
export const DEVAPLAY_API_URL= envConfigs.DEVAPLAY_API_URL || 'https://api.devaplay-api.com/'


export default envConfigs
