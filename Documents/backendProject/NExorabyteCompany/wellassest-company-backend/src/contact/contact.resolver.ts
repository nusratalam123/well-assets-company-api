import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ContactService } from "./contact.service";
import { CreateContactInput } from "./dto/create-contact.input";
import { ContactType } from "./types/contact.type";
import { UpdateKeepInTouchInput } from "./dto/update-keep-in-touch.input";
import { UpdateTitleImageInput } from "./dto/update-title-image.input";
import { ContactJsonType } from "./types/contactJson.type";

@Resolver()
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  // Query to get all contacts
  @Query(() => [ContactType])
  async getAllContacts(): Promise<ContactType[]> {
    return this.contactService.getAllContacts();
  }

  // Mutation to create a new contact
  @Mutation(() => ContactType)
  async createContact(
    @Args("createContactInput") createContactInput: CreateContactInput // Correctly passing the input variable here
  ): Promise<ContactType> {
    return this.contactService.createContact(createContactInput);
  }

   // Query to fetch current contact page data (title image and Keep in Touch section)
   @Query(() => ContactJsonType)
   async getContactPageData(): Promise<ContactJsonType> {
     return this.contactService.getContactPageData(); // Return properly typed data
   }

   @Mutation(() => ContactJsonType)  // Return the updated ContactPage object
   async updateTitleImage(
     @Args('newTitleImage') newTitleImage: UpdateTitleImageInput
   ): Promise<ContactJsonType> {
     try {
       const currentData = this.contactService.getContactPageData();
       currentData.titleImage = newTitleImage;  // Update title image part
       this.contactService.updateContactPageData(currentData);  // Save updated data to JSON
       return currentData;  // Return the updated ContactPage object
     } catch (error) {
       console.error('Error in mutation updateTitleImage:', error.message);
       throw new Error('Failed to update title image');
     }
   }

   @Mutation(() => ContactJsonType)  // Return the updated ContactPage object
   async updateKeepInTouch(
     @Args('newKeepInTouch') newKeepInTouch: UpdateKeepInTouchInput
   ): Promise<ContactJsonType> {
     try {
       // Fetch current contact page data
       const currentData = this.contactService.getContactPageData();
       
       // Update the keepInTouch section
       currentData.keepInTouch = newKeepInTouch;
       
       // Save the updated data to the JSON file
       this.contactService.updateContactPageData(currentData);
       
       // Return the updated contactPage
       return currentData;  // Return updated ContactPage object
     } catch (error) {
       console.error('Error in mutation updateKeepInTouch:', error.message);
       throw new Error('Failed to update Keep in Touch section');
     }
   }
}
