import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { User } from 'src/auth/schema/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,  // Injecting User repository
      ) {}
    
      // Find user by email for authentication
      async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepo.findOne({ where: { email } });
        return user;
      }
    
      // Get all users
      async getAllUsers(): Promise<User[]> {
        return this.userRepo.find();  // Return all users
      }
    
      // Get a single user by ID
      async getSingleUserById(id: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
      }
    
      // Delete a user by ID
      async deleteUser(id: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        await this.userRepo.remove(user);  // Remove the user from the database
        return user;
      }
    
      // Update a user by ID
      async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        await this.userRepo.save(user);  // Save the updated user
        return user;
      }
    
      // Get authenticated user profile
      async getUserProfile(user: User): Promise<User> {
        const foundUser = await this.userRepo.findOne({ where: { id: user.id } });
        if (!foundUser) {
          throw new NotFoundException(`User with id ${user.id} not found`);
        }
        return foundUser;
      }
}
