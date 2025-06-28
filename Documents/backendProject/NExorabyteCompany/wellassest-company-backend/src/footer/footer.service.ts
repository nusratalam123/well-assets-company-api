import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FooterDto } from './types/footer.type';
import { UpdateFooterInput } from './dto/footer.input';

@Injectable()
export class FooterService {
  private readonly filePath = path.join(__dirname, '../../src/assets/footerPageData.json');
  
 // Method to get footer data from JSON file
 getFooter(): FooterDto {
  const data = fs.readFileSync(this.filePath, 'utf8');
  const parsedData = JSON.parse(data);
  return parsedData.footer;
}

// Method to update the footer data in the JSON file
async updateFooter(updateFooterInput: UpdateFooterInput): Promise<FooterDto> {
  // Read the current data from the JSON file
  const data = fs.readFileSync(this.filePath, 'utf8');
  const parsedData = JSON.parse(data);

  // Get the existing footer
  const existingFooter = parsedData.footer;

  if (!existingFooter) {
    throw new Error('Footer not found');
  }

  // Update the fields only if they are provided in the input
  if (updateFooterInput.phoneNumber !== undefined) {
    existingFooter.phoneNumber = updateFooterInput.phoneNumber;
  }

  if (updateFooterInput.socialLinks) {
    existingFooter.socialLinks = { 
      ...existingFooter.socialLinks, 
      ...updateFooterInput.socialLinks
    };
  }

  if (updateFooterInput.links) {
    updateFooterInput.links.forEach(updatedLink => {
      const index = existingFooter.links.findIndex(
        (link) => link.label === updatedLink.label
      );
      if (index !== -1) {
        existingFooter.links[index] = { ...existingFooter.links[index], ...updatedLink };
      }
    });
  }

  // Update other fields
  if (updateFooterInput.address) existingFooter.address = updateFooterInput.address;
  if (updateFooterInput.footerText) existingFooter.footerText = updateFooterInput.footerText;
  if (updateFooterInput.footerSubText) existingFooter.footerSubText = updateFooterInput.footerSubText;
  if (updateFooterInput.footerImage) existingFooter.footerImage = updateFooterInput.footerImage;
  if (updateFooterInput.logo) existingFooter.logo = updateFooterInput.logo;


  // Write the updated data back to the JSON file
  parsedData.footer = existingFooter;
  fs.writeFileSync(this.filePath, JSON.stringify(parsedData, null, 2), 'utf8');

  return existingFooter;  // Return updated footer
}

}
