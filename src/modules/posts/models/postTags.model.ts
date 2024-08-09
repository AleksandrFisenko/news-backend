import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";
import { Post } from "./post.model";
import { Tag } from "./tags.model";

@Table({
  tableName: "PostTags",
})
export class PostTags extends Model {
  @ForeignKey(() => Post)
  @Column
  post_id: number;

  @ForeignKey(() => Tag)
  @Column
  tag_id: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
