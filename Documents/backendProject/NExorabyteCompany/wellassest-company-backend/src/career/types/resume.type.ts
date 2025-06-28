import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@ObjectType()
export class ResumeType {
  @Field(() => ID)
  id: string;
  
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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  updatedAt?: Date;
}
