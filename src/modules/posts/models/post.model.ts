import { Users } from "src/modules/users/users.model";
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
import { Tag } from "./tag.model";
import { PostTags } from "./postTags.model";


@Table({
  tableName: "Post",
})
export class Post extends Model {
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

  @BelongsToMany(() => Tag, () => PostTags)
  tags: Tag[];

  @Column
  image_url: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
