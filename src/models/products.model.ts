import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Product } from '@interfaces/products.interface';
import CategoryModel from './categories.model';
import ManufactureModel from './manufactures.model';

export type ProductCreationAttributes = Optional<Product, 'id' | 'category_id' | 'manufacture_id' | 'price' | 'product_name' | 'qty'>;

export class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
  public id: number;
  public product_name: string;
  public price: number;
  public qty: number;
  public category_id: number;
  public manufacture_id: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProductModel {
  ProductModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: { allowNull: false, type: DataTypes.INTEGER },
      category_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      manufacture_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'products',
      sequelize,
    },
  );
  // Menetapkan hubungan "belongs to" dengan CategoryModel
  ProductModel.belongsTo(CategoryModel(sequelize), { foreignKey: 'category_id', as: 'category' });

  // Menetapkan hubungan "belongs to" dengan ManufacturerModel
  ProductModel.belongsTo(ManufactureModel(sequelize), { foreignKey: 'manufacture_id', as: 'manufacturer' });

  return ProductModel;
}
