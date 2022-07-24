import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../models/entities/report';
import { User } from '../models/entities/user';
import { CreateReport } from '../models/request/create-report';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    create(createReport: CreateReport, user: User) {
        const report = this.repo.create(createReport);
        report.user = user;
        return this.repo.save(report);
    }
}
