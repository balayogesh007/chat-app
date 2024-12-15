import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { Message } from '../../message/entities/message.entity';

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

  //Make null for google sign in
  @Field({ nullable: true })
  @Column({ name: 'u_password', nullable: true })
  password?: string;

  @Field({ nullable: true })
  @Column({ name: 'is_social_login', default: false })
  isSocialLogin?: boolean;

  @Field()
  @Column({ name: 'unique_id', nullable: true })
  uniqueId: string;

  @Field(() => Message, { nullable: true })
  @OneToMany(() => Message, (message) => message?.user, {
    cascade: true,
  })
  messages: Message[];

  @Field(() => [Room], { nullable: true })
  @ManyToMany(() => Room, (room) => room?.users)
  rooms?: Room[];

  @Field({ nullable: true })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Field({ nullable: true })
  @CreateDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;
}
