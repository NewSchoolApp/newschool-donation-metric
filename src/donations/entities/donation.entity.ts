import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  families: number;

  @Column()
  donors: number;

  @Column()
  total_value: number;

  @Column()
  impacted_people: number;

  @Column()
  donated_baskets: number;
}
