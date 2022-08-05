import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReport } from '../schema/create-report';
import { Report } from '../schema/report.schema';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private reportService: ReportService) { }

    @Post()
    async create(@Body() createReport: CreateReport): Promise<Report> {
        return await this.reportService.create(createReport);
    }

    @Get()
    async getAll(): Promise<Report[]> {
        return await this.reportService.findAll();
    }
}
