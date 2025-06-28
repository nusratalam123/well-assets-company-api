import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountStatus, Role, User } from './schema/user.schema';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User> // ✅ Direct access to "users" table
  ) {}

  private readonly jwtSecret = process.env.JWT_SECRET;


  async signUp(dto: SignupDto): Promise<User> {
    const { name, email, phoneNumber, password, confirmPassword ,role} = dto;

    // ✅ Check email directly from users table
    const emailExists = await this.userRepo.findOne({ where: { email } });
    if (emailExists) {
      throw new BadRequestException('Email already in use.');
    }

    // ✅ Check phone number directly from users table
    const phoneExists = await this.userRepo.findOne({ where: { phoneNumber } });
    if (phoneExists) {
      throw new BadRequestException('Phone number already in use.');
    }

    // ✅ Validate passwords match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const user = this.userRepo.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      accountStatus: AccountStatus.ACTIVE,
      role: role,
    });

    // ✅ Save to users table
    return this.userRepo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
  
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  
    // Add fallback if JWT_SECRET is not defined
    const secretKey = process.env.JWT_SECRET || 'default-secret-key';

    console.log(secretKey);
  
    const token = jwt.sign(payload, secretKey, {
      expiresIn: process.env.JWT_EXPIRES || '1d',
    });
  
    return {
      token,
      user,
    };
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }

}
