import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DepartmentType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  logo: string;
}

@ObjectType()
export class CareerHeaderType {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  logo: string;
}

@ObjectType()
export class CareerSecondType {
  @Field()
  title: string;

  @Field()
  logo: string;

  @Field()
  para1: string;

  @Field()
  para2: string;
}

@ObjectType()
export class CareerPageType {
  @Field(() => CareerHeaderType)
  careerHeader: CareerHeaderType;

  @Field(() => CareerSecondType)
  careerSecond: CareerSecondType;

  @Field(() => [DepartmentType])
  departments: DepartmentType[];
}
