import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('job_listings')
export class JobListing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  status: string;

  @Column('text', { array: true })
  jobResponsibilities: string[];

  @Column('text', { array: true })
  educationalRequirements: string[];

  @Column('text', { array: true })
  experienceRequirements: string[];

  @Column('text', { array: true })
  additionalRequirements: string[];

  @Column('text', { array: true })
  jobPreferences: string[];

  @Column('text', { array: true })
  benefits: string[];

  @Column()
  applyBefore: string; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
