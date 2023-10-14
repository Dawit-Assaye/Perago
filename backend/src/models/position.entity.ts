import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('position')
export class PositionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ default: null })
  parent_id: number;
  @Column({default:null})
  report_to: string;
}
