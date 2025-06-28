  import { InputType, Field } from '@nestjs/graphql';

  @InputType()
  export class CreateTestimonialInput {
    @Field()
    title: string;

    @Field()
    quote: string;

    @Field()
    authorName: string;

    @Field()
    authorPosition: string;

    @Field()
    videoUrl: string;

    @Field()
    thumbnailUrl: string;
  }
