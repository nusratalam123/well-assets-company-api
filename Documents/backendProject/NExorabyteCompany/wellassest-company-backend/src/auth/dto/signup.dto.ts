import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../schema/user.schema';

@InputType()
export class SignupDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @Field()
  @IsNotEmpty()
  phoneNumber: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6, { message: 'Confirm Password must be at least 6 characters.' })
  confirmPassword: string;

  @Field()
  role:Role
}
