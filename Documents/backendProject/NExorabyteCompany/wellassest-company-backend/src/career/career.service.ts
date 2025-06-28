import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateJobListingInput } from './dto/update-job-listing.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobListing } from './schema/job.schema';
import { CreateJobListingInput } from './dto/create-job-listing.input';
import { CreateResumeInput } from './dto/create-resume.input';
import { Resume } from './schema/resume.schema';
import { UpdateResumeInput } from './dto/update-resume.input';
import * as fs from 'fs';
import * as path from 'path';

const FILE_PATH = path.join(__dirname, '../../src/assets/careerPageData.json');


@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(JobListing)
        private jobListingRepository: Repository<JobListing>,
        @InjectRepository(Resume)
        private readonly resumeRepository: Repository<Resume>,
      ) {}
    
      // 1. Create Job Listing
      async create(createJobListingInput: CreateJobListingInput): Promise<JobListing> {
        const jobListing = this.jobListingRepository.create(createJobListingInput);
        return this.jobListingRepository.save(jobListing);
      }
    
      // 2. Get All Job Listings
      async findAll(): Promise<JobListing[]> {
        return this.jobListingRepository.find();
      }
    
      // 3. Get Single Job Listing
      async findOne(id: string): Promise<JobListing> {
        const jobListing = await this.jobListingRepository.findOne({ where: { id } });
        if (!jobListing) {
          throw new NotFoundException(`Job listing with id ${id} not found`);
        }
        return jobListing;
      }
    
      async update(
        id: string,
        updateJobListingInput: UpdateJobListingInput,
      ): Promise<JobListing> {
        // Perform the update
        const updateResult = await this.jobListingRepository.update(id, updateJobListingInput);
      
        // If no rows are affected by the update, the job listing is not found
        if (updateResult.affected === 0) {
          throw new NotFoundException(`Job listing with id ${id} not found`);
        }
      
        // Fetch and return the updated job listing
        const updatedJobListing = await this.jobListingRepository.findOne({ where: { id } });
      
        // If no job listing is returned, this is an unexpected situation (could happen in some cases)
        if (!updatedJobListing) {
          throw new NotFoundException(`Job listing with id ${id} not found`);
        }
      
        return updatedJobListing;
      }
    
      // 5. Delete Job Listing
  async remove(id: string): Promise<string> {
    const jobListing = await this.jobListingRepository.findOne({ where: { id } });

    // If the job listing is not found, throw an exception
    if (!jobListing) {
      throw new NotFoundException(`Job listing with id ${id} not found`);
    }

    // Delete the job listing
    await this.jobListingRepository.delete(id);

    // Return a success message
    return 'Job listing deleted successfully';
  }
  //-----------------------------------------------------------------------------------------------------------
  // Create a resume
  async createResume(createResumeInput: CreateResumeInput): Promise<Resume> {
    const resume = this.resumeRepository.create(createResumeInput);
    return await this.resumeRepository.save(resume);
  }

   // Get all resumes
   async getResumes(): Promise<Resume[]> {
    return this.resumeRepository.find();
  }

  // Get a single resume by ID
  async getResumeById(id: string): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({ where: { id } });
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
    return resume;
  }

  // Update a resume
  async updateResume(id: string, updateResumeInput: UpdateResumeInput): Promise<Resume> {
    const resume = await this.getResumeById(id); // Check if the resume exists

    // Update the resume fields with the provided data
    Object.assign(resume, updateResumeInput);

    return this.resumeRepository.save(resume); // Save the updated resume
  }
  // Delete a resume by ID
  async deleteResume(id: string): Promise<string> {
    const resume = await this.getResumeById(id); 

    await this.resumeRepository.remove(resume); 
    return `Resume with ID ${id} has been deleted successfully`;  
  }
  //-----------------------------------------------------------------------------------------------------------
  //update json file data

  private readFile() {
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  }

  private writeFile(data: any) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  }

  getCareerPage() {
    return this.readFile().careerPage;
  }

  getCareerHeader() {
    return this.readFile().careerPage.careerHeader;
  }
  updateCareerHeader(header: any) {
    const data = this.readFile();
    data.careerPage.careerHeader = header;
    this.writeFile(data);
    return header;
  }

  getCareerSecond() {
    return this.readFile().careerPage.careerSecond;
  }

  updateCareerSecond(second: any) {
    const data = this.readFile();
    data.careerPage.careerSecond = second;
    this.writeFile(data);
    return second;
  }

  getDepartments() {
    return this.readFile().careerPage.departments;
  }

  addDepartment(dept: { title: string; logo: string }) {
    const data = this.readFile();
    const departments = data.careerPage.departments;
  
    // Find the max id from existing departments
    const maxId = departments.reduce((max, d) => d.id > max ? d.id : max, 0);
  
    const newDepartment = {
      id: maxId + 1, // Auto-increment
      title: dept.title,
      logo: dept.logo,
    };
  
    departments.push(newDepartment);
    this.writeFile(data);
    return newDepartment;
  }
  
  

  updateDepartment(id: number, updates: any) {
    const data = this.readFile();
    const index = data.careerPage.departments.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Department not found');
    data.careerPage.departments[index] = { ...data.careerPage.departments[index], ...updates };
    this.writeFile(data);
    return data.careerPage.departments[index];
  }

  deleteDepartment(id: number) {
    const data = this.readFile();
    data.careerPage.departments = data.careerPage.departments.filter(d => d.id !== id);
    this.writeFile(data);
    return true;
  }



}
