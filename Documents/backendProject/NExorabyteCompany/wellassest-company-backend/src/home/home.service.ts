import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import {  UpdateHomeExcellenceInput, UpdateHomeHeroInput, UpdateSliderInput } from './dto/home.input';
import { HomeExcellenceType, HomeHeroType, HomeSliderType } from './types/home.type';
import { CreateHomeExcellenceInput } from './dto/create-home.input';

const FILE_PATH = path.join(__dirname, '../../src/assets/homePageData.json');


@Injectable()
export class HomeService {
    private async readJson() {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return JSON.parse(data);
      }
    
      private async writeJson(data: any) {
        await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
      }
    
      async getHomeHero() {
        const json = await this.readJson();
        return json.homePage.homeHero;
      }
    
      async updateHomeHero(input: UpdateHomeHeroInput) {
        const json = await this.readJson();
        json.homePage.homeHero = input;
        await this.writeJson(json);
        return json.homePage.homeHero;
      }

     // Add a new slider to the JSON file
  async addSlider(input: UpdateSliderInput): Promise<HomeSliderType> {
    const data = await this.readJson();

    const nextId = data.homePage.HomeSlider.length > 0
      ? Math.max(...data.homePage.HomeSlider.map((slider: any) => slider.id)) + 1
      : 1;

    const newSlider = {
      id: nextId,  
      ...input,   
    };

    data.homePage.HomeSlider.push(newSlider);

    await this.writeJson(data);

    return newSlider;
  }
    
      async getHomeSlider() {
        const json = await this.readJson();
        return json.homePage.HomeSlider;
      }
    
     // src/home/home.service.ts
async updateHomeSliderById(input: UpdateSliderInput): Promise<HomeHeroType> {
    const data = await this.readJson();
    const index = data.homePage.HomeSlider.findIndex((s: any) => s.id === input.id);
  
    if (index === -1) throw new Error(`Slider with ID ${input.id} not found`);
  
    data.homePage.HomeSlider[index] = {
      ...data.homePage.HomeSlider[index],
      ...input,
    };
  
    await this.writeJson(data);
    return data.homePage.HomeSlider[index];
  }
  
   // Delete a slider by ID from the JSON file
  async deleteSlider(id: number): Promise<boolean> {
    const data = await this.readJson();
    const index = data.homePage.HomeSlider.findIndex((slider: any) => slider.id === id);

    if (index === -1) return false;

    data.homePage.HomeSlider.splice(index, 1);

    await this.writeJson(data);
    return true;
  }
//-------------------------------------------------------------------------------------------------------
// HomeExcellence

// Get all HomeExcellence entries
  async getHomeExcellence() {
    const json = await this.readJson(); 
    return json.homePage.homeExcellence;  
  }
   // Add a new HomeExcellence entry
   async addHomeExcellence(input: CreateHomeExcellenceInput): Promise<HomeExcellenceType> {
    const data = await this.readJson();
    const nextId = data.homePage.homeExcellence.length > 0
      ? Math.max(...data.homePage.homeExcellence.map((item: any) => item.id)) + 1
      : 1;

    const newEntry = {
      id: nextId,
      ...input,
    };
    data.homePage.homeExcellence.push(newEntry);
    await this.writeJson(data);
    return newEntry;
  }

  // Update an existing HomeExcellence entry by ID
  async updateHomeExcellenceById(input: UpdateHomeExcellenceInput): Promise<HomeExcellenceType> {
    const data = await this.readJson();
    const index = data.homePage.homeExcellence.findIndex((item: any) => item.id === input.id);
    if (index === -1) throw new Error(`HomeExcellence entry with ID ${input.id} not found`);
    data.homePage.homeExcellence[index] = {
      ...data.homePage.homeExcellence[index],
      ...input,
    };
    await this.writeJson(data);
    return data.homePage.homeExcellence[index];
  }

  // Delete a HomeExcellence entry by ID
  async deleteHomeExcellence(id: number): Promise<boolean> {
    const data = await this.readJson();
    const index = data.homePage.homeExcellence.findIndex((item: any) => item.id === id);
    if (index === -1) return false;
    data.homePage.homeExcellence.splice(index, 1);
    await this.writeJson(data);
    return true;
  }
}
