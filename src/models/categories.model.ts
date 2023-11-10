import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Category } from '@interfaces/categories.interface';
import { ProductModel } from './products.model';
export type CategoryCreationAttributes = Optional<Category, 'id' | 'category_name'>;

export class CategoryModel extends Model<Category, CategoryCreationAttributes> implements Category {
  public id: number;
  public category_name: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CategoryModel {
  CategoryModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category_name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'categories',
      sequelize,
    },
  );
  CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id', as: 'products' });
  return CategoryModel;
}
