import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const whitelist = ['https://thirsty-kirch-c8b82a.netlify.app', 'https://thirsty-kirch-c8b82a.netlify.app/', 'http://localhost:3001', 'https://infochat-production.herokuapp.com'];
  // console.log(whitelist, 'whitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelist');
  // app.enableCors({
  //   // origin: ['https://thirsty-kirch-c8b82a.netlify.app', 'http://localhost:3001', 'https://infochat-production.herokuapp.com'],
  //   // methods: ['GET', 'POST'],
  //   origin: function (origin, callback) {
  //     console.log(origin, 'originoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginorigin');
  //     if (!origin || whitelist.indexOf(origin) !== -1) {
  //       console.log("allowed cors for:", origin)
  //       callback(null, true)
  //     } else {
  //       console.log("blocked cors for:", origin)
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   },
  //   // origin: 'https://thirsty-kirch-c8b82a.netlify.app',
  //   methods: 'GET,POST',
  // });
  // console.log('HERE');
  const options = {
    "origin": "https://thirsty-kirch-c8b82a.netlify.app/",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "credentials":true,
    "allowedHeaders": "Content-Type, Accept, Authorization",

  }
  app.use(cors(options))
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
