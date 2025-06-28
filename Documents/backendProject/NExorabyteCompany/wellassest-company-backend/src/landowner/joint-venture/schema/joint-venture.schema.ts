import { registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum LandCategory {
    FREEHOLD = 'freehold',
    LEASEHOLD = 'leasehold',
  }
  
  export enum Facing {
    NORTH = 'north',
    SOUTH = 'south',
    EAST = 'east',
    WEST = 'west',
  }
  
  registerEnumType(LandCategory, { name: 'LandCategory' });
  registerEnumType(Facing, { name: 'Facing' });

@Entity('joint-ventures')
export class JointVenture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  locality: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  landSize?: string;

  @Column({ nullable: true })
  frontRoadWidth?: string;

  @Column({ type: 'enum', enum: LandCategory, nullable: true })
  landCategory?: LandCategory;

  @Column({ type: 'enum', enum: Facing, nullable: true })
  facing?: Facing;

  @Column({ nullable: true })
  benefits?: string;

  @Column()
  landownerName: string;

  @Column({ nullable: true })
  contactPerson?: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  phone: string;

  @Column({ nullable: true, type: 'text' })
  message?: string;
}
