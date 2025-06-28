import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TestimonialService } from "./testimonial.service";
import { TestimonialType } from "./types/testimonial.type";
import { CreateTestimonialInput } from "./dto/create-testimonial.input";
import { UpdateTestimonialInput } from "./dto/update-testimonial.input";

@Resolver()
export class TestimonialResolver {
  constructor(private readonly testimonialService: TestimonialService) {}
  @Query(() => [TestimonialType])
  getAllTestimonials() {
    return this.testimonialService.findAll();
  }

  @Query(() => TestimonialType)
  getTestimonial(@Args("id", { type: () => String }) id: string) {
    return this.testimonialService.findOne(id);
  }

  // create testimonial
  @Mutation(() => TestimonialType)
  createTestimonial(@Args("input") input: CreateTestimonialInput) {
    return this.testimonialService.create(input);
  }

  // DELETE
  @Mutation(() => Boolean)
  deleteTestimonial(@Args("id", { type: () => String }) id: string) {
    return this.testimonialService.delete(id);
  }
 
  // Update testimonial
  @Mutation(() => TestimonialType)
  async updateTestimonial(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateTestimonialInput
  ) {
    return this.testimonialService.update(id, input);
  }
}
