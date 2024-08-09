import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from "sequelize-typescript";
import { Users } from "./users.model";
import { Tags } from "./tags.model";
import { PostTags } from "./postTags.model";

@Table({
  tableName: "Posts",
})
export class Posts extends Model {
  @ForeignKey(() => Users)
  @Column({
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    allowNull: false,
  })
  text: string;

  @BelongsToMany(() => Tags, () => PostTags)
  tags: Tags[];

  @Column
  image_url: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
