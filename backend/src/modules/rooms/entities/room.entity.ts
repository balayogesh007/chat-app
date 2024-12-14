import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../message/entities/message.entity';

@ObjectType()
@Entity({ name: 'rooms' })
export class Room {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'room_id' })
  rId: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'room_name' })
  roomName: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.rooms, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'user_room_mappings',
    joinColumn: {
      name: 'room_id',
      referencedColumnName: 'rId',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'uId',
    },
  })
  users: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.room, {
    cascade: true,
  })
  messages: Message[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;
}
