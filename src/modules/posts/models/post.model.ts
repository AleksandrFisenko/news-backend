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

import { User } from "src/models/users.model";

import { Tag } from "./tag.model";
import { PostTags } from "./postTags.model";

@Table({
  tableName: "Post",
  underscored: true,
})
export class Post extends Model {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column({
    allowNull: false,
  })
  text: string;

  @BelongsToMany(() => Tag, () => PostTags)
  tags: Tag[];

  @Column
  imageUrl: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
