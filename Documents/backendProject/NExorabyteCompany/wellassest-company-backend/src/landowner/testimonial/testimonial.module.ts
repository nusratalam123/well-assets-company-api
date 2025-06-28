import { Module } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialResolver } from './testimonial.resolver';
import { Testimonial } from './schema/testimonial.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial])],
  providers: [TestimonialResolver, TestimonialService],
})
export class TestimonialModule {}
