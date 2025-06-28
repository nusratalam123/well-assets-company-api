import { Args, Mutation, Resolver , Query} from '@nestjs/graphql';
import { FooterService } from './footer.service';
import { UpdateFooterInput } from './dto/footer.input';
import { FooterDto } from './types/footer.type';

@Resolver()
export class FooterResolver {
  constructor(private readonly footerService: FooterService) {}
  // Query to fetch the footer data
  @Query(() => FooterDto)
  async footer(): Promise<FooterDto> {
    return this.footerService.getFooter();  // Service method that fetches the footer info
  }

  // Mutation to update the footer data
  @Mutation(() => FooterDto)
  async updateFooter(
    @Args('input') input: UpdateFooterInput,
  ): Promise<FooterDto> {
    return this.footerService.updateFooter(input);  // Service method to update the footer info
  }

}
