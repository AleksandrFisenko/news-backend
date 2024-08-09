import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "Users",
})
export class Users extends Model {
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
  avatar_url: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
