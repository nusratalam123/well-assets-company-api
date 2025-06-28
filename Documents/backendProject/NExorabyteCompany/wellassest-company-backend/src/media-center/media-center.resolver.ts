import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { MediaCenterService } from "./media-center.service";
import { MediaHeaderType, MediaInfoType } from "./types/media-header.type";
import { UpdateMediaHeaderInput } from "./dto/update-media-header.input";
import { MediaUnifiedType } from "./types/media-unified.type";
import { MediaCenterDynamicType } from "./types/mediaCenter-dynamic.type";
import { UpdateMediaInfoInput } from "./dto/updateMedia.input";
import { CreateMediaInfoInput } from "./dto/create-media.input";

@Resolver()
export class MediaCenterResolver {
  constructor(private readonly mediaCenterService: MediaCenterService) {}

  @Query(() => MediaUnifiedType)
  getAllMedia() {
    return this.mediaCenterService.getAllMedia();
  }

  @Query(() => MediaHeaderType)
  getMediaHeader() {
    return this.mediaCenterService.getData();
  }

  // update media center hero part
  @Mutation(() => MediaHeaderType)
  updateMediaHeader(@Args("input") input: UpdateMediaHeaderInput) {
    return this.mediaCenterService.updateData(input);
  }
  @Query(() => [MediaInfoType])
  async getAllMediaCenterData() {
    return this.mediaCenterService.getAllMediaCenterData();
  }

  // for dynamic page
  @Query(() => [MediaCenterDynamicType]) // Update the return type to the correct one
  async getAllMediaCenterDynamicJson() {
    return this.mediaCenterService.getAllMediaCenterDynamicJson(); // Query that fetches the media data
  }

  // delete media center
  @Mutation(() => Boolean)
  async deleteMediaCenter(@Args("id") id: number) {
    try {
      const result = await this.mediaCenterService.deleteMediaCenter(id);
      return result.success;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // update media center allMediaInfo
  @Mutation(() => MediaInfoType)
  async updateMediaInfo(
    @Args("id", { type: () => Int }) id: number,
    @Args("input") input: UpdateMediaInfoInput
  ) {
    try {
      return await this.mediaCenterService.updateMediaInfo(id, input);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Create Media entry
  @Mutation(() => MediaInfoType)
  async createMediaInfo(@Args("input") input: CreateMediaInfoInput) {
    try {
      return await this.mediaCenterService.createMediaInfo(input);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
