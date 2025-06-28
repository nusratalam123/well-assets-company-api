import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: 'Event' }) 
  category: string;

  @Column({nullable: true})
  slug?: string;

  @Column()
  date: string;

  @Column()
  thumbnail: string;

  @Column({ type: 'jsonb' }) 
  description: string[];     
}
