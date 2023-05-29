import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BasicAuthMiddleware } from './middleware/basic-auth.middleware';
import { ResponseMiddleware } from './middleware/response.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common/interfaces';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BasicAuthMiddleware, ResponseMiddleware).forRoutes('*');
  }

  // Initialize Swagger setup
  static setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('User API')
      .setDescription('API documentation for User endpoints')
      .setVersion('1.0')
      .addBasicAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);

    // Add authentication description
    const basicAuthOptions = {
      name: 'Basic Authentication',
      type: 'http',
      scheme: 'basic',
      in: 'header',
    };
    SwaggerModule.createDocument(app, options, {
      extraModels: [],
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    });

    SwaggerModule.setup('docs', app, document);
  }
}
