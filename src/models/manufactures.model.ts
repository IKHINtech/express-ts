import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Manufacture } from '@interfaces/manufactures.interface';
import { ProductModel } from './products.model';
export type ManufactureCreationAttributes = Optional<Manufacture, 'id' | 'manufacture_name'>;

export class ManufactureModel extends Model<Manufacture, ManufactureCreationAttributes> implements Manufacture {
  public id: number;
  public manufacture_name: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ManufactureModel {
  ManufactureModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      manufacture_name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'manufactures',
      sequelize,
    },
  );
  ManufactureModel.hasMany(ProductModel, { foreignKey: 'manufacture_id', as: 'products' });
  return ManufactureModel;
}
