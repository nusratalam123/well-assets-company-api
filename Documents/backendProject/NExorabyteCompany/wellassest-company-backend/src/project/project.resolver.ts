import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProjectService } from "./project.service";
import { ProjectType } from "./types/project.type";
import { ProjectFilterInput } from "./dto/project-page.input";
import { ConnectType } from "./types/connect.type";
import { CreateConnectInput } from "./dto/create-connect.input";
import { UpdateConnectInput } from "./dto/update-connect.input";
import { UpdateProjectInput } from "./dto/update-project.input";
import { AddProjectInput } from "./dto/create-project.input";

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => ConnectType)
  async submitConnect(
    @Args("input") input: CreateConnectInput
  ): Promise<ConnectType> {
    return this.projectService.create(input);
  }

  @Query(() => [ConnectType])
  async getConnects(): Promise<ConnectType[]> {
    return this.projectService.findAll();
  }

  @Query(() => ConnectType)
  getSingleConnect(@Args("id") id: string) {
    return this.projectService.getOne(id);
  }

  @Mutation(() => ConnectType)
  updateConnect(@Args("input") input: UpdateConnectInput) {
    return this.projectService.update(input);
  }

  @Mutation(() => Boolean)
  deleteConnect(@Args("id") id: string) {
    return this.projectService.delete(id);
  }

  //--------------------------------------------------------------------------------------------------------------------------
  @Query(() => ProjectType)
  async getProjectPage() {
    return this.projectService.getProjectPage();
  }

  @Query(() => [ProjectType])
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Query(() => [ProjectType])
  async filterProjects(
    @Args("filter", { nullable: true }) filter: ProjectFilterInput
  ) {
    return this.projectService.filterProjects(filter || {});
  }

  @Query(() => ProjectType, { name: "getProjectById", nullable: true })
  getProjectById(@Args("id", { type: () => Number }) id: number) {
    return this.projectService.getProjectById(id);
  }

  // Delete project by id
  @Mutation(() => Boolean)
  async deleteProject(@Args("id") id: number): Promise<boolean> {
    return this.projectService.deleteProject(id);
  }

  // edit project by id
  @Mutation(() => Boolean)
  async editProject(
    @Args("id", { type: () => Number }) id: number,
    @Args("input") input: UpdateProjectInput
  ): Promise<boolean> {
    return this.projectService.editProjectById(id, input);
  }

  // create project
  @Mutation(() => ProjectType)
  async createProject(
    @Args("input") input: AddProjectInput
  ): Promise<ProjectType> {
    return this.projectService.createProject(input);
  }
}
