import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LandownerService } from "./landowner.service";
import { EssenceItemType, LandownerHeaderType } from "./types/landowner.type";
import {
  CreateEssenceItemInput,
  LandownerHeaderInput,
  UpdateEssenceItemInput,
} from "./dto/landowner.input";

@Resolver()
export class LandownerResolver {
  constructor(private readonly landownerService: LandownerService) {}
  // Header
  @Query(() => LandownerHeaderType)
  getLandownerHeader() {
    return this.landownerService.getHeader();
  }

  // update land-owner
  @Mutation(() => LandownerHeaderType)
  updateLandownerHeader(@Args("input") input: LandownerHeaderInput) {
    return this.landownerService.updateHeader(input);
  }

  //--------------- Essence ----------------
  @Query(() => [EssenceItemType])
  getEssenceItems() {
    return this.landownerService.getEssenceItems();
  }

  // create
  @Mutation(() => EssenceItemType)
  createEssenceItem(@Args("input") input: CreateEssenceItemInput) {
    return this.landownerService.createEssenceItem(input);
  }

  // update
  @Mutation(() => EssenceItemType)
  updateEssenceItem(@Args("input") input: UpdateEssenceItemInput) {
    return this.landownerService.updateEssenceItem(input.id, input);
  }

  // delete
  @Mutation(() => Boolean)
  deleteEssenceItem(@Args("id", { type: () => Int }) id: number) {
    return this.landownerService.deleteEssenceItem(id);
  }
}
