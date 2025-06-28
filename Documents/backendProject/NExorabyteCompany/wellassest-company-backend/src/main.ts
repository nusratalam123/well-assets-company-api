import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Correct way to allow all origins and support credentials
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true); // Accept all origins explicitly
    },
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server running on http://localhost:5000/graphql`);
}
bootstrap();
