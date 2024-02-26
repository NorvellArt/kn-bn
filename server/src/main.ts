import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.APP_PORT || 3001;
    app.enableCors({
        allowedHeaders: ['Content-Type', 'Authorization'],
        origin: 'http://localhost:5173',
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);
}
bootstrap();
