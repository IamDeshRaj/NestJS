import { CreateUser } from '@mypleaks/ms-models';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(private repo: UsersRepository) { }

    createUser(createUser: CreateUser): Promise<User> {
        return this.repo.create(createUser);
    }

    findAll(): Promise<User[]> {
        return this.repo.findAll();
    }
    /*findOne(id: number) {
        if(!id){
            return null;
        }
        const user = this.repo.findOne({ where: { id: id.toString() } });
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
    }*/
}
