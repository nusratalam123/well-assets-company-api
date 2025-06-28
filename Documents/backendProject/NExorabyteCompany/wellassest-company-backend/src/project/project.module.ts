import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectResolver } from "./project.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connect } from "./schema/conect.schema";

@Module({
  imports: [TypeOrmModule.forFeature([Connect])],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
