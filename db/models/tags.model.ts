import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from "sequelize-typescript";
import { PostTags } from "./postTags.model";
import { Posts } from "./post.model";

@Table({
  tableName: "Tags",
})
export class Tags extends Model {
  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Posts, () => PostTags)
  posts: Posts[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
