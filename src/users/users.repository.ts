import { CreateUser } from "@mypleaks/ms-models";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UsersRepository {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){

    }

    async create(createUser: CreateUser): Promise<User> {
        let user = new this.userModel(createUser);
        return await user.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find(); 
    }

    async findOne(id: string) {
        return this.userModel.findOne()
    }
}