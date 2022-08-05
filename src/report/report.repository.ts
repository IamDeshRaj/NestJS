import { CreateReport } from '../schema/create-report';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '../schema/report.schema';

@Injectable()
export class ReportRepository {

    constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>) { }

    async create(createReport: CreateReport): Promise<Report> {
        const report = new this.reportModel(createReport);
        return await report.save();
    }

    async findAll() {
        return await this.reportModel.find().populate('user');
    }
}
