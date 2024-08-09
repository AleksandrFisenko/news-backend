import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from "sequelize-typescript";
import { PostTags } from "./postTags.model";
import { Post } from "./post.model";

@Table({
  tableName: "Tag",
})
export class Tag extends Model {
  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Post, () => PostTags)
  posts: Post[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
