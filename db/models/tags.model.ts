import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({
  tableName: "Tags",
})
export class Tags extends Model {
  @Column({
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  })
  name: string;

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
