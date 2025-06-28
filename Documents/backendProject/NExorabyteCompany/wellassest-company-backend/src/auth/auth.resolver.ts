import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User} from './schema/user.schema';
import { UserType } from './types/user.type';
import { SignupDto } from './dto/signup.dto';
import { LoginResponseType } from './dto/login-response.type';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => UserType)
  async signUp(@Args('signUpDto') signUpDto: SignupDto): Promise<UserType> {
    const user = await this.authService.signUp(signUpDto);
    return {
      ...user,
      id: user.id,
    };
  }

  @Mutation(() => LoginResponseType)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponseType> {
    return this.authService.login(email, password);
  }
}
