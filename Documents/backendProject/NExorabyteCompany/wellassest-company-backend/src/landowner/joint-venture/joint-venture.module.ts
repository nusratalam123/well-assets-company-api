import { Module } from '@nestjs/common';
import { JointVentureService } from './joint-venture.service';
import { JointVentureResolver } from './joint-venture.resolver';
import { JointVenture } from './schema/joint-venture.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([JointVenture])],
  providers: [JointVentureResolver, JointVentureService],
})
export class JointVentureModule {}
