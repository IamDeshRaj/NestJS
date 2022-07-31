import { CreateUser } from '@mypleaks/ms-models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/entities/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }

      // This way hooks will get executed
    createUser(createUser: CreateUser) {
        const user = this.repo.create(createUser);
        return this.repo.save(user);
    }

    findOne(id: number) {
        if(!id){
            return null;
        }
        const user = this.repo.findOne({ where: { id: id } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    find(email: string) {
        return this.repo.find({ where: { email: email } });
    }

      // This way hooks will get executed
    async update(id: number, attr: Partial<User>) {
        const user = await this.findOne(id);
        Object.assign(user, attr);
        return this.repo.save(user);
    }

    async remove(id: number) {  // This way hooks will get executed
        const user = await this.findOne(id);
        return this.repo.remove(user);
    }
}
