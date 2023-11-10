import { Router } from 'express';
import { CategoryController } from '@controllers/categories.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { CategoryDto } from '@/dtos/categories.dto';

export class CategoryRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.category.getCategorys);
    this.router.get(`${this.path}/:id(\\d+)`, this.category.getCategoryById);
    this.router.post(`${this.path}`, ValidationMiddleware(CategoryDto), this.category.createCategory);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CategoryDto, true), this.category.updateCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.category.deleteCategory);
  }
}
