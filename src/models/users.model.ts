import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

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
