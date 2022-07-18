import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entities/user';
import { Report } from './models/entities/report';
import { APP_PIPE } from '@nestjs/core';
const cookiesSession = require('cookie-session');

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true
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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookiesSession({
      keys: ['asdjfnke']
    })).forRoutes('*');
  }
}
