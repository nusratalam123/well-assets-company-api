import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Category } from '../schema/customer-inquiry.schema';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

@ObjectType() // GraphQL Object Type for CustomerInquiry
export class CustomerInquiryType {
  @Field(() => ID)  // GraphQL field with ID type
  id: number;

   @Field() // Define GraphQL field
    @IsString()
    name: string;
  
    @Field() // Define GraphQL field
    @IsString()
    address: string;
  
    @Field() // Define GraphQL field
    @IsEmail()
    email: string;
  
    @Field() // Define GraphQL field
    @IsString()
    phone: string;
  
    @Field(() => Category) // Define GraphQL field for enum
    @IsEnum(Category)
    category: Category;
  
    @Field() // Define GraphQL field
    @IsString()
    location: string;
  
    @Field() // Define GraphQL field
    @IsInt()
    size: number;
  
    @Field() // Define GraphQL field
    @IsString()
    message: string;
  
    @Field({ nullable: true }) // Define GraphQL field
    @IsString()
    @IsOptional()
    createdAt?: Date;
  
    @Field({ nullable: true }) // Define GraphQL field
    @IsString()
    @IsOptional()
    updatedAt?: Date;
}
