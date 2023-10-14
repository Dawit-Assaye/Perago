import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('position')
export class PositionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ default: null })
  parent_id: string;
  @Column({default:null})
  report_to: string;
}
