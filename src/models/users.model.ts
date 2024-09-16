import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { Post } from "src/modules/posts/models/post.model";

@Table({
  tableName: "User",
  underscored: true,
})
export class User extends Model {
  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @HasMany(() => Post)
  posts: Post;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
  })
  login: string;

  @Column
  avatarUrl: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
