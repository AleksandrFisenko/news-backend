import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { Users } from "./users.model";
import { Tags } from "./tags.model";
import { Post_Tags } from "./postTags.model";

@Table({
  tableName: "Posts",
})
export class Posts extends Model {
  @Column({
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  text: string;

  @BelongsToMany(() => Tags, () => Post_Tags)
  tags: Tags[];

  @Column
  image_url: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
