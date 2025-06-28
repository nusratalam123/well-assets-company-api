import { Resolver } from '@nestjs/graphql';
import { AboutService } from './about.service';

@Resolver()
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}
}
