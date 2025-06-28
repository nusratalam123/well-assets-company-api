import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerInquiry } from "./schema/customer-inquiry.schema";
import { Repository } from "typeorm";
import { CreateCustomerInquiryDto } from "./dto/create-customer-inquiry.input";
import { UpdateCustomerInquiryDto } from "./dto/update-customer-inquiry.dto";
import * as fs from "fs";
import * as path from "path";
import { CustomerInqueryJsonType } from "./types/customerInqueryJson.type";
@Injectable()
export class CustomerEnquiryService {
  constructor(
    @InjectRepository(CustomerInquiry)
    private customerInquiryRepository: Repository<CustomerInquiry> // Inject the repository for database interaction
  ) {}

  // ====================
  private dataFilePath = path.join(
    __dirname,
    "../../src/assets/customer-enquery.json"
  );

  getCustomerTitle(): CustomerInqueryJsonType {
    const fileContent = fs.readFileSync(this.dataFilePath, "utf-8");
    const parsedData = JSON.parse(fileContent);

    return {
      heroTitle: parsedData.customer.heroTitle,
      background: parsedData.customer.background,
    };
  }
  // ==================

  // Service method to create a new CustomerInquiry using the CreateCustomerInquiryDto
  async createCustomerInquiry(
    createCustomerInquiryDto: CreateCustomerInquiryDto
  ): Promise<CustomerInquiry> {
    const customerInquiry = this.customerInquiryRepository.create(
      createCustomerInquiryDto
    );

    return this.customerInquiryRepository.save(customerInquiry);
  }

  //get all customer inquiries
  async getAllCustomerInquiries(): Promise<CustomerInquiry[]> {
    return this.customerInquiryRepository.find();
  }

  // Service method to get a single customer inquiry by UUID (id)
  async getCustomerInquiryById(id: string): Promise<CustomerInquiry> {
    const customerInquiry = await this.customerInquiryRepository.findOne({
      where: { id },
    });

    if (!customerInquiry) {
      throw new NotFoundException(`CustomerInquiry with ID ${id} not found`);
    }

    return customerInquiry;
  }
  // Service method to update an existing CustomerInquiry
  async updateCustomerInquiry(
    id: string,
    updateCustomerInquiryDto: UpdateCustomerInquiryDto // Use Update DTO
  ): Promise<CustomerInquiry> {
    const customerInquiry = await this.customerInquiryRepository.findOne({
      where: { id },
    });

    if (!customerInquiry) {
      throw new NotFoundException(`CustomerInquiry with ID ${id} not found`);
    }

    // Update only the fields that are provided
    if (updateCustomerInquiryDto.name)
      customerInquiry.name = updateCustomerInquiryDto.name;
    if (updateCustomerInquiryDto.address)
      customerInquiry.address = updateCustomerInquiryDto.address;
    if (updateCustomerInquiryDto.email)
      customerInquiry.email = updateCustomerInquiryDto.email;
    if (updateCustomerInquiryDto.phone)
      customerInquiry.phone = updateCustomerInquiryDto.phone;
    if (updateCustomerInquiryDto.category)
      customerInquiry.category = updateCustomerInquiryDto.category;
    if (updateCustomerInquiryDto.location)
      customerInquiry.location = updateCustomerInquiryDto.location;
    if (updateCustomerInquiryDto.size)
      customerInquiry.size = updateCustomerInquiryDto.size;
    if (updateCustomerInquiryDto.message)
      customerInquiry.message = updateCustomerInquiryDto.message;

    // Save the updated inquiry and return it
    return this.customerInquiryRepository.save(customerInquiry);
  }

  // Service method to delete a CustomerInquiry by ID
  async deleteCustomerInquiry(id: string): Promise<boolean> {
    const result = await this.customerInquiryRepository.delete(id); // Delete by ID
    return (result?.affected ?? 0) > 0;
  }


  // update banner part 
  async updateBannerDetails(heroTitle: string, background: string): Promise<CustomerInqueryJsonType> {
  const fileContent = fs.readFileSync(this.dataFilePath, "utf-8");
  const parsedData = JSON.parse(fileContent);

  // Update the values in the JSON file
  parsedData.customer.heroTitle = heroTitle;
  parsedData.customer.background = background;

  // Write the updated data back to the file
  fs.writeFileSync(this.dataFilePath, JSON.stringify(parsedData, null, 2), "utf-8");

  // Return the updated banner data
  return {
    heroTitle: parsedData.customer.heroTitle,
    background: parsedData.customer.background,
  };
}

}
