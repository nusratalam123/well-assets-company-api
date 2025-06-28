import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './schema/news.schema';

@Module({
   imports: [
          TypeOrmModule.forFeature([News]), 
        ],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
