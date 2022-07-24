import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorator/current-user.decorator';
import { User } from '../models/entities/user';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReport } from '../models/request/create-report';
import { ReportsService } from './reports.service';
import { CustomSerializer } from '../interceptors/custom-serializer.interceptor';
import { GetReport } from '../models/response/get-report';

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
}
