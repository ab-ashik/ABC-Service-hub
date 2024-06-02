import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '../uploads')); //to use file publically ... so that we can access from anywhere or from browser

  app.use(
    session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
    maxAge: 300000
    }
    }),
    );

    app.use(cors());
  
    await app.listen(3000);


}
bootstrap();
