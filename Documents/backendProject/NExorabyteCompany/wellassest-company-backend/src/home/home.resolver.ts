import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HomeService } from './home.service';
import { HomeExcellenceType, HomeHeroType, HomeSliderType } from './types/home.type';
import { UpdateHomeExcellenceInput, UpdateHomeHeroInput, UpdateSliderInput } from './dto/home.input';
import { CreateHomeExcellenceInput } from './dto/create-home.input';

@Resolver()
export class HomeResolver {
  constructor(private readonly homeService: HomeService) {}
  @Query(() => HomeHeroType)
  getHomeHero() {
    return this.homeService.getHomeHero();
  }

  @Mutation(() => HomeHeroType)
  updateHomeHero(@Args('input') input: UpdateHomeHeroInput) {
    return this.homeService.updateHomeHero(input);
  }

  @Query(() => [HomeSliderType])
  getHomeSlider() {
    return this.homeService.getHomeSlider();
  }
// Add a new slider to HomeSlider
@Mutation(() => HomeSliderType)
async addHomeSlider(@Args('input') input: UpdateSliderInput): Promise<HomeSliderType> {
  return this.homeService.addSlider(input);
}

@Mutation(() => HomeSliderType)
updateHomeSliderById(@Args('input') input: UpdateSliderInput) {
  return this.homeService.updateHomeSliderById(input);
}


 // Delete a slider by ID from HomeSlider
 @Mutation(() => Boolean)
 async deleteHomeSlider(@Args('id') id: number): Promise<boolean> {
   return this.homeService.deleteSlider(id);
 }
 //----------------------------------------------------------------------------------------------------------
 // HomeExcellence Part
// Get all HomeExcellence entries
 @Query(() => [HomeExcellenceType], { nullable: 'items' })
  getHomeExcellence() {
  return this.homeService.getHomeExcellence();
}

// Add a new HomeExcellence entry
@Mutation(() => HomeExcellenceType)
async addHomeExcellence(@Args('input') input: CreateHomeExcellenceInput): Promise<HomeExcellenceType> {
  return this.homeService.addHomeExcellence(input);
}

// Update HomeExcellence entry by ID
@Mutation(() => HomeExcellenceType)
async updateHomeExcellence(@Args('input') input: UpdateHomeExcellenceInput): Promise<HomeExcellenceType> {
  return this.homeService.updateHomeExcellenceById(input);
}

// Delete HomeExcellence entry by ID
@Mutation(() => Boolean)
async deleteHomeExcellence(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
  return this.homeService.deleteHomeExcellence(id);
}


}
