import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger UI 등록
  const options = new DocumentBuilder()
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'jwt',
    )
    .addOAuth2()
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'basic',
    // })
    .setTitle('API Docs')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
