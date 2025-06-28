import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerResolver } from './career.resolver';
import { JobListing } from './schema/job.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './schema/resume.schema';

@Module({
  imports: [TypeOrmModule.forFeature([JobListing, Resume])],
  providers: [CareerResolver, CareerService],
})
export class CareerModule {}
