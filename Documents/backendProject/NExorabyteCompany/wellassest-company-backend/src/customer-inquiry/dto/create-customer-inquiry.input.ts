import { InputType, Field } from '@nestjs/graphql';  // Ensure @InputType and @Field are imported
import { IsString, IsEnum, IsInt, IsOptional, IsEmail } from 'class-validator';  // Validation decorators
import { Category } from '../schema/customer-inquiry.schema';  // Import the Category enum

@InputType()  // This decorator marks the class as an input type for GraphQL
export class CreateCustomerInquiryDto {
  @Field()  // Define GraphQL field
  @IsString()
  name: string;

  @Field()  // Define GraphQL field
  @IsString()
  address: string;

  @Field()  // Define GraphQL field
  @IsEmail()
  email: string;

  @Field()  // Define GraphQL field
  @IsString()
  phone: string;

  @Field(() => Category)  // Define GraphQL field for the Category enum
  @IsEnum(Category)
  category: Category;

  @Field()  // Define GraphQL field
  @IsString()
  location: string;

  @Field()  // Define GraphQL field
  @IsInt()
  size: number;

  @Field()  // Define GraphQL field
  @IsString()
  message: string;

  @Field({ nullable: true })  // Define GraphQL field
  @IsString()
  @IsOptional()
  createdAt?: Date;

  @Field({ nullable: true })  // Define GraphQL field
  @IsString()
  @IsOptional()
  updatedAt?: Date;
}
