import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  quote: string;

  @Column()
  authorName: string;

  @Column()
  authorPosition: string;

  @Column()
  videoUrl: string;

  @Column()
  thumbnailUrl: string;
}
