import { Service } from 'typedi';
import { DB } from '@database';
import { CategoryDto } from '@dtos/categories.dto';
import { HttpException } from '@/exceptions/httpException';
import { Category } from '@interfaces/categories.interface';

@Service()
export class CategoryService {
  public async findAllCategories(): Promise<Category[]> {
    const allCategorie: Category[] = await DB.Categories.findAll();
    return allCategorie;
  }

  public async findCategorieById(CategorieId: number): Promise<Category> {
    const findCategorie: Category = await DB.Categories.findByPk(CategorieId);
    if (!findCategorie) throw new HttpException(409, "Categorie doesn't exist");

    return findCategorie;
  }

  public async createCategorie(CategorieData: CategoryDto): Promise<Category> {
    const findCategorie: Category = await DB.Categories.findOne({ where: { category_name: CategorieData.category_name } });
    if (findCategorie) throw new HttpException(409, `This name ${CategorieData.category_name} already exists`);

    const createCategorieData: Category = await DB.Categories.create({ ...CategorieData });
    return createCategorieData;
  }

  public async updateCategorie(CategorieId: number, CategorieData: CategoryDto): Promise<Category> {
    const findCategorie: Category = await DB.Categories.findByPk(CategorieId);
    if (!findCategorie) throw new HttpException(409, "Categorie doesn't exist");

    await DB.Categories.update({ ...CategorieData }, { where: { id: CategorieId } });

    const updateCategorie: Category = await DB.Categories.findByPk(CategorieId);
    return updateCategorie;
  }

  public async deleteCategorie(CategorieId: number): Promise<Category> {
    const findCategorie: Category = await DB.Categories.findByPk(CategorieId);
    if (!findCategorie) throw new HttpException(409, "Categorie doesn't exist");

    await DB.Categories.destroy({ where: { id: CategorieId } });

    return findCategorie;
  }
}
