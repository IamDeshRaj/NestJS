import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorator/current-user.decorator';
import { User } from '../models/entities/user';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReport } from '../models/request/create-report';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReport, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }
}
