import { Injectable } from '@nestjs/common';
import { JointVenture } from './schema/joint-venture.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJointVentureInput} from './dto/create-joint-venture.input';

@Injectable()
export class JointVentureService {
    constructor(
        @InjectRepository(JointVenture)
        private readonly repo: Repository<JointVenture>,
      ) {}
    
      async create(input: CreateJointVentureInput): Promise<JointVenture> {
        const record = this.repo.create(input);
        return this.repo.save(record);
      }
    
      async findAll(): Promise<JointVenture[]> {
        return this.repo.find({ order: { id: 'DESC' } });
      }
    
      async findOne(id: string): Promise<JointVenture> {
        const found = await this.repo.findOneBy({ id });
        if (!found) {
          throw new Error(`JointVenture with id ${id} not found`);
        }
        return found;
      }
      
    
      async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return (result.affected ?? 0) > 0;

      }
}
