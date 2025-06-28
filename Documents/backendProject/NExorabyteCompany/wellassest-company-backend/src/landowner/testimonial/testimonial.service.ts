import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Testimonial } from "./schema/testimonial.schema";
import { Repository } from "typeorm";
import { CreateTestimonialInput } from "./dto/create-testimonial.input";
import { UpdateTestimonialInput } from "./dto/update-testimonial.input";

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly repo: Repository<Testimonial>
  ) {}
  // create testimonial
  async create(input: CreateTestimonialInput): Promise<Testimonial> {
    const testimonial = this.repo.create(input);
    return this.repo.save(testimonial);
  }

  async findAll(): Promise<Testimonial[]> {
    return this.repo.find({ order: { id: "DESC" } });
  }

  async findOne(id: string): Promise<Testimonial> {
    const result = await this.repo.findOneBy({ id });
    if (!result) throw new Error("Testimonial not found");
    return result;
  }

  // DELETE
  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  // Update testimonial
  async update(
    id: string,
    input: UpdateTestimonialInput
  ): Promise<Testimonial> {
    const testimonial = await this.repo.findOneBy({ id });
    if (!testimonial) throw new NotFoundException("Testimonial not found");

    Object.assign(testimonial, input);
    return this.repo.save(testimonial);
  }
}
