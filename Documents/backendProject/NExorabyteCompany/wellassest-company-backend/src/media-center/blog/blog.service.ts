import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './schema/blog.schema';
import { Repository } from 'typeorm';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';


@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly repo: Repository<Blog>,
      ) {}
    async create(input: CreateBlogInput): Promise<Blog> {
      const safeSections = input.sections?.map((section) => ({
        image: section.image,
        texts: Array.isArray(section.texts) ? section.texts : [],
      })) ?? [];
  
      const blog = this.repo.create({
        ...input,
        sections: safeSections,
      });
      return this.repo.save(blog);
      }
    
      async findAll(): Promise<Blog[]> {
        return this.repo.find({ order: { date: 'DESC' } });
      }
    
      async findOne(id: string): Promise<Blog> {
        const blog = await this.repo.findOneBy({ id });
        if (!blog) throw new Error('Blog not found');
        return blog;
      }
    
      async update(id: string, input: UpdateBlogInput): Promise<Blog> {
        const existing = await this.repo.findOneBy({ id });
        if (!existing) throw new Error('Blog not found');
    
        const newSlug = input.title
          ? slugify(input.title, { lower: true })
          : existing.slug;
    
        const safeSections = input.sections?.map((section) => ({
          image: section.image,
          texts: Array.isArray(section.texts) ? section.texts : [],
        })) ?? existing.sections;
    
        const updated = this.repo.create({
          ...existing,
          ...input,
          sections: safeSections,
        });
    
        return this.repo.save(updated);
      }
    
      async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return (result.affected ?? 0) > 0;
      }
}
function slugify(title: string, arg1: { lower: boolean; }) {
    throw new Error('Function not implemented.');
}

