import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './schema/event.schema';

@Module({
   imports: [
        TypeOrmModule.forFeature([Event]), 
      ],
  providers: [EventsResolver, EventsService],
})
export class EventsModule {}
