import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DepartmentInput {

  @Field()
  title: string;

  @Field()
  logo: string;
}

@InputType()
export class UpdateDepartmentInput {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  logo: string;
}

@InputType()
export class CareerHeaderInput {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  logo: string;
}

@InputType()
export class CareerSecondInput {
  @Field()
  title: string;

  @Field()
  logo: string;

  @Field()
  para1: string;

  @Field()
  para2: string;
}
