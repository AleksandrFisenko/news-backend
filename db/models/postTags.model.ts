import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";
import { Posts } from "./post.model";
import { Tags } from "./tags.model";

@Table({
  tableName: "PostTags",
})
export class PostTags extends Model {
  @ForeignKey(() => Posts)
  @Column
  post_id: number;

  @ForeignKey(() => Tags)
  @Column
  tag_id: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
