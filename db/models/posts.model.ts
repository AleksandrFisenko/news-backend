import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({
  tableName: "Posts",
})
export class Posts extends Model {
  @Column({
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  })
  user_id: number;

  @Column({
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  name: string;

  @Column({
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  text: string;

  @Column
  image_url: string;

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
