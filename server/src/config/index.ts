import dotenv from 'dotenv'
dotenv.config()
const config ={
    port: process.env.PORT || 3001,
    NODE_EN: process.env.NODE_ENV,
    mongoUrl: process.env.MONGODB_URI || '',
    EMAIL_NODEMAILER: process.env.EMAIL_NODEMAILER,
    PASSWORD_NODEMAILER: process.env.PASSWORD_NODEMAILER,
    SESSION_SECRET_KEY: process.env.SECRET_KEY_SESSION || 'secret-key',
    CORS_KEY: process.env.CORS_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY ,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    jwt_access_key: process.env.JWT_ACCESS_TOKEN_KEY || '',
    jwt_refresh_key: process.env.JWT_REFRESH_TOKEN_KEY || ''

}

export default config