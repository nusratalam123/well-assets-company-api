import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ default: 'Blog' }) 
  category: string;

  @Column()
  date: string;

  @Column()
  thumbnail: string;

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'jsonb' })
  sections: { image: string; texts?: string[] }[];
}
