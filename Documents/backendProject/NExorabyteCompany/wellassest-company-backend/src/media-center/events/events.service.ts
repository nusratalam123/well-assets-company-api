import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './schema/event.schema';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly repo: Repository<Event>,
      ) {}
    
      async create(input: CreateEventInput): Promise<Event> {
        const description = input.description ?? [];
    
        const event = this.repo.create({
          ...input,
          description: Array.isArray(description) ? description : [],
        });
    
        return this.repo.save(event);
      }
    
      async findAll(): Promise<Event[]> {
        return this.repo.find({ order: { date: 'DESC' } });
      }
    
      async findOne(id: string): Promise<Event> {
        const event = await this.repo.findOneBy({ id });
        if (!event) throw new Error('Event not found');
        return event;
      }
    
      async update(id: string, input: UpdateEventInput): Promise<Event> {
        const existing = await this.repo.findOneBy({ id });
        if (!existing) throw new Error('Event not found');
    
        const updated = this.repo.create({
          ...existing,
          ...input,

          description: Array.isArray(input.description)
            ? input.description
            : existing.description,
        });
    
        return this.repo.save(updated);
      }
    
      async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return (result.affected ?? 0) > 0;
      }
}
