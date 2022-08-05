import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "./user.schema";

export type ReportDocument = Report & mongoose.Document;

@Schema()
export class Report {

    @Prop()
    id: string;

    @Prop({ required: true })
    make: string;

    @Prop({ required: true })
    year: string;

    @Prop()
    mileage: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User;
}

export const ReportSchema = SchemaFactory.createForClass(Report);