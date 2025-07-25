import { Module } from '@nestjs/common';
import { FooterService } from './footer.service';
import { FooterResolver } from './footer.resolver';

@Module({
  providers: [FooterResolver, FooterService],
})
export class FooterModule {}
