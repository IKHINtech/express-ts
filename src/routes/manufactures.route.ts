import { Router } from 'express';
import { ManufactureController } from '@controllers/manufactures.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ManufactureDto } from '@/dtos/manufactures.dto';

export class ManufactureRoute implements Routes {
  public path = '/manufactures';
  public router = Router();
  public Manufacture = new ManufactureController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.Manufacture.getManufactures);
    this.router.get(`${this.path}/:id(\\d+)`, this.Manufacture.getManufactureById);
    this.router.post(`${this.path}`, ValidationMiddleware(ManufactureDto), this.Manufacture.createManufacture);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(ManufactureDto, true), this.Manufacture.updateManufacture);
    this.router.delete(`${this.path}/:id(\\d+)`, this.Manufacture.deleteManufacture);
  }
}
