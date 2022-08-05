import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '../decorator/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { CustomSerializer } from '../interceptors/custom-serializer.interceptor';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';
import { CreateUser } from '@mypleaks/ms-models';
import { User } from '../schema/user.schema';

@Controller('auth')
export class UsersController {

    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmi(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signup')
    async createUser(@Body() createUser: CreateUser, @Session() session: any) {
        const user = await this.authService.signup(createUser);
        session.userId = user.id;
        return user;
    }

    @Get()
    async getAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get('/signout')
    signout(@Session() session: any) {
        session.userId = null;
    }

    /*@Post('/signin')
    @CustomSerializer(GetUser)
    async signin(@Body() createUser: CreateUser, @Session() session: any) {
        const user = await this.authService.signin(createUser);
        session.userId = user.id;
        return user;
    }

    @Get('/:id')
    @CustomSerializer(GetUser)
    findUser(@Param('id') id: string) {
        console.log('Handler is Running');
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateUser: UpdateUser) {
        return this.usersService.update(parseInt(id), updateUser);
    }*/
}
