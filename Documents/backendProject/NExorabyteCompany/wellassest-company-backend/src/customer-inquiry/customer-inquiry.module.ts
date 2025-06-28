import { Module } from '@nestjs/common';
import { CustomerEnquiryService } from './customer-inquiry.service';
import { CustomerEnquiryResolver } from './customer-inquiry.resolver';
import { CustomerInquiry } from './schema/customer-inquiry.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
 imports: [
      TypeOrmModule.forFeature([CustomerInquiry]), 
    ],
  providers: [CustomerEnquiryResolver, CustomerEnquiryService],
})
export class CustomerEnquiryModule {}
