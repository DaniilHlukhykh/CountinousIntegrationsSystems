import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity.js";
import { Genre } from "../Genre.js";

@Entity("posts")
export class NewspostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  header!: string;

  @Column({ type: "text" })
  text!: string;

  @Column({ type: "enum", enum: Genre })
  genre!: Genre;

  @Column({ type: "boolean" })
  isPrivate!: boolean;

  @Column({ type: "boolean", default: false })
  deleted!: boolean;

  @ManyToOne(() => UserEntity)
  author!: UserEntity;
}
