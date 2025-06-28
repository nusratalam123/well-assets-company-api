import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AwardImageInput } from './dto/award.input';

const FILE_PATH = path.join(__dirname, '../../../src/assets/awardPageData.json');

@Injectable()
export class AwardsAccoladesService {
    private readData() {
        const raw = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(raw);
      }
    
      private writeData(data: any) {
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
      }
    
      getAwardInfo() {
        return this.readData().awardPage.awardInfo;
      }
    
      updateAwardInfo(input: any) {
        const data = this.readData();
        data.awardPage.awardInfo = input;
        this.writeData(data);
        return input;
      }
    
      getAwardImages() {
        return this.readData().awardPage.awardImages;
      }
    
      updateAwardImages(input: any[]) {
        const data = this.readData();
        data.awardPage.awardImages = input;
        this.writeData(data);
        return input;
      }

    // Add a new award image
async addAwardImage(input: AwardImageInput): Promise<any> {
  const data = this.readData();

  // Generate a new ID based on the current highest ID
  const currentMaxId = data.awardPage.awardImages.reduce((maxId, image) => {
    return image.id > maxId ? image.id : maxId;
  }, 0);

  const newImageId = currentMaxId + 1;

  // Create a new image and push it to the awardImages array
  const newImage = {
    ...input,
    id: newImageId,  // Auto-generated ID
  };

  data.awardPage.awardImages.push(newImage);
  this.writeData(data);

  return newImage;
}

// Delete an award image by ID
async deleteAwardImage(id: number): Promise<any> {
  const data = this.readData();
  
  // Find the index of the image to delete
  const index = data.awardPage.awardImages.findIndex((image: any) => image.id === id);
  if (index === -1) {
    throw new Error("Image not found");
  }

  // Remove the image from the array
  const deletedImage = data.awardPage.awardImages.splice(index, 1);
  this.writeData(data);

  return deletedImage;
}

// Update an award image by ID
async updateAwardImage(id: number, input: AwardImageInput): Promise<any> {
  const data = this.readData();

  // Find the index of the image to update
  const index = data.awardPage.awardImages.findIndex((image: any) => image.id === id);
  if (index === -1) {
    throw new Error("Image not found");
  }

  // Update the image with the new input data while keeping the ID intact
  data.awardPage.awardImages[index] = { ...data.awardPage.awardImages[index], ...input };
  this.writeData(data);

  return data.awardPage.awardImages[index];
}

}
