import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { CustomerEnquiryModule } from './customer-inquiry/customer-inquiry.module';
import { CareerModule } from './career/career.module';
import { LandownerModule } from './landowner/landowner.module';
import { MediaCenterModule } from './media-center/media-center.module';
import { AboutModule } from './about-us/about.module';
import { ProjectModule } from './project/project.module';
import { HomeModule } from './home/home.module';
import { FooterModule } from './footer/footer.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // generate schema automatically
      playground: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    UserModule,

    AuthModule,

    ContactModule,

    CustomerEnquiryModule,

    CareerModule,

    LandownerModule,

    MediaCenterModule,

    AboutModule,

    ProjectModule,

    HomeModule,

    FooterModule,
  ],
  providers: [AppService, AppResolver],
  exports: [AppService],
})
export class AppModule {}
