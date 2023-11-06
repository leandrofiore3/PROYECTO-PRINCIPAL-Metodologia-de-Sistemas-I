import Category from '../../domain/entities/category.entity';
import { Request, Response } from 'express';
import CategoryRepository from '../../infrastructure/repositories/category.repository';

class CategoryHandler {
  public static listCategories(res: Response) {
    const categories = CategoryRepository.findAll();

    res.json(categories);
  }

  public static getCategoryById(req: Request, res: Response) {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(401).send("Categoría no enviada");
    }

    const category = CategoryRepository.findOneById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    return res.status(200).json(category);
  }

  public static async createCategory(req: Request, res: Response) {
    const { name, color } = req.body;

    if (!name || !color) {
      return res.status(400).json({ message: 'Nombre y color son campos obligatorios' });
    }

    const newCategory = Category.create(name, color);

    await CategoryRepository.save(newCategory);

    return res.status(201).json(newCategory);
  }
}

export default CategoryHandler;