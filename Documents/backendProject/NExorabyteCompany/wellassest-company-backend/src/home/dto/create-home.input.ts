import { InputType, Field } from '@nestjs/graphql';

@InputType()  
export class CreateHomeExcellenceInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  icon: string;
}

@InputType()  
export class CreateSliderInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  image: string;
}
