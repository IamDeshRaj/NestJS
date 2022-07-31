import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookiesSession = require('cookie-session');

@Module({
  imports: [UsersModule, ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }), TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        let dbDetails;
        switch (process.env.NODE_ENV) {
          case 'dev':
            dbDetails = {
              type: 'sqlite',
              database: config.get<string>('DB_NAME'),
              entities: ['**/*.entity.js'],
              synchronize: true
            }
            break;
          case 'test':
            dbDetails = {
              type: 'sqlite',
              database: config.get<string>('DB_NAME'),
              entities: ['**/*.entity.ts'],
              synchronize: true
            }
            break;
          case 'prod':
            dbDetails = {
              type: 'mysql',
              host: config.get<string>('DB_HOST'),
              port: config.get<string>('DB_PORT'),
              username: config.get<string>('DB_USER'),
              password: config.get<string>('DB_PWD'),
              database: config.get<string>('DB_NAME'),
              entities: ['**/*.entity.js'],
              synchronize: true,
            }
            break;
          default:
            throw new Error('Invalid Environment');
        }
        return dbDetails
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
