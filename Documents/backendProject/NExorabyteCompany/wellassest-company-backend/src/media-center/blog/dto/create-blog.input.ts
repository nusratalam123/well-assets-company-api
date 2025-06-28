import { InputType, Field } from '@nestjs/graphql';

@InputType()
class BlogSectionInput {
  @Field()
  image: string;

  @Field(() => [String], { nullable: true })
  texts?: string[];
}

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field({ nullable: true }) 
  category?: string;

  @Field()
  slug: string;

  @Field()
  date: string;

  @Field()
  thumbnail: string;

  @Field()
  shortDescription: string;

  @Field(() => [BlogSectionInput])
  sections: BlogSectionInput[];
}
