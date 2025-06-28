import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { RecognitionInput, TeamMemberInput } from './dto/leader.input';
import { RecognitionType, TeamMemberType } from './types/leader.type';

const FILE_PATH = path.join(__dirname, '../../../src/assets/leaderPageData.json');


@Injectable()
export class LeaderService {
    private readData() {
        return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
      }
    
      private writeData(data: any) {
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
      }
    
      getLeaderPage() {
        return this.readData().leaderPage;
      }

      getLeaderHero() {
        return this.readData().leaderPage.leaderHero;
      }
    
    
      updateLeaderHero(input) {
        const data = this.readData();
        data.leaderPage.leaderHero = input;
        this.writeData(data);
        return input;
      }
    
      getFounderInfo() {
        return this.readData().leaderPage.founderSection;
      }
   
      updateFounderSection(input) {
        const data = this.readData();
        data.leaderPage.founderSection = input;
        this.writeData(data);
        return input;
      }
      //leader section
      // Get the leader team
      getLeaderTeam() {
        return this.readData().leaderPage.leaderOfTeam;
      }
      // Add a new leader with auto-incremented ID
  addLeaderToTeam(input: TeamMemberInput): TeamMemberType {
    const data = this.readData();
    const newId = Math.max(...data.leaderPage.leaderOfTeam.map(item => item.id)) + 1;  // Auto-increment the ID
    const newLeader = { ...input, id: newId };
    data.leaderPage.leaderOfTeam.push(newLeader);
    this.writeData(data);
    return newLeader;
  }

  // Update leader by ID
  updateLeaderOfTeam(id: number, input: TeamMemberInput): TeamMemberType | null {
    const data = this.readData();
    const leaderIndex = data.leaderPage.leaderOfTeam.findIndex(leader => leader.id === id);

    if (leaderIndex === -1) {
      return null; // Leader not found, return null
    }

    // Update the leader with the fields provided in the input
    const updatedLeader = { ...data.leaderPage.leaderOfTeam[leaderIndex], ...input };
    data.leaderPage.leaderOfTeam[leaderIndex] = updatedLeader;

    // Save the updated data
    this.writeData(data);

    return updatedLeader; // Return the updated leader
  }
  // Delete leader by ID
  deleteLeaderFromTeam(id: number): boolean {
    const data = this.readData();
    const index = data.leaderPage.leaderOfTeam.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;  // Return false if the leader is not found
    }

    data.leaderPage.leaderOfTeam.splice(index, 1);  // Remove the leader from the list
    this.writeData(data);
    return true;  // Return true if the leader was successfully deleted
  }

      getManagementTeam() {
        return this.readData().leaderPage.managementTeam;
      }
    
   // Update management team member by id
   updateManagementTeam(id: number, input: TeamMemberInput): TeamMemberType | null {
    const data = this.readData();
    
    // Find the team member by id
    const memberIndex = data.leaderPage.managementTeam.findIndex(member => member.id === id);

    if (memberIndex === -1) {
      // If member not found, throw an error or return null (handle as per your use case)
      throw new Error(`Team member with id ${id} not found.`);
    }

    // Apply the update to the member
    const updatedMember = { ...data.leaderPage.managementTeam[memberIndex], ...input };
    data.leaderPage.managementTeam[memberIndex] = updatedMember;

    // Save the updated team data
    this.writeData(data);

    return updatedMember; // Return the updated team member
  }

  // Add a new team member with auto-incremented ID
  addManagementTeam(input: TeamMemberInput): TeamMemberType {
    const data = this.readData();
    const newId = Math.max(...data.leaderPage.managementTeam.map((team) => team.id)) + 1;
    const newMember = { ...input, id: newId };
    data.leaderPage.managementTeam.push(newMember);
    this.writeData(data);
    return newMember;
  }

  // Delete a team member by ID
  deleteManagementTeam(id: number): boolean {
    const data = this.readData();
    const index = data.leaderPage.managementTeam.findIndex((member) => member.id === id);
    
    if (index !== -1) {
      data.leaderPage.managementTeam.splice(index, 1);
      this.writeData(data);
      return true;
    }

    return false; // Return false if the team member doesn't exist
  }
      getRecognitions() {
        return this.readData().leaderPage.recognitions;
      }
   // Add a new recognition with automatic ID increment
  addRecognition(input: RecognitionInput): RecognitionType {
    const data = this.readData();
    const recognitions = data.leaderPage.recognitions;

    const newId = this.getNextId();  // Automatically increment ID
    const newRecognition = {
      ...input,
      id: newId,
    };

    recognitions.push(newRecognition);
    data.leaderPage.recognitions = recognitions;
    this.writeData(data);

    return newRecognition;
  }

  // Update a recognition by ID
  updateRecognition(id: number, input: RecognitionInput): RecognitionType | null {
    const data = this.readData();
    const recognitions = data.leaderPage.recognitions;
    const index = recognitions.findIndex(rec => rec.id === id);

    if (index === -1) {
      return null;  // Recognition not found
    }

    recognitions[index] = { ...recognitions[index], ...input };  // Update only provided fields
    data.leaderPage.recognitions = recognitions;
    this.writeData(data);

    return recognitions[index];
  }

  // Delete a recognition by ID
  deleteRecognition(id: number): boolean {
    const data = this.readData();
    const recognitions = data.leaderPage.recognitions;
    const index = recognitions.findIndex(rec => rec.id === id);

    if (index === -1) {
      return false;  // Recognition not found
    }

    recognitions.splice(index, 1);  // Delete the recognition
    data.leaderPage.recognitions = recognitions;
    this.writeData(data);

    return true;
  }

  // Get the next available ID (auto-incremented)
  private getNextId(): number {
    const data = this.readData();
    const recognitions = data.leaderPage.recognitions;
    const maxId = recognitions.reduce((max, rec) => (rec.id > max ? rec.id : max), 0);
    return maxId + 1;  // Increment the maximum ID by 1
  }
}
