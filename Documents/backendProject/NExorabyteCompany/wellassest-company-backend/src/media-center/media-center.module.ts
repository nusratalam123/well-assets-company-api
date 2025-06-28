import { Module } from '@nestjs/common';
import { MediaCenterService } from './media-center.service';
import { MediaCenterResolver } from './media-center.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog/schema/blog.schema';
import { Event } from './events/schema/event.schema';
import { News } from './news/schema/news.schema';

@Module({
 imports: [
  TypeOrmModule.forFeature([Blog]), 
  TypeOrmModule.forFeature([Event]), 
  TypeOrmModule.forFeature([News]), 
  ],
  providers: [MediaCenterResolver, MediaCenterService],
  
})
export class MediaCenterModule {}
