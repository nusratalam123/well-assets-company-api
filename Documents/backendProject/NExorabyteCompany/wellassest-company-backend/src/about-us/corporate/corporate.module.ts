import { Module } from '@nestjs/common';
import { CorporateService } from './corporate.service';
import { CorporateResolver } from './corporate.resolver';

@Module({
  providers: [CorporateResolver, CorporateService],
})
export class CorporateModule {}
