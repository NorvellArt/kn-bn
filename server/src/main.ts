import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.APP_PORT || 3001;
    app.enableCors({
        allowedHeaders: ['content-type'],
        origin: 'http://localhost:5173',
        credentials: true,
    });
    app.use(cookieParser());
    await app.listen(port);
}
bootstrap();
