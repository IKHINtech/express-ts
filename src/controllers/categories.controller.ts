import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CategoryDto } from '@dtos/categories.dto';
import { Category } from '@interfaces/categories.interface';
import { CategoryService } from '@services/categories.serivice';

export class CategoryController {
  public Category = Container.get(CategoryService);

  public getCategorys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCategorysData: Category[] = await this.Category.findAllCategories();

      res.status(200).json({ data: findAllCategorysData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CategoryId = Number(req.params.id);
      const findOneCategoryData: Category = await this.Category.findCategorieById(CategoryId);

      res.status(200).json({ data: findOneCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CategoryData: CategoryDto = req.body;
      const createCategoryData: Category = await this.Category.createCategorie(CategoryData);

      res.status(201).json({ data: createCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CategoryId = Number(req.params.id);
      const CategoryData: CategoryDto = req.body;
      const updateCategoryData: Category = await this.Category.updateCategorie(CategoryId, CategoryData);

      res.status(200).json({ data: updateCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CategoryId = Number(req.params.id);
      const deleteCategoryData: Category = await this.Category.deleteCategorie(CategoryId);

      res.status(200).json({ data: deleteCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
