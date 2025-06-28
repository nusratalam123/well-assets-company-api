import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AboutHeroInput, CompanyInput, ExcellenceItemInput, LegacySectionInput, MilestoneItemInput, MilestoneSectionInput } from './dto/corporate.input';
import { CompanyType, ExcellenceItemType } from './types/corporate.type';

const FILE_PATH = path.join(__dirname, '../../../src/assets/aboutUsPageData.json');
@Injectable()
export class CorporateService {
    private readData() {
        const data = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(data);
      }
    
      private writeData(data: any) {
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
      }
    
      getAboutPage() {
        return this.readData().aboutPage;
      }
    
      async getLegacySection() {
        const data = await this.getAboutPage();
        return data.legacySection;
      }
    
      updateAboutHero(input: AboutHeroInput) {
        const data = this.readData();
        data.aboutPage.aboutHero = input;
        this.writeData(data);
        return input;
      }
    
      updateLegacySection(input: LegacySectionInput) {
        const data = this.readData();
        data.aboutPage.legacySection = input;
        this.writeData(data);
        return input;
      }
    // corporate.service.ts (excerpt)
    getMilestoneSection() {
    const data = this.readData();
    return data.aboutPage.milestoneSection;
    }
// Add a new milestone item
async addMilestoneItem(input: MilestoneItemInput): Promise<any> {
  const data = this.readData();

  // Generate a new ID based on the current highest ID
  const currentMaxId = data.aboutPage.milestoneSection.items.reduce((maxId, item) => {
    return item.id > maxId ? item.id : maxId;
  }, 0);

  const newItemId = currentMaxId + 1;

  // Create a new item and push it to the items array
  const newItem = {
    ...input,
    id: newItemId,
  };

  data.aboutPage.milestoneSection.items.push(newItem);
  this.writeData(data);

  return newItem;
}

// Update a milestone item by ID
async updateMilestoneItem(id: number, input: MilestoneItemInput): Promise<any> {
  const data = this.readData();
  
  // Find the index of the item to update based on the provided ID
  const itemIndex = data.aboutPage.milestoneSection.items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    throw new Error(`Item with id ${id} not found`);
  }

  // Update only the item with the provided ID
  data.aboutPage.milestoneSection.items[itemIndex] = {
    ...data.aboutPage.milestoneSection.items[itemIndex],
    ...input, // Only update the value and label
  };

  // Write the updated data back to the file
  this.writeData(data);

  return data.aboutPage.milestoneSection.items[itemIndex]; // Return the updated item
}

// Delete a milestone item by ID
async deleteMilestoneItem(id: number): Promise<boolean> {
  const data = this.readData();

  const itemIndex = data.aboutPage.milestoneSection.items.findIndex(
    (item) => item.id === id
  );

  if (itemIndex === -1) {
    return false;
  }

  data.aboutPage.milestoneSection.items.splice(itemIndex, 1);
  this.writeData(data);

  return true;
}
    
// about-us/about.service.ts (inside existing service)

getMissionSection() {
    return this.readData().aboutPage.missionSection;
  }
  
  updateMissionSection(input: any) {
    const data = this.readData();
    data.aboutPage.missionSection = input;
    this.writeData(data);
    return input;
  }
  
  getVisionSection() {
    return this.readData().aboutPage.visionSection;
  }
  
  updateVisionSection(input: any) {
    const data = this.readData();
    data.aboutPage.visionSection = input;
    this.writeData(data);
    return input;
  }
  
  getCsrImages() {
    return this.readData().aboutPage.csrImages;
  }
  
  updateCsrImages(input: any[]) {
    const data = this.readData();
    const existingImages = data.aboutPage.csrImages || [];
  
    // Update or insert based on id
    input.forEach(newItem => {
      const index = existingImages.findIndex((item: any) => item.id === newItem.id);
      if (index !== -1) {
        existingImages[index] = { ...existingImages[index], ...newItem };
      } else {
        existingImages.push(newItem);
      }
    });
  
    data.aboutPage.csrImages = existingImages;
    this.writeData(data);
    return existingImages;
  }
  
  // === SERVICE METHODS ===

  getExcellenceItems(): ExcellenceItemType[] {
    const data = this.readData();
    return data.aboutPage.excellenceItems;
  }
  
  
 // Add a new excellence item with auto-incremented id
 addExcellenceItem(input: ExcellenceItemInput): ExcellenceItemType {
  const data = this.readData();
  const newId = Math.max(...data.aboutPage.excellenceItems.map(item => item.id)) + 1;  // Auto-increment the ID
  const newItem = { ...input, id: newId };
  data.aboutPage.excellenceItems.push(newItem);
  this.writeData(data);
  return newItem;
}

// Update excellence item by id
updateExcellenceItems(id: number, input: ExcellenceItemInput): ExcellenceItemType | null {
  const data = this.readData();
  const itemIndex = data.aboutPage.excellenceItems.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    // If the item with the given id does not exist, return null or handle the error
    throw new Error(`Excellence item with id ${id} not found.`);
  }

  // Update the item with only the fields in the input
  const updatedItem = { ...data.aboutPage.excellenceItems[itemIndex], ...input };
  data.aboutPage.excellenceItems[itemIndex] = updatedItem;

  // Save the updated data
  this.writeData(data);

  return updatedItem;  // Return the updated excellence item
}

// Delete an excellence item by ID
deleteExcellenceItem(id: number): boolean {
  const data = this.readData();
  const index = data.aboutPage.excellenceItems.findIndex(item => item.id === id);

  if (index !== -1) {
    data.aboutPage.excellenceItems.splice(index, 1); // Remove item from array
    this.writeData(data);
    return true;
  }
  return false; // Return false if item not found
}

//company section
// Get all companies
getCompanies(): CompanyType[] {
  const data = this.readData();
  return data.aboutPage.companies;
}
// Add a new company with auto-incremented ID
addCompany(input: CompanyInput): CompanyType {
  const data = this.readData();
  const newId = Math.max(...data.aboutPage.companies.map((company) => company.id)) + 1;  // Auto-increment logic
  const newCompany = { ...input, id: newId };
  data.aboutPage.companies.push(newCompany);
  this.writeData(data);
  return newCompany;
}

// Update an existing company by ID
updateCompany(id: number, input: CompanyInput): CompanyType | null {
  const data = this.readData();
  const idx = data.aboutPage.companies.findIndex((company) => company.id === id);

  if (idx !== -1) {
    data.aboutPage.companies[idx] = { ...data.aboutPage.companies[idx], ...input };
    this.writeData(data);
    return data.aboutPage.companies[idx];
  }

  return null;  // Return null if company doesn't exist
}

// Delete a company by ID
deleteCompany(id: number): boolean {
  const data = this.readData();
  const index = data.aboutPage.companies.findIndex((company) => company.id === id);

  if (index !== -1) {
    data.aboutPage.companies.splice(index, 1);
    this.writeData(data);
    return true;
  }

  return false;  // Return false if company doesn't exist
}

}
