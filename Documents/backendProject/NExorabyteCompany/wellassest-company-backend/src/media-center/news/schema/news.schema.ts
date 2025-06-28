import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({nullable: true})
  slug: string;

  @Column({ default: 'News' }) 
  category: string;

  @Column()
  date: string;

  @Column()
  thumbnail: string;

  @Column({ type: 'jsonb' })
  description: string[]; 

  @Column('simple-array', { nullable: true })
  gallery: string[]; 
}
