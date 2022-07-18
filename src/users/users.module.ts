import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/entities/user';
import { AuthService } from './auth/auth.service';
import { CurrentUserInterceptor } from './current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, CurrentUserInterceptor, {
    provide: APP_INTERCEPTOR,
    useClass : CurrentUserInterceptor
  }],
  controllers: [UsersController]
})
export class UsersModule {}
