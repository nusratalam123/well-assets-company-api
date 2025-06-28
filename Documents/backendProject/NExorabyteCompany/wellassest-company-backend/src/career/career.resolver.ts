import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CareerService } from './career.service';
import { JobListingType } from './types/job.type';
import { UpdateJobListingInput } from './dto/update-job-listing.input';
import { CreateJobListingInput } from './dto/create-job-listing.input';
import { ResumeType } from './types/resume.type';
import { CreateResumeInput } from './dto/create-resume.input';
import { UpdateResumeInput } from './dto/update-resume.input';
import { CareerHeaderType, CareerPageType, CareerSecondType, DepartmentType } from './types/careerPageDataType';
import { CareerHeaderInput, CareerSecondInput, DepartmentInput, UpdateDepartmentInput } from './dto/career-page-data-input';

@Resolver()
export class CareerResolver {
  constructor(private readonly careerService: CareerService) {}
   // 1. Create Job Listing
   @Mutation(() => JobListingType)
   async createJobListing(
     @Args('createJobListingInput') createJobListingInput: CreateJobListingInput,
   ): Promise<JobListingType> {
     return this.careerService.create(createJobListingInput);
   }
 
   // 2. Get All Job Listings
   @Query(() => [JobListingType])
   async getAllJobListing(): Promise<JobListingType[]> {
     return this.careerService.findAll();
   }
 
   // 3. Get Single Job Listing
   @Query(() => JobListingType)
   async getSingleJobListing(@Args('id') id: string): Promise<JobListingType> {
     return this.careerService.findOne(id);
   }
 
   // 4. Update Job Listing
   @Mutation(() => JobListingType)
   async updateJobListing(
     @Args('id') id: string,
     @Args('updateJobListingInput') updateJobListingInput: UpdateJobListingInput,
   ): Promise<JobListingType> {
     return this.careerService.update(id, updateJobListingInput);
   }
 
  // 5. Delete Job Listing
  @Mutation(() => String) 
  async deleteJobListing(@Args('id') id: string): Promise<string> {
    return this.careerService.remove(id);
  }
  //----------------------------------------------------------------------------------------------------------------
  // 6. Submit Resume
  @Mutation(() => ResumeType)
  async submitResume(
    @Args('createResumeInput') createResumeInput: CreateResumeInput,
  ): Promise<ResumeType> {
    return this.careerService.createResume(createResumeInput);
  }
   // Query to fetch all resumes (optional)
   @Query(() => [ResumeType])
   async getResumes(): Promise<ResumeType[]> {
     return this.careerService.getResumes();
   }
   // Query to get a single resume by ID
  @Query(() => ResumeType)
  async getSingleResume(@Args('id') id: string): Promise<ResumeType> {
    return this.careerService.getResumeById(id);
  }

  // Mutation to update a resume
  @Mutation(() => ResumeType)
  async updateResume(
    @Args('id') id: string,
    @Args('updateResumeInput') updateResumeInput: UpdateResumeInput,
  ): Promise<ResumeType> {
    return this.careerService.updateResume(id, updateResumeInput);
  }

    // Mutation to delete a resume
    @Mutation(() => String)  // Returning just a string message
    async deleteResume(@Args('id') id: string): Promise<string> {
      return this.careerService.deleteResume(id);  
    }
//------------------------------------------------------------------------------------------------------------------------------------------------
// Career Page data  update
    @Query(() => CareerPageType)
    getCareerPage() {
      return this.careerService.getCareerPage();
    }
    //----------------------------------------------------------------------------------------------------------------
    //department section
    // Query to get all departments
    @Query(() => [DepartmentType])
    getDepartments() {
      return this.careerService.getDepartments();
    }
    // Mutation to create a new department
    @Mutation(() => DepartmentType)
    createDepartment(@Args('input') input: DepartmentInput) {
      return this.careerService.addDepartment(input);
    }
    // Mutation to update a department
    @Mutation(() => DepartmentType)
    updateDepartment(@Args('input') input: UpdateDepartmentInput) {
      return this.careerService.updateDepartment(input.id, input);
    }
    // Mutation to delete a department
    @Mutation(() => Boolean)
    deleteDepartment(@Args('id', { type: () => Int }) id: number) {
      return this.careerService.deleteDepartment(id);
    }
  //----------------------------------------------------------------------------------------------------------------
  //Career Header
  // Mutation to update Career Header
    @Mutation(() => CareerHeaderType)
    updateCareerHeader(@Args('input') input: CareerHeaderInput) {
      return this.careerService.updateCareerHeader(input);
    }

    @Query(() => CareerHeaderType)
    getCareerHeader() {
    return this.careerService.getCareerHeader();
    }

    @Query(() => CareerSecondType)
    getCareerSecond() {
    return this.careerService.getCareerSecond();
    }
  
    @Mutation(() => CareerSecondType)
    updateCareerSecond(@Args('input') input: CareerSecondInput) {
      return this.careerService.updateCareerSecond(input);
    }
   
}
