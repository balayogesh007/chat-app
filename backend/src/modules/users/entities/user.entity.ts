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

  @Field()
  @Column({ name: 'u_password' })
  password: string;

  @Field()
  @Column({ name: 'unique_id', nullable: true })
  uniqueId: string;

  @Field(() => Message, { nullable: true })
  @OneToMany(() => Message, (message) => message?.user, {
    cascade: true
  })
  messages: Message[];

  @Field(() => [Room], { nullable: true })
  @ManyToMany(() => Room, (room) => room?.users)
  rooms?: Room[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  deletedAt: Date;
}
