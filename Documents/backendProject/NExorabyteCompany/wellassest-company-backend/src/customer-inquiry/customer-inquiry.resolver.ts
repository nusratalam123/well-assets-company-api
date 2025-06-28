import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomerEnquiryService } from "./customer-inquiry.service";
import { CustomerInquiry } from "./schema/customer-inquiry.schema";
import { CreateCustomerInquiryDto } from "./dto/create-customer-inquiry.input";
import { CustomerInquiryType } from "./types/customer-inquiry.type";
import { UpdateCustomerInquiryDto } from "./dto/update-customer-inquiry.dto";
import { CustomerInqueryJsonType } from "./types/customerInqueryJson.type";

@Resolver(() => CustomerInquiryType)
export class CustomerEnquiryResolver {
  constructor(
    private readonly customerInquiryService: CustomerEnquiryService
  ) {}

  @Query(() => CustomerInqueryJsonType)
  async getCustomerTitle(): Promise<CustomerInqueryJsonType> {
    return this.customerInquiryService.getCustomerTitle(); // Return properly typed data
  }

  // GraphQL Mutation for creating a new CustomerInquiry using the CreateCustomerInquiryDto
  @Mutation(() => CustomerInquiryType) // Return type should be CustomerInquiry
  async createCustomerInquiry(
    @Args("createCustomerInquiryDto")
    createCustomerInquiryDto: CreateCustomerInquiryDto // Use DTO here
  ): Promise<CustomerInquiry> {
    // Call the service to create and return the CustomerInquiry
    return this.customerInquiryService.createCustomerInquiry(
      createCustomerInquiryDto
    );
  }

  // GraphQL Query for getting all CustomerInquiries
  @Query(() => [CustomerInquiryType]) // Return an array of CustomerInquiries
  async getAllCustomerInquiries(): Promise<CustomerInquiry[]> {
    return this.customerInquiryService.getAllCustomerInquiries();
  }

  // GraphQL Query for getting a single CustomerInquiry by UUID (id)
  @Query(() => CustomerInquiryType)
  async getCustomerInquiryById(
    @Args("id") id: string // Accept the UUID as a string
  ): Promise<CustomerInquiry> {
    return this.customerInquiryService.getCustomerInquiryById(id);
  }

  // GraphQL Mutation for updating a CustomerInquiry by ID
  @Mutation(() => CustomerInquiryType) // Specify the return type as CustomerInquiry
  async updateCustomerInquiry(
    @Args("id") id: string, // Accept the 'id' as an argument
    @Args("updateCustomerInquiryDto")
    updateCustomerInquiryDto: UpdateCustomerInquiryDto // Use DTO for updates
  ): Promise<CustomerInquiry> {
    return this.customerInquiryService.updateCustomerInquiry(
      id,
      updateCustomerInquiryDto
    );
  }

  // GraphQL Mutation for deleting a CustomerInquiry by ID
  @Mutation(() => String) // Change the return type to String to return a message
  async deleteCustomerInquiry(
    @Args("id") id: string // The ID to identify the record to delete
  ): Promise<string> {
    const result = await this.customerInquiryService.deleteCustomerInquiry(id); // Call service method to delete

    if (result) {
      return "Customer inquiry deleted successfully."; // Success message
    } else {
      return "Customer inquiry not found."; // Failure message (if the ID doesn't exist)
    }
  }

  // update banner part 

  @Mutation(() => CustomerInqueryJsonType)
async updateCustomerBanner(
  @Args("heroTitle") heroTitle: string,  // New Hero Title
  @Args("background") background: string  // New Background Image URL
): Promise<CustomerInqueryJsonType> {
  return this.customerInquiryService.updateBannerDetails(heroTitle, background);
}


}
