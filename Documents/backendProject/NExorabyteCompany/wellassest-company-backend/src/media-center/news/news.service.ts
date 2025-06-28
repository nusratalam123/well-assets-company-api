import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './schema/news.schema';
import { Repository } from 'typeorm';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly repo: Repository<News>,
      ) {}
    
      async create(input: CreateNewsInput): Promise<News> {
    
        const news = this.repo.create({
          ...input,
          description: input.description || [],
          gallery: input.gallery || [],
        });
    
        return this.repo.save(news);
      }
    
      async findAll(): Promise<News[]> {
        return this.repo.find({ order: { date: 'DESC' } });
      }
    
      async findOne(id: string): Promise<News> {
        const news = await this.repo.findOneBy({ id });
        if (!news) throw new Error('News not found');
        return news;
      }
    
      async update(id: string, input: UpdateNewsInput): Promise<News> {
        const existing = await this.repo.findOneBy({ id });
        if (!existing) throw new Error('News not found');
    
        const updated = this.repo.create({
          ...existing,
          ...input,
          description: input.description ?? existing.description,
          gallery: input.gallery ?? existing.gallery,
        });
    
        return this.repo.save(updated);
      }
    
      async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return (result.affected ?? 0) > 0;
      }
}
