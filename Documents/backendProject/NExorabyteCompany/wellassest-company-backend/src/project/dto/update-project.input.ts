import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  image?: string;
}
