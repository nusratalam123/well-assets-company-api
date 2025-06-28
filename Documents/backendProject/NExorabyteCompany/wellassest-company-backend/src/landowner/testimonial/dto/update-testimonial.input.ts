import { InputType, Field } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class UpdateTestimonialInput {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  quote?: string;

  @Field({ nullable: true })
  @IsOptional()
  authorName?: string;

  @Field({ nullable: true })
  @IsOptional()
  authorPosition?: string;

  @Field({ nullable: true })
  @IsOptional()
  videoUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  thumbnailUrl?: string;
}
