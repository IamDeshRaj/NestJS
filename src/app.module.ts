import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportModule } from './report/report.module';
const cookiesSession = require('cookie-session');

@Module({
  imports: [UsersModule, ReportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }), MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return { uri: config.get<string>('DB_URI') };
      }
    })],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }],
})
export class AppModule {
  constructor(private config: ConfigService) { }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookiesSession({
      keys: [this.config.get<string>('COOKIE_KEY')]
    })).forRoutes('*');
  }
}
