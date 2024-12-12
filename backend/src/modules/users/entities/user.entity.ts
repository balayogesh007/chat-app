import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'u_id' })
  uId: string;

  @Field()
  @Column({ name: 'u_firstname' })
  firstName: string;

  @Field()
  @Column({ name: 'u_lastname' })
  lastName: string;

  @Field()
  @Column({ name: 'u_email_id', unique: true })
  emailId: string;

  @Field()
  @Column({ name: 'u_password' })
  password: string;

  @Field()
  @Column({ name: 'unique_id' })
  uniqueId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
