import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({
  tableName: "Post_Tags",
})
export class Post_Tags extends Model {
  @Column({
    allowNull: false,
    references: {
      model: "Posts",
      key: "id",
    },
  })
  post_id: number;

  @Column({
    allowNull: false,
    references: {
      model: "Tags",
      key: "id",
    },
  })
  tag_id: number;

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
