import { Service } from 'typedi';
import { DB } from '@database';
import { ManufactureDto } from '@dtos/manufactures.dto';
import { HttpException } from '@/exceptions/httpException';
import { Manufacture } from '@interfaces/manufactures.interface';

@Service()
export class ManufactureService {
  public async findAllManufactures(): Promise<Manufacture[]> {
    const allManufacture: Manufacture[] = await DB.Manufactures.findAll();
    return allManufacture;
  }

  public async findManufactureById(ManufactureId: number): Promise<Manufacture> {
    const findManufacture: Manufacture = await DB.Manufactures.findByPk(ManufactureId);
    if (!findManufacture) throw new HttpException(409, "Manufacture doesn't exist");

    return findManufacture;
  }

  public async createManufacture(ManufactureData: ManufactureDto): Promise<Manufacture> {
    const findManufacture: Manufacture = await DB.Manufactures.findOne({ where: { manufacture_name: ManufactureData.manufacture_name } });
    if (findManufacture) throw new HttpException(409, `This name ${ManufactureData.manufacture_name} already exists`);

    const createManufactureData: Manufacture = await DB.Manufactures.create({ ...ManufactureData });
    return createManufactureData;
  }

  public async updateManufacture(ManufactureId: number, ManufactureData: ManufactureDto): Promise<Manufacture> {
    const findManufacture: Manufacture = await DB.Manufactures.findByPk(ManufactureId);
    if (!findManufacture) throw new HttpException(409, "Manufacture doesn't exist");

    await DB.Manufactures.update({ ...ManufactureData }, { where: { id: ManufactureId } });

    const updateManufacture: Manufacture = await DB.Manufactures.findByPk(ManufactureId);
    return updateManufacture;
  }

  public async deleteManufacture(ManufactureId: number): Promise<Manufacture> {
    const findManufacture: Manufacture = await DB.Manufactures.findByPk(ManufactureId);
    if (!findManufacture) throw new HttpException(409, "Manufacture doesn't exist");

    await DB.Manufactures.destroy({ where: { id: ManufactureId } });

    return findManufacture;
  }
}
