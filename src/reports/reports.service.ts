import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../models/entities/report';
import { User } from '../models/entities/user';
import { CreateReport } from '../models/request/report/create-report';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    create(createReport: CreateReport, user: User) {
        const report = this.repo.create(createReport);
        report.user = user;
        return this.repo.save(report);
    }

    async findOne(id: number) {
        if(!id){
            return null;
        }
        const report = await this.repo.findOne({ where: { id: id } });
        if (!report) {
            throw new Error('Report not found');
        }
        return report;
    }

    async approveReport(id: number, approved: boolean) {
        const report = await this.findOne(id);
        report.approved = approved;
        return this.repo.save(report);
    }
}
