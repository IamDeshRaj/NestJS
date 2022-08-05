import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from '../schema/report.schema';
import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Report.name, schema: ReportSchema}])],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository]
})
export class ReportModule {}
