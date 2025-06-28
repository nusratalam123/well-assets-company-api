import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateConnectInput } from "./create-connect.input";

@InputType()
export class UpdateConnectInput extends PartialType(CreateConnectInput) {
  @Field(() => ID)
  id: string;
}