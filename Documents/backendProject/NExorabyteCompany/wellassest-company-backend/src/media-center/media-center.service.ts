import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { UpdateMediaHeaderInput } from "./dto/update-media-header.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "./blog/schema/blog.schema";
import { Repository } from "typeorm";
import { News } from "./news/schema/news.schema";
import { Event } from "./events/schema/event.schema";
import { UpdateMediaInfoInput } from "./dto/updateMedia.input";
import { CreateMediaInfoInput } from "./dto/create-media.input";

const FILE_PATH = path.join(
  __dirname,
  "../../src/assets/mediaCenterPageData.json"
);
const FILE_PATH_DYNAMIC = path.join(
  __dirname,
  "../../src/assets/mediaCenterDynamic.json"
);

@Injectable()
export class MediaCenterService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>
  ) {}

  async getAllMedia() {
    const blogs = await this.blogRepo.find({ order: { date: "DESC" } });
    const events = await this.eventRepo.find({ order: { date: "DESC" } });
    const news = await this.newsRepo.find({ order: { date: "DESC" } });

    return { blogs, events, news };
  }
  getData() {
    const file = fs.readFileSync(FILE_PATH, "utf-8");
    const data = JSON.parse(file);
    return data.mediaCenterPage.mediaHeader;
  }

  // update media center hero part
  updateData(input: UpdateMediaHeaderInput) {
    const file = fs.readFileSync(FILE_PATH, "utf-8");
    const data = JSON.parse(file);

    // update the nested mediaHeader
    data.mediaCenterPage.mediaHeader = { ...input };

    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

    return data.mediaCenterPage.mediaHeader;
  }

  getAllMediaCenterData() {
    const file = fs.readFileSync(FILE_PATH, "utf-8");
    const data = JSON.parse(file);

    // Return all media info
    return data.mediaCenterPage.allMediaInfo;
  }

  // for dynamic page
  getAllMediaCenterDynamicJson() {
    const file = fs.readFileSync(FILE_PATH_DYNAMIC, "utf-8"); // Read the JSON file
    const data = JSON.parse(file);

    // Assuming the JSON structure and returning the correct array
    return data.mediaCenterDynamicData; // Return the array of media center dynamic data
  }

  // delete media center
  deleteMediaCenter(id: number) {
    try {
      const file = fs.readFileSync(FILE_PATH, "utf-8");
      const data = JSON.parse(file);

      const updatedMediaInfo = data.mediaCenterPage.allMediaInfo.filter(
        (media) => media.id !== id
      );

      data.mediaCenterPage.allMediaInfo = updatedMediaInfo;

      fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

      return { success: true, message: "Media entry deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting media entry: " + error.message);
    }
  }

  // Update media info in allMediaInfo array
  updateMediaInfo(id: number, input: UpdateMediaInfoInput) {
    try {
      const file = fs.readFileSync(FILE_PATH, "utf-8");
      const data = JSON.parse(file);

      // Find the media info entry by id
      const mediaIndex = data.mediaCenterPage.allMediaInfo.findIndex(
        (media) => media.id === id
      );

      if (mediaIndex === -1) {
        throw new Error("Media entry not found");
      }

      // Update the media info entry
      data.mediaCenterPage.allMediaInfo[mediaIndex] = {
        ...data.mediaCenterPage.allMediaInfo[mediaIndex],
        ...input, // Update the existing media data with the new input values
      };

      // Write the updated data back to the file
      fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

      return data.mediaCenterPage.allMediaInfo[mediaIndex];
    } catch (error) {
      console.error("Error updating media entry:", error);
      throw new Error("Error updating media entry: " + error.message);
    }
  }

  // Create a new media entry in allMediaInfo
  createMediaInfo(input: CreateMediaInfoInput) {
    try {
      const file = fs.readFileSync(FILE_PATH, "utf-8");
      const data = JSON.parse(file);

      // Generate a new ID (you can also use UUID or any other method)
      const newId = data.mediaCenterPage.allMediaInfo.length
        ? Math.max(
            ...data.mediaCenterPage.allMediaInfo.map((media) => media.id)
          ) + 1
        : 1;

      // Create the new media object with the provided input
      const newMedia = { id: newId, ...input };

      // Add the new media object to the array
      data.mediaCenterPage.allMediaInfo.push(newMedia);

      // Write the updated data back to the file
      fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

      return newMedia; // Return the newly created media entry
    } catch (error) {
      console.error("Error creating media entry:", error);
      throw new Error("Error creating media entry: " + error.message);
    }
  }
}
