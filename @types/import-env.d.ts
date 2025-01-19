declare namespace NodeJS {
    interface ProcessEnv {
        // #APP
        NEXT_PUBLIC_API_URL: string;
        NEXT_PUBLIC_WS_URL: string;
        NODE_ENV: string;
        PORT: string;
        WEBSOCKET_PORT: string;

        // #REDIS
        REDIS_HOST: string;
        REDIS_PORT: string;
        REDIS_PASSWORD: string;

        // #RABBITMQ
        RABBITMQ_HOST: string;
        RABBITMQ_PORT: string;
        RABBITMQ_USERNAME: string;
        RABBITMQ_PASSWORD: string;

        // #COOKIE
        COOKIE_PASSWORD_1: string;
        COOKIE_PASSWORD_2: string;

        // #AWS
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_REGION: string;
        AWS_BUCKET_NAME: string;
        NEXT_PUBLIC_AWS_BUCKET_CDN: string;

        // #NextAuth
        NEXTAUTH_URL: string;
        NEXTAUTH_SECRET: string;
    }
}