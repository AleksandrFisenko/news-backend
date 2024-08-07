import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({
  tableName: "Users",
})
export class Users extends Model {
  @Column({
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true,
    },
  })
  email: string;

  @Column({
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  password: string;

  @Column({
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  login: string;

  @Column
  avatar_url: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: string;
}
