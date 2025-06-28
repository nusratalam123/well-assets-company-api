import { Module } from '@nestjs/common';
import { LeaderService } from './leader.service';
import { LeaderResolver } from './leader.resolver';

@Module({
  providers: [LeaderResolver, LeaderService],
})
export class LeaderModule {}
