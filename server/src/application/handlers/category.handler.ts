//import { Request, Response } from 'express';
//import GetCategoriesCommand from '../commands/getCategories.command';
//import Category from '../../domain/entities/category.entity';

class CategoryHandler {
  /*private categoryRepository: GetCategoriesCommand;

  constructor(categoryRepository: CategoryRepository) {
    this.getCategoriesCommand = new GetCategoriesCommand(categoryRepository);
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.getCategoriesCommand.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = req.params.categoryId;
      const category = await this.getCategoriesCommand.getCategoryById(categoryId);

      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: 'Categoría no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la categoría' });
    }
  }

  async saveCategory(req: Request, res: Response): Promise<void> {
    try {
      const newCategory = req.body as Category;
      await this.getCategoriesCommand.saveCategory(newCategory);
      res.status(201).json({ message: 'Categoría guardada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al guardar la categoría' });
    }
  }*/
}

export default CategoryHandler;
