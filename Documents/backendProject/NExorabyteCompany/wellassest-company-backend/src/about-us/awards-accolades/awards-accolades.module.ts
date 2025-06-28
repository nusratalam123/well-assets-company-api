import { Module } from '@nestjs/common';
import { AwardsAccoladesService } from './awards-accolades.service';
import { AwardsAccoladesResolver } from './awards-accolades.resolver';

@Module({
  providers: [AwardsAccoladesResolver, AwardsAccoladesService],
})
export class AwardsAccoladesModule {}
