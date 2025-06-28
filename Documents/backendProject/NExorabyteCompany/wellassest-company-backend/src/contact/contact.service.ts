import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "./schema/contact.schema";
import { CreateContactInput } from "./dto/create-contact.input";
import * as fs from "fs";
import * as path from "path";
import { ContactJsonType } from "./types/contactJson.type";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>
  ) {}

  // Find all contacts
  async getAllContacts(): Promise<Contact[]> {
    return this.contactRepository.find(); // Returns Contact entities
  }

  // Create a new contact
  async createContact(
    createContactInput: CreateContactInput
  ): Promise<Contact> {
    const contact = this.contactRepository.create(createContactInput);
    return this.contactRepository.save(contact);
  }

  private dataFilePath = path.join(
    __dirname,
    "../../src/assets/contactPageData.json"
  ); // Path to the JSON file

  // Read the JSON data from the file// Read the JSON data from the file and return it as ContactPage type
  getContactPageData(): ContactJsonType {
    const fileContent = fs.readFileSync(this.dataFilePath, 'utf-8');
    const parsedData = JSON.parse(fileContent);

    // Ensure the data conforms to the ContactPage structure
    return {
      titleImage: parsedData.contactPage.titleImage,
      keepInTouch: parsedData.contactPage.keepInTouch,
    };
  }


  // Update the JSON data with new content
  // contact.service.ts
updateContactPageData(newData: ContactJsonType): void {
  try {
    const fileContent = fs.readFileSync(this.dataFilePath, 'utf-8');
    const parsedData = JSON.parse(fileContent);

    // Ensure 'contactPage' exists and update its data
    if (!parsedData.contactPage) {
      throw new Error('contactPage data not found in the JSON file');
    }

    // Update the 'contactPage' fields (including titleImage and keepInTouch)
    parsedData.contactPage.titleImage = newData.titleImage;
    parsedData.contactPage.keepInTouch = newData.keepInTouch;

    // Write the updated data back to the JSON file
    fs.writeFileSync(this.dataFilePath, JSON.stringify(parsedData, null, 2), 'utf-8');
    console.log('Updated contactPage data successfully!');
  } catch (error) {
    console.error('Error updating contactPage data:', error.message);
    throw new Error('Failed to update contactPage data');
  }
}

}
