import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { EventType } from './types/event.type';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver()
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}
  @Mutation(() => EventType)
  createEvent(@Args('input') input: CreateEventInput) {
    return this.eventsService.create(input);
  }

  @Query(() => [EventType])
  getAllEvents() {
    return this.eventsService.findAll();
  }

  @Query(() => EventType)
  getEvent(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.findOne(id);
  }

  @Mutation(() => EventType)
  updateEvent(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateEventInput,
  ) {
    return this.eventsService.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteEvent(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.delete(id);
  }
}
