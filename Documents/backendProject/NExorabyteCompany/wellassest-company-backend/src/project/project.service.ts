import { Injectable, NotFoundException } from "@nestjs/common";
import * as fs from "fs/promises";
import * as path from "path";
import { ProjectFilterInput } from "./dto/project-page.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Connect } from "./schema/conect.schema";
import { Repository } from "typeorm";
import { CreateConnectInput } from "./dto/create-connect.input";
import { UpdateConnectInput } from "./dto/update-connect.input";
import { UpdateProjectInput } from "./dto/update-project.input";
import { AddProjectInput } from "./dto/create-project.input";

const FILE_PATH = path.join(__dirname, "../../src/assets/projectPageData.json");

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Connect)
    private readonly connectRepo: Repository<Connect>
  ) {}

  async create(input: CreateConnectInput): Promise<Connect> {
    const connect = this.connectRepo.create(input);
    return this.connectRepo.save(connect);
  }

  async findAll(): Promise<Connect[]> {
    return this.connectRepo.find({ order: { createdAt: "DESC" } });
  }

  async getOne(id: string): Promise<Connect> {
    const connect = await this.connectRepo.findOne({ where: { id } });
    if (!connect) throw new NotFoundException("Connect not found");
    return connect;
  }

  async update(input: UpdateConnectInput): Promise<Connect> {
    const connect = await this.getOne(input.id);
    Object.assign(connect, input);
    return this.connectRepo.save(connect);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connectRepo.delete(id);
    return (result?.affected ?? 0) > 0;
  }
  //...........................................................................................................................

  private async readJson(): Promise<any> {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  }

  private async writeJson(data: any): Promise<void> {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
  }

  async getProjectPage(): Promise<any> {
    const data = await this.readJson();
    return data.projectPage;
  }

  async getAllProjects(): Promise<any[]> {
    const data = await this.readJson();
    return data.projectPage?.projects || [];
  }

  async filterProjects(filter: ProjectFilterInput) {
    const jsonData = await this.readJson();
    let projects = jsonData.projectPage?.projects || [];

    if (filter.location) {
      const location = filter.location.toLowerCase();
      projects = projects.filter(
        (p) => (p.location || "").toLowerCase() === location
      );
    }

    if (filter.status) {
      const status = filter.status.toLowerCase();
      projects = projects.filter(
        (p) => (p.status || "").toLowerCase() === status
      );
    }

    if (filter.type) {
      const type = filter.type.toLowerCase();
      projects = projects.filter((p) => (p.type || "").toLowerCase() === type);
    }

    if (filter.size) {
      const size = filter.size.toLowerCase();
      projects = projects.filter((p) => (p.size || "").toLowerCase() === size);
    }

    return projects;
  }

  async getProjectById(id: number) {
    const jsonData = await this.readJson();
    const projects = jsonData.projectPage?.projects || [];
    return projects.find((p) => p.id === id);
  }

  // Method to read the existing JSON file
  private async readJsonForProject(): Promise<any> {
    try {
      // Read the file and parse it
      const data = await fs.readFile(FILE_PATH, "utf-8");
      const parsedData = JSON.parse(data);

      // Ensure the projectPage and projects array exist
      if (!parsedData.projectPage) {
        parsedData.projectPage = { projects: [] };
      }

      if (!Array.isArray(parsedData.projectPage.projects)) {
        parsedData.projectPage.projects = [];
      }

      return parsedData; // Return the parsed data
    } catch (error) {
      console.warn(
        "Error reading JSON file or file is empty. Initializing with empty projects."
      );
      return { projectPage: { projects: [] } }; // Return an empty structure
    }
  }

  // Method to save the project to the JSON file
  private async saveToJsonFile(input: AddProjectInput) {
    // Read the current JSON file
    const data = await this.readJsonForProject(); // data contains the 'projectPage' object

    // Get the current list of projects
    const projects = data.projectPage?.projects || [];

    // Auto-increment the ID (calculate next available ID)
    const newId =
      projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;

    // Create the new project with the incremented ID
    const projectWithId = { ...input, id: newId };

    // Push the new project into the projects array
    projects.push(projectWithId);

    // Update the projectPage with the new project list
    data.projectPage.projects = projects;

    // Write the updated data back to the JSON file
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));

    // Return the new project with the assigned ID
    return projectWithId;
  }
  //-----------------------------------------------------------------------------------------

  async getDetailItems(id: number) {
    const project = await this.getProjectById(id);
    return project?.detailItems || [];
  }

  async getFeatures(id: number) {
    const project = await this.getProjectById(id);
    return project?.features || [];
  }

  async getAmenities(id: number) {
    const project = await this.getProjectById(id);
    return project?.amenities || [];
  }

  async getRelatedProjects(id: number) {
    const project = await this.getProjectById(id);
    return project?.relatedProjects || [];
  }

  // Delete project by id

  async deleteProject(id: number): Promise<boolean> {
    try {
      const jsonData = await this.readJson();
      const projects = jsonData.projectPage?.projects || [];

      // Find the project by its ID
      const projectIndex = projects.findIndex((p) => p.id === id);

      // If the project does not exist, return false
      if (projectIndex === -1) {
        return false;
      }

      // Remove the project from the array
      projects.splice(projectIndex, 1);

      // Write the updated list back to the JSON file
      await this.writeJson(jsonData);
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false; // Return false if an error occurs
    }
  }

  // edit project by id

  async editProjectById(
    id: number,
    updatedData: UpdateProjectInput
  ): Promise<boolean> {
    try {
      const jsonData = await this.readJson();
      const projects = jsonData.projectPage?.projects || [];

      const projectIndex = projects.findIndex((p) => p.id === id);

      if (projectIndex === -1) {
        return false;
      }

      projects[projectIndex] = { ...projects[projectIndex], ...updatedData };

      await this.writeJson(jsonData);
      return true;
    } catch (error) {
      console.error("Error editing project:", error);
      return false;
    }
  }

  // Method to create a project and save it to both DB and JSON file
  async createProject(input: AddProjectInput): Promise<any> {
    // Save the project to the JSON file
    const project = await this.saveToJsonFile(input);
    return project; // Return the created project
  }
}
