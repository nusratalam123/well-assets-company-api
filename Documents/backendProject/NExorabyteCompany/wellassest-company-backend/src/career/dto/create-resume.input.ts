import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateResumeInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  phone: string;

  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  position: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  coverLetter?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  resumeFile?: string;
}
