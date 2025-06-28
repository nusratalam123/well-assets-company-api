import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutResolver } from './about.resolver';
import { CorporateModule } from './corporate/corporate.module';
import { LeaderModule } from './leader/leader.module';
import { AwardsAccoladesModule } from './awards-accolades/awards-accolades.module';

@Module({
  providers: [AboutResolver, AboutService],
  imports: [CorporateModule, LeaderModule, AwardsAccoladesModule],
})
export class AboutModule {}
