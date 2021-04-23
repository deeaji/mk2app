import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require("dotenv").config();

const { PORT = 5000 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix("api/v1");
  app.setGlobalPrefix("");
  await app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
}
bootstrap();
