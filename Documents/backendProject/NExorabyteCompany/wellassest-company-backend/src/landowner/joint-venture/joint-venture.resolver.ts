import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JointVentureService } from './joint-venture.service';
import { JointVentureType } from './types/joint-venture.type';
import { CreateJointVentureInput } from './dto/create-joint-venture.input';

@Resolver()
export class JointVentureResolver {
  constructor(private readonly jointVentureService: JointVentureService) {}
  @Mutation(() => JointVentureType)
  submitJointVenture(@Args('input') input: CreateJointVentureInput) {
    return this.jointVentureService.create(input);
  }

  @Query(() => [JointVentureType])
  getAllJointVentures() {
    return this.jointVentureService.findAll();
  }

  @Query(() => JointVentureType)
  getSingleJointVenture(@Args('id', { type: () => String }) id: string) {
    return this.jointVentureService.findOne(id);
  }

  @Mutation(() => Boolean)
  deleteJointVenture(@Args('id', { type: () => String }) id: string) {
    return this.jointVentureService.delete(id);
  }
}
