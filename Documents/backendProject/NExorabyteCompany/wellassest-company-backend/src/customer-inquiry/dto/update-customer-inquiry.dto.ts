import { InputType, Field } from '@nestjs/graphql'; // For GraphQL input type
import { IsString, IsEnum, IsInt, IsOptional, IsEmail } from 'class-validator'; // Validation decorators
import { Category } from '../schema/customer-inquiry.schema';

@InputType()  // Defines this as an input type for GraphQL mutations
export class UpdateCustomerInquiryDto {
  @Field({ nullable: true }) // This makes the field optional in the GraphQL schema
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true }) // This makes the field optional in the GraphQL schema
  @IsOptional()
  @IsString()
  address?: string;

  @Field({ nullable: true }) // This makes the field optional in the GraphQL schema
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true }) // This makes the field optional in the GraphQL schema
  @IsOptional()
  @IsString()
  phone?: string;

  @Field(() => Category, { nullable: true }) // This makes the field optional in the GraphQL schema
  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @Field({ nullable: true }) // This makes the field optional in the GraphQL schema
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true }) // This makes the field optional in the GraphQL schema
  @IsOptional()
  @IsInt()
  size?: number;

  @Field({ nullable: true }) // This makes the field optional in the GraphQL schema
  @IsOptional()
  @IsString()
  message?: string;
}
