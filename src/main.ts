import { UserService } from './user/user.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/exceptions/allExceptionsFilter ';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    // add swagger module
    const config = new DocumentBuilder()
        .setTitle('[BK Student APIs]')
        .setDescription('The RESTful APIs from me')
        .setVersion('1.0')
        .addTag('BK')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    const userService = app.select(AppModule).get(UserService);
    app.useGlobalFilters(new AllExceptionsFilter());
    // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalGuards(new JwtAuthGuard(new Reflector(), userService));

    app.enableCors();
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

    await app.listen(3007);
}

bootstrap();
