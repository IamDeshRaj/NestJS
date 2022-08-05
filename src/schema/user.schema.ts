import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Report } from "./report.schema";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    id: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    //@Prop({ type: [ReportSchema], ref: 'Report' })
    //reports: Report[];

    @Prop({ type: [Types.ObjectId], ref: 'Report' })
    reports: Types.ObjectId[];

    //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }] })
    //reports: Report[];

    //@Prop([{ type: Types.ObjectId, ref: 'Report' }])
    //reports: Report[];
    
    //@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }])
    //reports: Report;

    //@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }])
    //reports!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);