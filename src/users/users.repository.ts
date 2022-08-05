import { CreateUser } from "@mypleaks/ms-models";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";

@Injectable()
export class UsersRepository {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUser: CreateUser): Promise<User> {
        let user = new this.userModel(createUser);
        return await user.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().populate('reports');
    }
}