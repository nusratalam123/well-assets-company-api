import { Module } from '@nestjs/common';
import { LandownerService } from './landowner.service';
import { LandownerResolver } from './landowner.resolver';
import { JointVentureModule } from './joint-venture/joint-venture.module';
import { TestimonialModule } from './testimonial/testimonial.module';

@Module({
  providers: [LandownerResolver, LandownerService],
  imports: [JointVentureModule, TestimonialModule],
})
export class LandownerModule {}
