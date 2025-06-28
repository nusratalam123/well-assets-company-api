import { registerEnumType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Define the category enum
export enum Category {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial',
}

// Register the enum for GraphQL
registerEnumType(Category, {
  name: 'Category',  // Name of the enum in GraphQL
  description: 'The type of property (Residential or Commercial)',  // Enum description for GraphQL schema
});

@Entity('customer_inquiry') // Updated the table name to 'customer_inquiry'
export class CustomerInquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @Column()
  location: string;

  @Column()
  size: number;

  @Column()
  message: string;

  @CreateDateColumn() // Use CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
