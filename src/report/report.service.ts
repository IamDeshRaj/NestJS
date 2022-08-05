import { CreateReport } from '../schema/create-report';
import { Injectable } from '@nestjs/common';
import { Report } from '../schema/report.schema';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
    constructor(private reportRepository: ReportRepository) { }

    async create(createReport: CreateReport): Promise<Report> {
        return await this.reportRepository.create(createReport);
    }

    async findAll(): Promise<Report[]> {
        return await this.reportRepository.findAll();
    }
}
