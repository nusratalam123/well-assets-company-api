import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from 'src/auth/types/user.type';
import { User } from 'src/auth/schema/user.schema';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}
    
  // Find user by email for authentication
  @Query(() => UserType, { nullable: true })
  async findUserByEmail(@Args('email') email: string): Promise<UserType | null> {
    return this.userService.findUserByEmail(email);
  }

  // Get all users
  @Query(() => [UserType])
  async getAllUsers(): Promise<UserType[]> {
    return this.userService.getAllUsers();
  }

  // Get single user by ID
  @Query(() => UserType)
  async getSingleUserById(@Args('id') id: string): Promise<UserType> {
    return this.userService.getSingleUserById(id);
  }

  // Delete user by ID
  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: string): Promise<UserType> {
    return this.userService.deleteUser(id);
  }

  // Update user by ID
  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<UserType> {
    return this.userService.updateUser(id, updateUserDto);
  }

  // // Get authenticated user profile
  // @Query(() => UserType)
  // async getUserProfile(@Args('user') user: User): Promise<UserType> {
  //   return this.userService.getUserProfile(user);
  // }
}
