import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from "sequelize-typescript";
import { Posts } from "./post.model";
import { Tags } from "./tags.model";

@Table({
  tableName: "Post_Tags",
})
export class Post_Tags extends Model {
  @PrimaryKey
  @ForeignKey(() => Posts)
  @Column
  post_id: number;

  @PrimaryKey
  @ForeignKey(() => Tags)
  @Column
  tag_id: number;

  @BelongsTo(() => Posts)
  post: Posts;

  @BelongsTo(() => Tags)
  tag: Tags;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
