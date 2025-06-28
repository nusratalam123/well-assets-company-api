import { registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Register the ContactReason Enum
export enum ContactReason {
    LAND_DEVELOPMENT = 'Land Development',
    APARTMENT_BUYER = 'Apartment Buyer',
    COMMERCIAL_SPACE_BUYER = 'Commercial Space Buyer',
    LAND_BUYER = 'Land Buyer',
    AFTER_SALES_SERVICE = 'After Sales Service',
    GENERAL_ENQUIRY = 'General Enquiry',
    OTHERS = 'Others',
  }

// Register the enum with GraphQL
registerEnumType(ContactReason, { name: 'ContactReason' });

  @Entity({ name: 'contacts' })
  export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string;  // Change the type from number to string to match UUID format
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column()
    phone: string;
  
    @Column()
    message: string;
  
    @Column()
    reasonForContacting: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }