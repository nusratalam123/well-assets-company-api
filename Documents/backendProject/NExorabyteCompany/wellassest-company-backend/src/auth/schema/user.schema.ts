import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export enum AccountStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
  }
  
  export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
  }
  
  @Entity({ name: 'users' }) 
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ unique: true })
    phoneNumber: string;
  
    @Column()
    password: string;
  
    @Column()
    confirmPassword: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column({ default: AccountStatus.PENDING })
    accountStatus: AccountStatus;
  
    @Column()
    role: Role;
  }
  