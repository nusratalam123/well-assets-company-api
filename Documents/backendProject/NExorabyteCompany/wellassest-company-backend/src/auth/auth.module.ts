import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schema/user.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
