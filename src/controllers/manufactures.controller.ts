import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ManufactureDto } from '@dtos/manufactures.dto';
import { Manufacture } from '@interfaces/manufactures.interface';
import { ManufactureService } from '@/services/manufactures.serive';

export class ManufactureController {
  public Manufacture = Container.get(ManufactureService);

  public getManufactures = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllManufacturesData: Manufacture[] = await this.Manufacture.findAllManufactures();

      res.status(200).json({ data: findAllManufacturesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getManufactureById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ManufactureId = Number(req.params.id);
      const findOneManufactureData: Manufacture = await this.Manufacture.findManufactureById(ManufactureId);

      res.status(200).json({ data: findOneManufactureData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createManufacture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ManufactureData: ManufactureDto = req.body;
      const createManufactureData: Manufacture = await this.Manufacture.createManufacture(ManufactureData);

      res.status(201).json({ data: createManufactureData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateManufacture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ManufactureId = Number(req.params.id);
      const ManufactureData: ManufactureDto = req.body;
      const updateManufactureData: Manufacture = await this.Manufacture.updateManufacture(ManufactureId, ManufactureData);

      res.status(200).json({ data: updateManufactureData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteManufacture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ManufactureId = Number(req.params.id);
      const deleteManufactureData: Manufacture = await this.Manufacture.deleteManufacture(ManufactureId);

      res.status(200).json({ data: deleteManufactureData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
