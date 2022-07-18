import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt, scryptSync } from 'crypto';
import { CreateUser } from 'src/models/request/create-user';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) { }

    async signup(createUser: CreateUser) {
        const [user] = await this.userService.find(createUser.email);
        if (user) {
            throw new BadRequestException('Email already in Use');
        }

        const salt = randomBytes(8).toString('hex');
        const encryptedPassword = this.getEncryptedPassword(createUser.password, salt) + '.' + salt;
        return this.userService.createUser({ email: createUser.email, password: encryptedPassword });
    }

    async signin(createUser: CreateUser) {
        const [user] = await this.userService.find(createUser.email);
        if (!user) {
            throw new BadRequestException('Email doesn\'t exists.');
        }

        const [encryptedPassword, salt] = user.password.split('.')!;
        const passwordHash = this.getEncryptedPassword(createUser.password, salt);

        if (encryptedPassword === passwordHash) {
            return user;
        } else {
            throw new BadRequestException('Invalid password.');
        }
    }

    getEncryptedPassword(password: string, salt: string): string {
        const hash = scryptSync(password, salt, 32);
        return hash.toString('hex');
    }
}
