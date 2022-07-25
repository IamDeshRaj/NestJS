import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorator/current-user.decorator';
import { User } from '../models/entities/user';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReport } from '../models/request/report/create-report';
import { ReportsService } from './reports.service';
import { CustomSerializer } from '../interceptors/custom-serializer.interceptor';
import { GetReport } from '../models/response/get-report';
import { ApproveReport } from '../models/request/report/approve-report';
import { AdminGuard } from '../guards/admin.guard';

@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    @CustomSerializer(GetReport)
    createReport(@Body() body: CreateReport, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @Get('/:id')
    @CustomSerializer(GetReport)
    getReport(@Param('id') id: string) {
        return this.reportService.findOne(parseInt(id));
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    @CustomSerializer(GetReport)
    approveReport(@Param('id') id: string, @Body() body: ApproveReport, @CurrentUser() user: User) {
        return this.reportService.approveReport(parseInt(id), body.approved);
    }
}
